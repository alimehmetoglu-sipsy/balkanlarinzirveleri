import { NextRequest, NextResponse } from 'next/server';
import { db, InstagramHashtag } from '../../../../../lib/database/connection';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const updates = await request.json();

    // Build dynamic update query
    const allowedFields = ['is_active', 'category', 'priority', 'language', 'posts_found', 'comments_posted', 'avg_engagement'];
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    Object.entries(updates).forEach(([key, value], index) => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = $${index + 1}`);
        updateValues.push(value);
      }
    });

    if (updateFields.length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    // Add ID parameter
    updateValues.push(params.id);

    const sql = `
      UPDATE instagram_hashtags
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
    `;

    const affectedRows = await db.update(sql, updateValues);

    if (affectedRows === 0) {
      return NextResponse.json(
        { error: 'Hashtag not found' },
        { status: 404 }
      );
    }

    // Return updated hashtag
    const updatedHashtag = await db.queryFirst<InstagramHashtag>(
      'SELECT * FROM instagram_hashtags WHERE id = $1',
      [params.id]
    );

    return NextResponse.json(updatedHashtag);
  } catch (error) {
    console.error('Error updating hashtag:', error);
    return NextResponse.json(
      { error: 'Failed to update hashtag' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const affectedRows = await db.delete(
      'DELETE FROM instagram_hashtags WHERE id = $1',
      [params.id]
    );

    if (affectedRows === 0) {
      return NextResponse.json(
        { error: 'Hashtag not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Hashtag deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting hashtag:', error);
    return NextResponse.json(
      { error: 'Failed to delete hashtag' },
      { status: 500 }
    );
  }
}