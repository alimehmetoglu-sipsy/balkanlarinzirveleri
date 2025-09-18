// API Route to stop Instagram automation

import { NextRequest, NextResponse } from 'next/server';

// Import from start route to access the same instance
import { automationManager } from '../start/route';

export async function POST(request: NextRequest) {
  try {
    // Check if manager exists and is running
    if (!automationManager) {
      return NextResponse.json(
        { error: 'Automation manager not initialized' },
        { status: 400 }
      );
    }

    const status = automationManager.getStatus();
    if (!status.isRunning) {
      return NextResponse.json(
        { error: 'Automation is not running' },
        { status: 400 }
      );
    }

    // Stop the automation
    await automationManager.stop();

    // Get final status
    const finalStatus = automationManager.getStatus();

    return NextResponse.json({
      success: true,
      message: 'Instagram automation stopped successfully',
      status: finalStatus
    });
  } catch (error) {
    console.error('Error stopping Instagram automation:', error);
    return NextResponse.json(
      { error: 'Failed to stop automation', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}