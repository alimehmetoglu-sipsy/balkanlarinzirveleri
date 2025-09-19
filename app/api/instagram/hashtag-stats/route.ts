import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/database/connection';

export async function GET(request: NextRequest) {
  try {
    // Get stats from hashtags table
    const statsQuery = `
      SELECT
        COUNT(CASE WHEN is_active = true THEN 1 END) as total_active,
        COUNT(CASE WHEN is_active = false THEN 1 END) as total_inactive,
        SUM(posts_found) as total_posts_found,
        SUM(comments_posted) as total_comments_posted,
        MAX(last_checked) as last_update
      FROM instagram_hashtags
    `;

    const stats = await db.queryFirst<{
      total_active: number;
      total_inactive: number;
      total_posts_found: number;
      total_comments_posted: number;
      last_update: string;
    }>(statsQuery);

    const response = {
      totalActive: stats?.total_active || 0,
      totalInactive: stats?.total_inactive || 0,
      totalPostsFound: stats?.total_posts_found || 0,
      totalCommentsPosted: stats?.total_comments_posted || 0,
      lastUpdate: stats?.last_update || new Date().toISOString()
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching hashtag stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hashtag stats' },
      { status: 500 }
    );
  }
}