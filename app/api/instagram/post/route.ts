// API Route to add posts to the Instagram automation queue

import { NextRequest, NextResponse } from 'next/server';
import { PostContentSchema } from '@/lib/instagram-automation/config-schema';
import { PostContent } from '@/lib/instagram-automation/types';

// Import from start route to access the same instance
import { automationManager } from '../start/route';

export async function POST(request: NextRequest) {
  try {
    // Check if manager exists
    if (!automationManager) {
      return NextResponse.json(
        { error: 'Automation manager not initialized' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate post content
    const validatedPost = PostContentSchema.parse(body);

    // Add post to queue
    await automationManager.addPost(validatedPost);

    return NextResponse.json({
      success: true,
      message: 'Post added to queue successfully',
      post: validatedPost
    });
  } catch (error) {
    console.error('Error adding post to queue:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid post data', details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to add post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check if manager exists
    if (!automationManager) {
      return NextResponse.json(
        { error: 'Automation manager not initialized' },
        { status: 400 }
      );
    }

    // Get post ID from query params
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('id');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Remove post from queue
    const removed = await automationManager.removePost(postId);

    if (!removed) {
      return NextResponse.json(
        { error: 'Post not found in queue' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Post removed from queue successfully',
      postId
    });
  } catch (error) {
    console.error('Error removing post from queue:', error);
    return NextResponse.json(
      { error: 'Failed to remove post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}