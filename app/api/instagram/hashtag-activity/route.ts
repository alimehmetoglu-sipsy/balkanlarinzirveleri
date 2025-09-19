import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/database/connection';

interface ActivityRecord {
  id: string;
  hashtag: string;
  post_url: string;
  action: 'found' | 'commented' | 'liked';
  timestamp: string;
  engagement: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const hashtag = searchParams.get('hashtag');

    let sql = `
      SELECT
        id,
        hashtag,
        post_url,
        action,
        timestamp,
        engagement
      FROM instagram_activity
    `;

    const params: any[] = [];

    if (hashtag) {
      sql += ' WHERE hashtag = $1';
      params.push(hashtag);
    }

    sql += ' ORDER BY timestamp DESC LIMIT $' + (params.length + 1);
    params.push(limit);

    const activities = await db.query<ActivityRecord>(sql, params);

    // Format the response
    const formattedActivities = activities.map(activity => ({
      id: activity.id,
      hashtag: activity.hashtag,
      postUrl: activity.post_url,
      action: activity.action,
      timestamp: activity.timestamp,
      engagement: activity.engagement
    }));

    return NextResponse.json(formattedActivities);
  } catch (error) {
    console.error('Error fetching hashtag activity:', error);

    // If table doesn't exist, return empty array
    if ((error as any)?.message?.includes('no such table')) {
      return NextResponse.json([]);
    }

    return NextResponse.json(
      { error: 'Failed to fetch hashtag activity' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      hashtag,
      postUrl,
      action,
      engagement = 0
    } = await request.json();

    if (!hashtag || !postUrl || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // First, ensure the activity table exists
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS instagram_activity (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hashtag TEXT NOT NULL,
        post_url TEXT NOT NULL,
        action TEXT CHECK(action IN ('found', 'commented', 'liked')),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        engagement INTEGER DEFAULT 0
      )
    `;

    await db.query(createTableSql);

    // Insert new activity
    const insertSql = `
      INSERT INTO instagram_activity (hashtag, post_url, action, engagement)
      VALUES ($1, $2, $3, $4)
    `;

    await db.insert(insertSql, [hashtag, postUrl, action, engagement]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}