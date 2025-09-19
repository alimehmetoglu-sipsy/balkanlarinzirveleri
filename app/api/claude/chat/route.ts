import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { prompt, agent } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Agent parametresi varsa prompt'un başına ekle
    let finalPrompt = prompt;
    if (agent) {
      // Agent adı / ile başlamıyorsa ekle
      const agentName = agent.startsWith('/') ? agent : `/${agent}`;
      finalPrompt = `${agentName} ${prompt}`;
    }

    // Script'i scripts klasöründen çalıştır
    const scriptsDir = path.join(process.cwd(), 'scripts');

    // Tmux session üzerinden gerçek Claude kullan
    const { stdout, stderr } = await execAsync(`./claude-via-tmux.sh "${finalPrompt}"`, {
      cwd: scriptsDir,
      shell: '/bin/bash',
      env: {
        ...process.env,
        PATH: '/usr/local/bin:/usr/bin:/bin:/home/ali/.local/bin',
        HOME: '/home/ali',
        USER: 'ali',
        CLAUDE_CONFIG_DIR: '/home/ali/.config/claude',
        TERM: 'xterm-256color'
      },
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      timeout: 300000 // 5 dakika timeout (300 saniye)
    });

    // Debug için
    console.log('Script stdout:', stdout);
    console.log('Script stdout length:', stdout.length);
    if (stderr) {
      console.error('Script stderr:', stderr);
    }

    // JSON çıktısını parse et
    let jsonResponse;
    try {
      // stdout'tan JSON kısmını ayıkla
      const jsonMatch = stdout.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[0]);
      } else {
        // Eğer JSON bulunamazsa, ham çıktıyı döndür
        jsonResponse = { response: stdout.trim() || 'No response', raw: stdout };
      }
    } catch (parseError) {
      // JSON parse edilemezse ham çıktıyı döndür
      console.error('Parse error:', parseError);
      jsonResponse = { response: stdout.trim() || 'Parse error', raw: stdout };
    }

    return NextResponse.json(jsonResponse);

  } catch (error: any) {
    console.error('Error executing claude-chat-logger:', error);
    return NextResponse.json(
      { error: 'Failed to execute claude chat', details: error.message },
      { status: 500 }
    );
  }
}