import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Script'i çalıştır - simple-response.sh kullan (claude-chat-logger.sh yerine)
    // Not: claude-chat-logger.sh authentication problemi nedeniyle API'den çalışmıyor
    const command = `cd ${process.cwd()} && ./scripts/simple-response.sh "${prompt.replace(/"/g, '\\"')}"`;

    const { stdout, stderr } = await execAsync(command, {
      timeout: 10000, // 10 saniye timeout
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });

    // JSON çıktısını parse et
    try {
      // stdout'tan JSON kısmını bul
      const jsonMatch = stdout.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        const jsonResponse = JSON.parse(jsonMatch[0]);
        return NextResponse.json(jsonResponse);
      }

      return NextResponse.json({
        response: stdout.trim() || "No response",
        stderr: stderr
      });
    } catch (parseError) {
      return NextResponse.json({
        response: stdout.trim(),
        stderr: stderr,
        parseError: true
      });
    }

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to execute script',
        details: error.message,
        stdout: error.stdout,
        stderr: error.stderr
      },
      { status: 500 }
    );
  }
}