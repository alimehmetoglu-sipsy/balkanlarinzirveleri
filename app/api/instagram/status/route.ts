// API Route to get Instagram automation status

import { NextRequest, NextResponse } from 'next/server';

// Import from start route to access the same instance
import { automationManager } from '../start/route';

export async function GET(request: NextRequest) {
  try {
    // Check if manager exists
    if (!automationManager) {
      return NextResponse.json({
        isRunning: false,
        message: 'Automation manager not initialized'
      });
    }

    // Get current status
    const status = automationManager.getStatus();

    return NextResponse.json({
      success: true,
      ...status
    });
  } catch (error) {
    console.error('Error getting Instagram automation status:', error);
    return NextResponse.json(
      { error: 'Failed to get status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}