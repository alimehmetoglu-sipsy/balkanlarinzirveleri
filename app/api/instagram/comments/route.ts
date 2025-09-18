import { NextRequest, NextResponse } from 'next/server';
import { db, InstagramComment } from '../../../../lib/database/connection';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const hashtag = searchParams.get('hashtag');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let sql = 'SELECT * FROM instagram_comments';
    const params: any[] = [];
    const conditions: string[] = [];

    if (status && status !== 'all') {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }

    if (hashtag) {
      conditions.push(`hashtag = $${params.length + 1}`);
      params.push(hashtag);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const comments = await db.query<InstagramComment>(sql, params);

    // Parse JSON fields
    const formattedComments = comments.map(comment => ({
      ...comment,
      engagement: typeof comment.engagement === 'string' ? JSON.parse(comment.engagement || '{}') : comment.engagement
    }));

    return NextResponse.json(formattedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      postUrl,
      originalPost,
      suggestedComment,
      hashtag,
      confidenceScore = 0.0
    } = await request.json();

    if (!postUrl || !suggestedComment) {
      return NextResponse.json(
        { error: 'Post URL and suggested comment are required' },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO instagram_comments (post_url, original_post, suggested_comment, hashtag, confidence_score)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const params = [postUrl, originalPost, suggestedComment, hashtag, confidenceScore];

    const commentId = await db.insert(sql, params);

    const newComment = await db.queryFirst<InstagramComment>(
      'SELECT * FROM instagram_comments WHERE id = $1',
      [commentId]
    );

    if (newComment) {
      const formattedComment = {
        ...newComment,
        engagement: typeof newComment.engagement === 'string' ? JSON.parse(newComment.engagement || '{}') : newComment.engagement
      };

      return NextResponse.json(formattedComment, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}