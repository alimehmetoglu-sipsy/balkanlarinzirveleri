import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

// Rate limiting için basit in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX_REQUESTS = 10; // dakikada maksimum istek sayısı
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 dakika

// Input validation schema
const requestSchema = z.object({
  message: z.string().min(1).max(5000),
  context: z.string().max(2000).optional(),
  format: z.enum(['json', 'text', 'markdown']).optional().default('json'),
  temperature: z.number().min(0).max(1).optional().default(0.7),
  maxTokens: z.number().min(100).max(4000).optional().default(2000),
});

// System prompt cache
let systemPromptCache: string | null = null;
let systemPromptLastRead: number = 0;
const SYSTEM_PROMPT_CACHE_TTL = 5 * 60 * 1000; // 5 dakika

// Rate limiting kontrolü
function checkRateLimit(clientIp: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIp);

  if (!clientData || now > clientData.resetTime) {
    // Yeni pencere başlat
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    const resetIn = clientData.resetTime - now;
    return { allowed: false, remaining: 0, resetIn };
  }

  // İstek sayısını artır
  clientData.count++;
  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
    resetIn: clientData.resetTime - now
  };
}

// System prompt'u yükle (cache ile)
async function getSystemPrompt(): Promise<string> {
  const now = Date.now();

  // Cache'den dön eğer geçerliyse
  if (systemPromptCache && (now - systemPromptLastRead) < SYSTEM_PROMPT_CACHE_TTL) {
    return systemPromptCache;
  }

  // Environment variable'dan kontrol et
  if (process.env.CLAUDE_SYSTEM_PROMPT) {
    systemPromptCache = process.env.CLAUDE_SYSTEM_PROMPT;
    systemPromptLastRead = now;
    return systemPromptCache;
  }

  // Dosyadan oku
  try {
    const promptPath = path.join(process.cwd(), 'prompts', 'system.txt');
    systemPromptCache = await fs.readFile(promptPath, 'utf-8');
    systemPromptLastRead = now;
    return systemPromptCache;
  } catch (error) {
    // Default system prompt
    systemPromptCache = `Sen yardımcı bir AI asistanısın. Kullanıcılara nazik, profesyonel ve doğru yanıtlar vermelisin.
Yanıtlarını Türkçe olarak ver ve kullanıcının sorusuna odaklan.
Kod örnekleri verirken açıklayıcı yorumlar ekle.`;
    systemPromptLastRead = now;
    return systemPromptCache;
  }
}

// Claude CLI'ı çalıştır
async function runClaudeCLI(
  systemPrompt: string,
  userMessage: string,
  format: string,
  temperature: number,
  maxTokens: number
): Promise<{ success: boolean; output?: any; error?: string }> {
  return new Promise((resolve) => {
    const args = [
      '--print',
      '--output-format', format
    ];

    // Temporary prompt files oluştur
    const tempDir = '/tmp';
    const systemPromptFile = path.join(tempDir, `system_${Date.now()}.txt`);
    const userPromptFile = path.join(tempDir, `user_${Date.now()}.txt`);

    // Dosyaları yaz ve Claude'u çalıştır
    Promise.all([
      fs.writeFile(systemPromptFile, systemPrompt),
      fs.writeFile(userPromptFile, userMessage)
    ]).then(() => {
      args.push('--system-prompt-file', systemPromptFile);
      args.push('--user-prompt-file', userPromptFile);

      const child = spawn('claude', args);

      let stdout = '';
      let stderr = '';
      let timedOut = false;

      // 30 saniye timeout
      const timeout = setTimeout(() => {
        timedOut = true;
        child.kill('SIGTERM');
      }, 30000);

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', async (code) => {
        clearTimeout(timeout);

        // Temp dosyaları temizle
        try {
          await Promise.all([
            fs.unlink(systemPromptFile),
            fs.unlink(userPromptFile)
          ]);
        } catch (e) {
          // Silme hatalarını yoksay
        }

        if (timedOut) {
          resolve({ success: false, error: 'Request timeout (30s)' });
          return;
        }

        if (code !== 0) {
          resolve({
            success: false,
            error: `Claude CLI exited with code ${code}: ${stderr || 'Unknown error'}`
          });
          return;
        }

        // Parse output based on format
        try {
          if (format === 'json') {
            const output = JSON.parse(stdout);
            resolve({ success: true, output });
          } else {
            resolve({ success: true, output: stdout });
          }
        } catch (parseError) {
          // JSON parsing başarısız olursa raw output dön
          resolve({ success: true, output: stdout });
        }
      });

      child.on('error', (error) => {
        clearTimeout(timeout);
        resolve({
          success: false,
          error: `Failed to spawn Claude CLI: ${error.message}`
        });
      });
    }).catch((error) => {
      resolve({
        success: false,
        error: `Failed to create prompt files: ${error.message}`
      });
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    // Client IP'yi al (rate limiting için)
    const clientIp = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Rate limiting kontrolü
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          message: `Too many requests. Please try again in ${Math.ceil(rateLimit.resetIn / 1000)} seconds.`,
          retryAfter: Math.ceil(rateLimit.resetIn / 1000)
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + rateLimit.resetIn).toISOString(),
            'Retry-After': Math.ceil(rateLimit.resetIn / 1000).toString()
          }
        }
      );
    }

    // Request body'yi parse et ve validate et
    const body = await request.json();
    const validationResult = requestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validationResult.error.flatten()
        },
        { status: 400 }
      );
    }

    const { message, context, format, temperature, maxTokens } = validationResult.data;

    // System prompt'u yükle
    const systemPrompt = await getSystemPrompt();

    // Context varsa user message'a ekle
    const fullUserMessage = context
      ? `Context: ${context}\n\nUser Message: ${message}`
      : message;

    // Claude CLI'ı çalıştır
    console.log('🤖 Running Claude CLI...');
    const result = await runClaudeCLI(
      systemPrompt,
      fullUserMessage,
      format!,
      temperature!,
      maxTokens!
    );

    if (!result.success) {
      console.error('❌ Claude CLI error:', result.error);

      // Claude bulunamadıysa özel hata mesajı
      if (result.error?.includes('spawn claude')) {
        return NextResponse.json(
          {
            error: 'Claude CLI not found',
            message: 'Claude Code is not installed or not in PATH. Please ensure Claude Code is properly installed.',
            installUrl: 'https://docs.anthropic.com/claude/docs/claude-code'
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          error: 'Claude processing failed',
          message: result.error
        },
        { status: 500 }
      );
    }

    console.log('✅ Claude CLI completed successfully');

    // Başarılı response
    return NextResponse.json(
      {
        success: true,
        response: result.output,
        metadata: {
          format,
          temperature,
          maxTokens,
          timestamp: new Date().toISOString()
        }
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(Date.now() + rateLimit.resetIn).toISOString()
        }
      }
    );

  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

// OPTIONS request handler (CORS preflight)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}