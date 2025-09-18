import { NextRequest, NextResponse } from 'next/server';
import { db, InstagramComment } from '../../../../../lib/database/connection';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const updates = await request.json();

    // Build dynamic update query
    const allowedFields = ['status', 'engagement', 'approved_at', 'posted_at'];
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    Object.entries(updates).forEach(([key, value], index) => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = $${index + 1}`);

        // Stringify JSON fields
        if (key === 'engagement') {
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

    // Auto-set approved_at when status changes to approved
    if (updates.status === 'approved' && !updates.approved_at) {
      updateFields.push(`approved_at = $${updateValues.length + 1}`);
      updateValues.push(new Date().toISOString());
    }

    // Auto-set posted_at when status changes to posted
    if (updates.status === 'posted' && !updates.posted_at) {
      updateFields.push(`posted_at = $${updateValues.length + 1}`);
      updateValues.push(new Date().toISOString());
    }

    // Add ID parameter
    updateValues.push(params.id);

    const sql = `
      UPDATE instagram_comments
      SET ${updateFields.join(', ')}
      WHERE id = $${updateValues.length}
    `;

    const affectedRows = await db.update(sql, updateValues);

    if (affectedRows === 0) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Return updated comment
    const updatedComment = await db.queryFirst<InstagramComment>(
      'SELECT * FROM instagram_comments WHERE id = $1',
      [params.id]
    );

    if (updatedComment) {
      const formattedComment = {
        ...updatedComment,
        engagement: typeof updatedComment.engagement === 'string' ? JSON.parse(updatedComment.engagement || '{}') : updatedComment.engagement
      };

      return NextResponse.json(formattedComment);
    }

    return NextResponse.json(
      { error: 'Failed to fetch updated comment' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const affectedRows = await db.delete(
      'DELETE FROM instagram_comments WHERE id = $1',
      [params.id]
    );

    if (affectedRows === 0) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Comment deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}