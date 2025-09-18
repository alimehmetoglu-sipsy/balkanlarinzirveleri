import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/database/connection';

export async function GET(request: NextRequest) {
  try {
    // Get comprehensive Instagram statistics
    const [
      totalPosts,
      scheduledPosts,
      pendingComments,
      totalHashtags,
      activeHashtags,
      dailyEngagement
    ] = await Promise.all([
      // Total posts
      db.queryFirst<{ count: number }>('SELECT COUNT(*) as count FROM instagram_posts'),

      // Scheduled posts
      db.queryFirst<{ count: number }>('SELECT COUNT(*) as count FROM instagram_posts WHERE status = $1', ['scheduled']),

      // Pending comments
      db.queryFirst<{ count: number }>('SELECT COUNT(*) as count FROM instagram_comments WHERE status = $1', ['pending']),

      // Total hashtags
      db.queryFirst<{ count: number }>('SELECT COUNT(*) as count FROM instagram_hashtags'),

      // Active hashtags
      db.queryFirst<{ count: number }>('SELECT COUNT(*) as count FROM instagram_hashtags WHERE is_active = $1', [true]),

      // Daily engagement (mock for now - would be calculated from actual engagement data)
      Promise.resolve({ engagement: Math.floor(Math.random() * 100) + 50 })
    ]);

    // Get recent activity summary
    const recentPosts = await db.query(
      'SELECT COUNT(*) as count FROM instagram_posts WHERE created_at >= $1',
      [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()] // Last 7 days
    );

    const recentComments = await db.query(
      'SELECT COUNT(*) as count FROM instagram_comments WHERE created_at >= $1',
      [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()] // Last 7 days
    );

    const stats = {
      totalPosts: totalPosts?.count || 0,
      scheduledPosts: scheduledPosts?.count || 0,
      pendingComments: pendingComments?.count || 0,
      hashtagsMonitored: activeHashtags?.count || 0,
      totalHashtags: totalHashtags?.count || 0,
      dailyEngagement: dailyEngagement?.engagement || 0,
      weeklyStats: {
        postsCreated: recentPosts[0]?.count || 0,
        commentsGenerated: recentComments[0]?.count || 0
      },
      lastUpdate: new Date().toLocaleString('tr-TR')
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching Instagram stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}