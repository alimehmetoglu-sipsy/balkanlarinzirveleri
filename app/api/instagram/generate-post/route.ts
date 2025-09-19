import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60; // 60 seconds timeout

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      imageUrl,
      imagePath,
      context,
      userContext,
      userUrl,
      userDescription
    } = body;

    console.log('🤖 Using Claude Code AI generation...');
    console.log('🧠 Claude Code AI analyzing:', {
      context,
      userContext,
      userDescription,
      imageUrl
    });

    // ALWAYS use Claude API - no fallback
    const aiAnalysis = await generateWithClaudeCodeAPI({
      imageUrl,
      imagePath,
      context,
      userContext,
      userUrl,
      userDescription
    });

    return NextResponse.json(aiAnalysis);

  } catch (error) {
    console.error('Post generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate post content', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

interface GenerationParams {
  imageUrl: string;
  imagePath: string;
  context?: string;
  userContext?: string;
  userUrl?: string;
  userDescription?: string;
}

async function generateWithClaudeCodeAPI(params: GenerationParams) {
  console.log('🧠 Calling Claude Code AI directly...');

  const { spawn } = require('child_process');

  const prompt = `Instagram için bir gönderi oluştur.

Görsel Bilgisi: ${params.userDescription || 'Balkanların Zirveleri trekking deneyimi'}
Ek Bağlam: ${params.userContext || 'Arnavutluk, Kosova ve Karadağ\'da 192 km\'lik sınır ötesi yürüyüş rotası'}
Referans URL: ${params.userUrl || 'https://balkanlarinzirveleri.com'}

Lütfen şu formatta bir JSON yanıt oluştur ve SADECE JSON döndür, başka açıklama ekleme:
{
  "id": "benzersiz_id",
  "caption": "Instagram gönderisi için etkileyici bir yazı (emoji kullan)",
  "hashtags": ["ilgili", "hashtagler", "listesi"],
  "analysis": {
    "description": "Görsel açıklaması",
    "mood": "İçeriğin ruh hali (örn: İlham Verici, Maceracı, Huzurlu)",
    "location": "Lokasyon bilgisi",
    "activities": ["Aktivite listesi"]
  },
  "confidence": 0.95
}`;

  return new Promise((resolve, reject) => {
    const claude = spawn('/usr/bin/claude', [], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, PATH: '/usr/bin:/bin:/usr/local/bin', HOME: process.env.HOME || '/home/ali' }
    });

    let stdout = '';
    let stderr = '';
    let timedOut = false;

    // Set a timeout
    const timeout = setTimeout(() => {
      timedOut = true;
      claude.kill('SIGTERM');
    }, 30000);

    // Send the prompt to stdin
    claude.stdin.write(prompt);
    claude.stdin.end();

    claude.stdout.on('data', (data: Buffer) => {
      stdout += data.toString();
    });

    claude.stderr.on('data', (data: Buffer) => {
      stderr += data.toString();
    });

    claude.on('close', (code: number) => {
      clearTimeout(timeout);

      if (timedOut) {
        reject(new Error('Claude timeout after 30 seconds'));
        return;
      }

      if (code !== 0) {
        console.error('Claude stderr:', stderr);
        reject(new Error(`Claude exited with code ${code}: ${stderr || 'Unknown error'}`));
        return;
      }

      try {
        // Try to extract JSON from Claude's response
        let claudeOutput: any;

        // First try direct JSON parse
        try {
          claudeOutput = JSON.parse(stdout);
        } catch {
          // Try to find JSON in the response
          const jsonMatch = stdout.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            claudeOutput = JSON.parse(jsonMatch[0]);
          } else {
            // If no JSON found, create one from the text response
            claudeOutput = {
              id: `post_${Date.now()}`,
              caption: stdout.trim() || 'Claude tarafından oluşturulmuş içerik',
              hashtags: ['dağcılık', 'doğayürüyüşü', 'balkanlar', 'trekking', 'hiking'],
              analysis: {
                description: params.userDescription || 'Balkan dağlarından bir manzara',
                mood: 'İlham Verici',
                location: detectLocation(params.userContext, params.userDescription),
                activities: ['Dağcılık', 'Hiking']
              },
              confidence: 0.9
            };
          }
        }

        // Return formatted response
        resolve({
          id: claudeOutput.id || `post_${Date.now()}`,
          confidence: claudeOutput.confidence || 0.95,
          analysis: claudeOutput.analysis || {
            description: params.userDescription || 'Balkan dağlarından etkileyici bir doğa manzarası',
            mood: 'İlham Verici',
            location: detectLocation(params.userContext, params.userDescription),
            activities: ['Dağcılık', 'Hiking']
          },
          caption: claudeOutput.caption || 'Claude tarafından oluşturulmuş içerik',
          hashtags: claudeOutput.hashtags || generateHashtags(params),
          suggestedSchedule: generateSchedule(),
          metadata: {
            generatedBy: 'Claude Code AI (Direct)',
            timestamp: new Date().toISOString(),
            userInputs: {
              context: params.userContext,
              description: params.userDescription,
              url: params.userUrl
            },
            claudeOutput: claudeOutput
          }
        });
      } catch (error) {
        reject(new Error(`Failed to process Claude response: ${error}`));
      }
    });

    claude.on('error', (error: Error) => {
      clearTimeout(timeout);
      reject(new Error(`Failed to spawn Claude: ${error.message}`));
    });
  });
}

function detectLocation(context?: string, description?: string): string {
  const text = `${context || ''} ${description || ''}`.toLowerCase();

  if (text.includes('valbona') || text.includes('valbonë')) {
    return 'Valbona Vadisi';
  }
  if (text.includes('theth')) {
    return 'Theth';
  }
  if (text.includes('prokletije')) {
    return 'Prokletije Dağları';
  }
  if (text.includes('korab')) {
    return 'Korab Dağı';
  }
  if (text.includes('jezerca') || text.includes('jezercë')) {
    return 'Jezerca Zirvesi';
  }

  return 'Balkan Dağları';
}

function generateHashtags(params: GenerationParams): string[] {
  const baseHashtags = [
    'dağcılık', 'doğayürüyüşü', 'hiking', 'trekking', 'peaksofthebalkans',
    'balkanlarinzirveleri', 'balkanlar', 'balkans', 'thephrygianway',
    'outdoor', 'nature', 'mountains', 'adventure', 'explore'
  ];

  const text = `${params.userContext || ''} ${params.userDescription || ''}`.toLowerCase();
  const additionalHashtags: string[] = [];

  // Location specific
  if (text.includes('valbona')) {
    additionalHashtags.push('valbona', 'valbonavalley', 'albania');
  }
  if (text.includes('theth')) {
    additionalHashtags.push('theth', 'thethalbania', 'albania');
  }
  if (text.includes('prokletije')) {
    additionalHashtags.push('prokletije', 'montenegro');
  }

  // Activity specific
  if (text.includes('zirve') || text.includes('summit')) {
    additionalHashtags.push('summit', 'zirvemanzarası', 'mountaineering');
  }
  if (text.includes('zorlu') || text.includes('challenging')) {
    additionalHashtags.push('challengehike', 'extremehiking');
  }
  if (text.includes('kamp') || text.includes('camp')) {
    additionalHashtags.push('camping', 'kampçılık', 'wildcamping');
  }

  return [...new Set([...baseHashtags, ...additionalHashtags])].slice(0, 25);
}

function generateSchedule(): string {
  const now = new Date();
  const bestHours = [9, 12, 15, 18, 20]; // Best engagement hours

  const suggestedTime = new Date(now);
  suggestedTime.setHours(bestHours[Math.floor(Math.random() * bestHours.length)], 0, 0, 0);

  if (suggestedTime <= now) {
    suggestedTime.setDate(suggestedTime.getDate() + 1);
  }

  return suggestedTime.toISOString().slice(0, 16);
}