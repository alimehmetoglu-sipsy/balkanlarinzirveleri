import { NextRequest, NextResponse } from 'next/server';
import { db, InstagramPost } from '../../../../lib/database/connection';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let sql = 'SELECT * FROM instagram_posts';
    const params: any[] = [];

    if (status && status !== 'all') {
      sql += ' WHERE status = $1';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const posts = await db.query<InstagramPost>(sql, params);

    // Parse JSON fields for response
    const formattedPosts = posts.map(post => ({
      ...post,
      hashtags: typeof post.hashtags === 'string' ? JSON.parse(post.hashtags) : post.hashtags,
      engagement: typeof post.engagement === 'string' ? JSON.parse(post.engagement || '{}') : post.engagement
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      caption,
      imageUrl,
      imagePath,
      hashtags,
      scheduledFor,
      status = 'draft'
    } = await request.json();

    if (!caption) {
      return NextResponse.json(
        { error: 'Caption is required' },
        { status: 400 }
      );
    }

    const sql = `
      INSERT INTO instagram_posts (caption, image_url, image_path, hashtags, scheduled_for, status)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const hashtagsJson = JSON.stringify(hashtags || []);
    const params = [caption, imageUrl, imagePath, hashtagsJson, scheduledFor, status];

    const postId = await db.insert(sql, params);

    const newPost = await db.queryFirst<InstagramPost>(
      'SELECT * FROM instagram_posts WHERE id = $1',
      [postId]
    );

    if (newPost) {
      // Format response
      const formattedPost = {
        ...newPost,
        hashtags: typeof newPost.hashtags === 'string' ? JSON.parse(newPost.hashtags) : newPost.hashtags,
        engagement: typeof newPost.engagement === 'string' ? JSON.parse(newPost.engagement || '{}') : newPost.engagement
      };

      return NextResponse.json(formattedPost, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}