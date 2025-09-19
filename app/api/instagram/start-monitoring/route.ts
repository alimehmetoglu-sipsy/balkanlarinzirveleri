import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/database/connection';

export async function POST(request: NextRequest) {
  try {
    // Get all active hashtags
    const activeHashtags = await db.query<{ hashtag: string; id: number }>(
      'SELECT id, hashtag FROM instagram_hashtags WHERE is_active = true'
    );

    if (activeHashtags.length === 0) {
      return NextResponse.json(
        { error: 'No active hashtags to monitor' },
        { status: 400 }
      );
    }

    // Analyze each active hashtag
    const analysisResults = [];
    const analyzedHashtags = [];

    for (const hashtagRecord of activeHashtags) {
      try {
        // Call the hashtag-analyze API for each hashtag
        const analyzeResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/instagram/hashtag-analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hashtag: hashtagRecord.hashtag })
        });

        if (analyzeResponse.ok) {
          const result = await analyzeResponse.json();
          analysisResults.push(result);
          analyzedHashtags.push(hashtagRecord.hashtag);

          // Create activity records based on analysis
          if (result.data?.topPosts && result.data.topPosts.length > 0) {
            // Ensure activity table exists
            await db.query(`
              CREATE TABLE IF NOT EXISTS instagram_activity (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hashtag TEXT NOT NULL,
                post_url TEXT NOT NULL,
                action TEXT CHECK(action IN ('found', 'commented', 'liked')),
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                engagement INTEGER DEFAULT 0
              )
            `);

            // Add activity for top posts found
            for (const post of result.data.topPosts.slice(0, 3)) {
              await db.insert(
                `INSERT INTO instagram_activity (hashtag, post_url, action, engagement)
                 VALUES ($1, $2, $3, $4)`,
                [
                  hashtagRecord.hashtag,
                  post.url || `https://www.instagram.com/p/sample_${Date.now()}/`,
                  'found',
                  Math.min(100, Math.round((post.likes / (result.data.stats?.avgLikes || 100)) * 100))
                ]
              );
            }
          }
        }
      } catch (error) {
        console.error(`Error analyzing hashtag ${hashtagRecord.hashtag}:`, error);

        // Fallback to simple update if analysis fails
        await db.update(
          'UPDATE instagram_hashtags SET last_checked = CURRENT_TIMESTAMP WHERE id = $1',
          [hashtagRecord.id]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Started monitoring ${activeHashtags.length} active hashtags`,
      hashtagsMonitored: activeHashtags.map(h => h.hashtag),
      analyzed: analyzedHashtags,
      results: analysisResults.length
    });
  } catch (error) {
    console.error('Error starting monitoring:', error);
    return NextResponse.json(
      { error: 'Failed to start monitoring' },
      { status: 500 }
    );
  }
}