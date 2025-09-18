// API Route to start Instagram automation

import { NextRequest, NextResponse } from 'next/server';
import { createAutomationManager } from '@/lib/instagram-automation';
import { AutomationConfig } from '@/lib/instagram-automation/types';

// Store manager instance (in production, use a proper state management solution)
let automationManager: any = null;

export async function POST(request: NextRequest) {
  try {
    // Check if already running
    if (automationManager && automationManager.getStatus().isRunning) {
      return NextResponse.json(
        { error: 'Automation is already running' },
        { status: 400 }
      );
    }

    // Get configuration from request body
    const body = await request.json();
    const customConfig: Partial<AutomationConfig> = body.config || {};

    // Validate credentials are provided
    if (!customConfig.credentials?.username || !customConfig.credentials?.password) {
      // Check environment variables
      if (!process.env.INSTAGRAM_USERNAME || !process.env.INSTAGRAM_PASSWORD) {
        return NextResponse.json(
          { error: 'Instagram credentials not provided' },
          { status: 400 }
        );
      }
    }

    // Create and start automation manager
    automationManager = createAutomationManager(customConfig);
    const started = await automationManager.start();

    if (!started) {
      return NextResponse.json(
        { error: 'Failed to start automation' },
        { status: 500 }
      );
    }

    // Get initial status
    const status = automationManager.getStatus();

    return NextResponse.json({
      success: true,
      message: 'Instagram automation started successfully',
      status
    });
  } catch (error) {
    console.error('Error starting Instagram automation:', error);
    return NextResponse.json(
      { error: 'Failed to start automation', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Export manager for other routes
export { automationManager };