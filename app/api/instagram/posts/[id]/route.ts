import { NextRequest, NextResponse } from 'next/server';
import { db, InstagramPost } from '../../../../../lib/database/connection';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const post = await db.queryFirst<InstagramPost>(
      'SELECT * FROM instagram_posts WHERE id = $1',
      [params.id]
    );

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Format response
    const formattedPost = {
      ...post,
      hashtags: typeof post.hashtags === 'string' ? JSON.parse(post.hashtags) : post.hashtags,
      engagement: typeof post.engagement === 'string' ? JSON.parse(post.engagement || '{}') : post.engagement
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const updates = await request.json();

    // Build dynamic update query
    const allowedFields = ['caption', 'image_url', 'image_path', 'hashtags', 'scheduled_for', 'status', 'engagement'];
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    Object.entries(updates).forEach(([key, value], index) => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = $${index + 1}`);

        // Stringify JSON fields
        if (key === 'hashtags' || key === 'engagement') {
          updateValues.push(JSON.stringify(value));
        } else {
          updateValues.push(value);
        }
      }
    });

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Add updated_at field
    updateFields.push(`updated_at = $${updateValues.length + 1}`);
    updateValues.push(new Date().toISOString());

    // Add ID parameter
    updateValues.push(params.id);

    const sql = `
      UPDATE instagram_posts
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
    `;

    const affectedRows = await db.update(sql, updateValues);

    if (affectedRows === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Return updated post
    const updatedPost = await db.queryFirst<InstagramPost>(
      'SELECT * FROM instagram_posts WHERE id = $1',
      [params.id]
    );

    if (updatedPost) {
      const formattedPost = {
        ...updatedPost,
        hashtags: typeof updatedPost.hashtags === 'string' ? JSON.parse(updatedPost.hashtags) : updatedPost.hashtags,
        engagement: typeof updatedPost.engagement === 'string' ? JSON.parse(updatedPost.engagement || '{}') : updatedPost.engagement
      };

      return NextResponse.json(formattedPost);
    }

    return NextResponse.json(
      { error: 'Failed to fetch updated post' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const affectedRows = await db.delete(
      'DELETE FROM instagram_posts WHERE id = $1',
      [params.id]
    );

    if (affectedRows === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}