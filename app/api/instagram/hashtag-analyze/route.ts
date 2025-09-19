import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/database/connection';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { hashtag } = await request.json();

    if (!hashtag) {
      return NextResponse.json(
        { error: 'Hashtag is required' },
        { status: 400 }
      );
    }

    // Clean hashtag (remove # if present)
    const cleanHashtag = hashtag.replace('#', '').toLowerCase();

    // Check if hashtag exists in database
    let hashtagRecord = await db.queryFirst<{ id: number; hashtag: string }>(
      'SELECT id, hashtag FROM instagram_hashtags WHERE hashtag = $1',
      [cleanHashtag]
    );

    // If hashtag doesn't exist, create it
    if (!hashtagRecord) {
      const hashtagId = await db.insert(
        'INSERT INTO instagram_hashtags (hashtag, category, priority, language) VALUES ($1, $2, $3, $4)',
        [cleanHashtag, 'secondary', 'medium', 'tr']
      );

      hashtagRecord = {
        id: parseInt(hashtagId),
        hashtag: cleanHashtag
      };
    }

    // For now, skip Claude API and use mock data directly
    // This will be replaced with actual Claude integration when tmux session is ready
    const USE_MOCK_DATA = false; // Toggle this to enable/disable mock mode

    let analysisResult;

    if (!USE_MOCK_DATA) {
      // Call Claude API with hashtag analyzer agent
      const scriptsDir = path.join(process.cwd(), 'scripts');
      const agentPrompt = `Analyze the Instagram hashtag: #${cleanHashtag}`;

      try {
        // Execute through tmux session with the hashtag analyzer agent
        const { stdout, stderr } = await execAsync(
          `./claude-via-tmux.sh "/instagram-hashtag-analyzer ${agentPrompt}"`,
          {
            cwd: scriptsDir,
            shell: '/bin/bash',
            env: {
              ...process.env,
              PATH: '/usr/local/bin:/usr/bin:/bin:/home/ali/.local/bin',
              HOME: '/home/ali',
              USER: 'ali',
              CLAUDE_CONFIG_DIR: '/home/ali/.config/claude',
              TERM: 'xterm-256color'
            },
            maxBuffer: 1024 * 1024 * 10, // 10MB buffer
            timeout: 30000 // 30 seconds timeout
          }
        );

        // Parse Claude's response
        try {
          const jsonMatch = stdout.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            analysisResult = JSON.parse(jsonMatch[0]);
          } else {
            analysisResult = { response: { success: false, error: 'Invalid response format' } };
          }
        } catch (parseError) {
          console.error('Parse error:', parseError);
          analysisResult = { response: { success: false, error: 'Failed to parse analysis' } };
        }
      } catch (execError) {
        console.error('Error executing Claude agent:', execError);
        analysisResult = { response: { success: false, error: 'Claude agent timeout' } };
      }
    } else {
      // Use mock data for development/testing
      analysisResult = {
        response: {
          success: true,
          hashtag: cleanHashtag,
          stats: {
            totalPosts: Math.floor(Math.random() * 100000) + 1000,
            avgLikes: Math.floor(Math.random() * 500) + 50,
            avgComments: Math.floor(Math.random() * 50) + 5,
            engagementRate: (Math.random() * 5 + 1).toFixed(2)
          },
          topPosts: [
            {
              url: `https://instagram.com/p/mock1_${Date.now()}`,
              likes: Math.floor(Math.random() * 1000) + 100,
              comments: Math.floor(Math.random() * 100) + 10,
              username: 'user_' + Math.random().toString(36).substring(7),
              caption: `Amazing ${cleanHashtag} content!`,
              postedAt: new Date().toISOString()
            },
            {
              url: `https://instagram.com/p/mock2_${Date.now()}`,
              likes: Math.floor(Math.random() * 800) + 80,
              comments: Math.floor(Math.random() * 80) + 8,
              username: 'user_' + Math.random().toString(36).substring(7),
              caption: `Check out this ${cleanHashtag}!`,
              postedAt: new Date().toISOString()
            }
          ],
          relatedHashtags: ['doğa', 'kamp', 'outdoor', 'trekking', 'hiking'],
          postingFrequency: {
            hourly: { "09": 15, "12": 22, "18": 35, "20": 18 },
            daily: { "Monday": 120, "Wednesday": 150, "Saturday": 200, "Sunday": 180 }
          },
          analysisDate: new Date().toISOString()
        }
      };
    }

    // If analysis was successful, save to database
    if (analysisResult.response?.success) {
      const data = analysisResult.response;

      // Create analytics table if not exists
      await db.query(`
        CREATE TABLE IF NOT EXISTS instagram_hashtag_analytics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          hashtag_id INTEGER NOT NULL,
          analysis_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          total_posts INTEGER,
          avg_likes INTEGER,
          avg_comments INTEGER,
          engagement_rate REAL,
          top_posts TEXT,
          related_hashtags TEXT,
          posting_frequency TEXT,
          FOREIGN KEY (hashtag_id) REFERENCES instagram_hashtags(id)
        )
      `);

      // Insert analytics record
      await db.insert(
        `INSERT INTO instagram_hashtag_analytics
         (hashtag_id, total_posts, avg_likes, avg_comments, engagement_rate,
          top_posts, related_hashtags, posting_frequency)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          hashtagRecord.id,
          data.stats?.totalPosts || 0,
          data.stats?.avgLikes || 0,
          data.stats?.avgComments || 0,
          data.stats?.engagementRate || 0,
          JSON.stringify(data.topPosts || []),
          JSON.stringify(data.relatedHashtags || []),
          JSON.stringify(data.postingFrequency || {})
        ]
      );

      // Update hashtag record with latest stats
      await db.update(
        `UPDATE instagram_hashtags
         SET posts_found = $1,
             avg_engagement = $2,
             last_checked = CURRENT_TIMESTAMP
         WHERE id = $3`,
        [
          data.stats?.totalPosts || 0,
          data.stats?.engagementRate || 0,
          hashtagRecord.id
        ]
      );

      return NextResponse.json({
        success: true,
        message: `Hashtag #${cleanHashtag} analyzed ${USE_MOCK_DATA ? '(mock data)' : 'successfully'}`,
        data: data,
        mock: USE_MOCK_DATA
      });
    } else {
      return NextResponse.json({
        success: false,
        error: analysisResult.response?.error || 'Analysis failed',
        details: analysisResult.response
      }, { status: 400 });
    }

  } catch (error) {
    console.error('Error analyzing hashtag:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to analyze hashtag' },
      { status: 500 }
    );
  }
}