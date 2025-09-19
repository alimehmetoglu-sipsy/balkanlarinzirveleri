import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      imageUrl,
      imagePath,
      context,
      userContext,
      userUrl,
      userDescription,
      claudePrompt,
      useClaudeCode = false
    } = await request.json();

    // Generate intelligent content using Claude Code AI or fallback
    let aiAnalysis;

    if (useClaudeCode || claudePrompt || context === 'claude_code_generation') {
      console.log('🤖 Using Claude Code AI generation...');
      aiAnalysis = await generateWithClaudeCodeAPI({
        imageUrl,
        imagePath,
        context,
        userContext,
        userUrl,
        userDescription,
        claudePrompt
      });
    } else {
      console.log('📝 Using fallback content generation...');
      aiAnalysis = await generateIntelligentContent({
        imageUrl,
        imagePath,
        context,
        userContext,
        userUrl,
        userDescription
      });
    }

    return NextResponse.json(aiAnalysis);

  } catch (error) {
    console.error('Post generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate post content' },
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
  claudePrompt?: string;
}

async function generateWithClaudeCodeAPI(params: GenerationParams) {
  const { spawn } = require('child_process');
  const path = require('path');

  try {
    console.log('🧠 Calling Claude Code AI via shell script...');

    const scriptPath = path.join(process.cwd(), 'scripts', 'claude-code-api.sh');

    // Prepare arguments for the script
    const imageDescription = params.userDescription || 'Balkanların Zirveleri trekking deneyimi';
    const context = params.userContext || 'Arnavutluk, Kosova ve Karadağda 192 kmlik sınır ötesi yürüyüş rotası';
    const referenceUrl = params.userUrl || 'https://balkanlarzirveleri.com';
    const detailedDescription = params.userDescription || 'Dağların arasında çekilmiş muhteşem bir doğa manzarası';

    // Run the shell script with timeout
    const result = await new Promise((resolve, reject) => {
      const child = spawn('bash', [
        scriptPath,
        imageDescription,
        context,
        referenceUrl,
        detailedDescription
      ], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: process.cwd()
      });

      let stdout = '';
      let stderr = '';

      // Set timeout for shell script (30 seconds)
      const timeout = setTimeout(() => {
        child.kill('SIGKILL');
        reject(new Error('Claude Code script timeout after 30 seconds'));
      }, 30000);

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        clearTimeout(timeout);
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(new Error(`Script exited with code ${code}: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });

    // Try to read the output file
    const fs = require('fs');
    const outputPath = '/tmp/latest_claude_output.json';

    let claudeOutput;
    try {
      const rawOutput = fs.readFileSync(outputPath, 'utf8');
      claudeOutput = JSON.parse(rawOutput);
    } catch (parseError) {
      console.warn('Could not parse Claude Code output, using fallback');
      return await generateEnhancedFallback(params);
    }

    // Format the response to match our expected structure
    return {
      id: `claude_code_${Date.now()}`,
      confidence: 0.95,
      analysis: claudeOutput.analysis || {
        description: imageDescription,
        mood: 'İlham Verici',
        location: 'Balkan Dağları',
        activities: ['Dağcılık', 'Hiking']
      },
      caption: claudeOutput.caption || claudeOutput.content || 'Claude Code tarafından oluşturulmuş içerik',
      hashtags: claudeOutput.hashtags || ['dağcılık', 'doğayürüyüşü', 'balkanlar'],
      suggestedSchedule: await generateSmartSchedule([]),
      metadata: {
        generatedBy: 'Claude Code AI (Real)',
        timestamp: new Date().toISOString(),
        userInputs: {
          context: params.userContext,
          description: params.userDescription,
          url: params.userUrl
        },
        claudeOutput: claudeOutput
      }
    };

  } catch (error) {
    console.error('Claude Code shell script error:', error);
    console.log('Falling back to enhanced generation...');

    // Fallback to enhanced generation if Claude Code fails
    return await generateEnhancedFallback(params);
  }
}

function createDetailedPrompt(params: GenerationParams): string {
  let prompt = `GÖRSEL ANALİZİ VE POST OLUŞTURMA TALEBİ:

Görsel URL: ${params.imageUrl}`;

  if (params.userContext) {
    prompt += `\n\nEK BAĞLAM BİLGİSİ:\n${params.userContext}`;
  }

  if (params.userDescription) {
    prompt += `\n\nDETAYLI AÇIKLAMA:\n${params.userDescription}`;
  }

  if (params.userUrl) {
    prompt += `\n\nREFERANS URL:\n${params.userUrl}`;
  }

  if (params.claudePrompt) {
    prompt += `\n\nEK TALİMAT:\n${params.claudePrompt}`;
  }

  prompt += `\n\nLütfen bu bilgilere dayalı olarak:
1. Görseli analiz et (dağlar, aktivite, hava durumu, zaman, ruh hali)
2. Etkileyici bir Instagram post yazısı oluştur
3. Relevant ve trending hashtagler belirle
4. Önerilen yayın zamanı hesapla

Post samimi, hikaye anlatıcı tarzda olsun. Takipçilerle duygusal bağ kursun.`;

  return prompt;
}

async function performAdvancedAnalysis(params: GenerationParams) {
  // Advanced image and context analysis
  const analysis: any = {
    description: "Balkan dağlarından etkileyici bir doğa manzarası",
    mood: "İlham Verici",
    location: "Balkan Dağları",
    activities: ["Dağcılık", "Hiking"],
    weather: "Güneşli",
    timeOfDay: "Gündüz",
    difficulty: "Orta",
    season: "Yaz"
  };

  if (params.userContext || params.userDescription) {
    const userText = (params.userContext + " " + params.userDescription).toLowerCase();

    // Enhanced location detection
    if (userText.includes('valbona')) {
      analysis.location = 'Valbona Vadisi';
      analysis.activities.push('Vadi Yürüyüşü');
    } else if (userText.includes('theth')) {
      analysis.location = 'Theth Köyü';
      analysis.activities.push('Köy Turu');
    } else if (userText.includes('prokletije')) {
      analysis.location = 'Prokletije Dağları';
      analysis.activities.push('Zirve Tırmanışı');
    } else if (userText.includes('korab')) {
      analysis.location = 'Korab Dağı';
      analysis.activities.push('2764m Zirve');
    } else if (userText.includes('maja')) {
      analysis.location = 'Maja Jezercë';
      analysis.activities.push('Zirveler Arası');
    }

    // Activity and difficulty analysis
    if (userText.includes('zor') || userText.includes('challenging')) {
      analysis.difficulty = 'Zor';
      analysis.mood = 'Maceracı';
    } else if (userText.includes('kolay') || userText.includes('easy')) {
      analysis.difficulty = 'Kolay';
      analysis.mood = 'Huzurlu';
    }

    if (userText.includes('kamp')) analysis.activities.push('Kampçılık');
    if (userText.includes('fotoğraf')) analysis.activities.push('Doğa Fotoğrafçılığı');
    if (userText.includes('şelale')) analysis.activities.push('Şelale Keşfi');

    // Weather and time detection
    if (userText.includes('yağmur') || userText.includes('bulut')) analysis.weather = 'Bulutlu';
    if (userText.includes('kar')) analysis.weather = 'Karlı';
    if (userText.includes('gün doğum')) analysis.timeOfDay = 'Gün Doğumu';
    if (userText.includes('gün batım')) analysis.timeOfDay = 'Gün Batımı';

    // Enhanced description
    if (params.userDescription && params.userDescription.length > 20) {
      analysis.description = params.userDescription.substring(0, 120) + '...';
    }
  }

  return analysis;
}

async function generateAdvancedCaption(params: GenerationParams, analysis: any): string {
  const templates = [
    `🏔️ ${analysis.location}'nda ${analysis.timeOfDay.toLowerCase()} saatlerinde...

${params.userDescription || 'Bu manzara karşısında nefes kesmek, doğanın bize sunduğu en büyük hediye.'}

${analysis.difficulty === 'Zor' ? 'Zorlu bir yürüyüş ama her adımına değer. 💪' : 'Huzur dolu anlar yaşadığımız bu rotada... 🙏'}

Balkanların bu eşsiz güzelliği, ruhumuza dokunan bir deneyim. ${analysis.activities.join(', ')} yaparak geçirdiğimiz bu günler unutulmaz.

${params.userContext ? `\n${params.userContext}\n` : ''}

Siz de bu maceraya katılmaya hazır mısınız? Rotanın detayları için DM'den ulaşabilirsiniz! 🥾

${params.userUrl ? `\nDetaylı bilgi: ${params.userUrl}` : ''}`,

    `✨ ${analysis.mood} bir ${analysis.weather.toLowerCase()} gün ${analysis.location}'nde...

${params.userDescription || `Dağların arasında geçen her an, yaşamın ne kadar değerli olduğunu hatırlatıyor.`}

${analysis.activities.length > 2 ? `${analysis.activities.slice(0, 2).join(' ve ')} yaparken` : analysis.activities.join(' yaparken')}, doğayla olan bağımızı yeniden kuruyoruz.

Bu ${analysis.difficulty.toLowerCase()} rota, hem bedenimizi hem ruhumuzu besliyor. Her adımda yeni bir manzara, her nefeste temiz hava...

${params.userContext ? `\n${params.userContext}\n` : ''}

Balkanların büyüleyici dünyasında kaybolmaya hazır mısınız? 🌄

${params.userUrl ? `\n📍 Rota bilgileri: ${params.userUrl}` : ''}`,

    `🥾 ${analysis.location} - ${analysis.season} ${analysis.weather}

${params.userDescription || 'Adım adım, nefes nefes... Bu manzara için değer her zorluğa.'}

${analysis.timeOfDay === 'Gün Doğumu' || analysis.timeOfDay === 'Gün Batımı' ?
  `${analysis.timeOfDay}'nın büyüsüne kapılarak, doğanın sanatını seyrederken... 🌅` :
  'Gün boyu süren bu macera, en güzel anılarımızdan biri olmaya aday.'}

${analysis.activities.map(activity => `📍 ${activity}`).join('\n')}

${params.userContext ? `\n${params.userContext}` : ''}

Bu deneyimi yaşamak isteyenler için rehberlik hizmetimiz mevcut! DM'den iletişime geçebilirsiniz.

${params.userUrl ? `\nTüm detaylar: ${params.userUrl}` : ''}`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

async function generateAdvancedHashtags(params: GenerationParams, analysis: any): string[] {
  const coreHashtags = [
    'dağcılık', 'doğayürüyüşü', 'hiking', 'trekking', 'peaksofthebalkans',
    'thephrygianway', 'balkanlarinzirveleri', 'balkanlar', 'balkans'
  ];

  const contextualHashtags: string[] = [];

  // Location-based hashtags
  const location = analysis.location.toLowerCase();
  if (location.includes('valbona')) {
    contextualHashtags.push('valbona', 'valbonavalley', 'albania', 'albanianmountains');
  }
  if (location.includes('theth')) {
    contextualHashtags.push('theth', 'thethalbania', 'albania', 'prokletije');
  }
  if (location.includes('prokletije')) {
    contextualHashtags.push('prokletije', 'montenegro', 'planine', 'dinaricalps');
  }
  if (location.includes('korab')) {
    contextualHashtags.push('korab', 'mountkorab', '2764m', 'macedonia', 'albania');
  }

  // Activity-based hashtags
  analysis.activities.forEach((activity: string) => {
    const activityLower = activity.toLowerCase();
    if (activityLower.includes('kamp')) {
      contextualHashtags.push('kampçılık', 'camping', 'wildcamping', 'doğakampı');
    }
    if (activityLower.includes('fotoğraf')) {
      contextualHashtags.push('doğafotoğrafçılığı', 'naturephotography', 'mountainphotography');
    }
    if (activityLower.includes('zirve')) {
      contextualHashtags.push('zirvemanzarası', 'summit', 'peakbagging', 'mountaineering');
    }
  });

  // Difficulty and weather hashtags
  if (analysis.difficulty === 'Zor') {
    contextualHashtags.push('challengehike', 'advancedtrekking', 'extremehiking');
  } else if (analysis.difficulty === 'Kolay') {
    contextualHashtags.push('beginnerhike', 'easyhike', 'familyhike');
  }

  if (analysis.weather === 'Karlı') {
    contextualHashtags.push('winterhiking', 'snowhiking', 'kışdağcılığı');
  }

  // User context hashtags
  if (params.userContext || params.userDescription) {
    const userText = (params.userContext + " " + params.userDescription).toLowerCase();
    if (userText.includes('solo')) contextualHashtags.push('solohike', 'solotraveler');
    if (userText.includes('grup') || userText.includes('arkadaş')) {
      contextualHashtags.push('grouphike', 'arkadaşlarla');
    }
    if (userText.includes('ilk')) contextualHashtags.push('firsttime', 'ilkdeneyim');
  }

  // Trending and seasonal hashtags
  const trending = [
    'outdoor', 'adventure', 'explore', 'wanderlust', 'mountains',
    'nature', 'wilderness', 'backpacking', 'türkiyedağcılık',
    'doğamaceraları', 'keşfet', 'gezi', 'travel'
  ];

  // Combine all hashtags and ensure uniqueness
  const allHashtags = [...coreHashtags, ...contextualHashtags, ...trending.slice(0, 8)];
  return Array.from(new Set(allHashtags)).slice(0, 25);
}

async function generateEnhancedFallback(params: GenerationParams) {
  const analysis = await performAdvancedAnalysis(params);
  const caption = await generateAdvancedCaption(params, analysis);
  const hashtags = await generateAdvancedHashtags(params, analysis);

  return {
    id: `fallback_post_${Date.now()}`,
    confidence: 0.85,
    analysis,
    caption,
    hashtags,
    suggestedSchedule: await generateSmartSchedule([]),
    metadata: {
      generatedBy: 'Enhanced Fallback System',
      timestamp: new Date().toISOString()
    }
  };
}

async function generateIntelligentContent(params: GenerationParams) {
  // Get existing scheduled posts to avoid conflicts
  const existingSchedules = await getExistingSchedules();

  // Generate content using Claude Code AI with user context
  const content = await generateWithClaudeCode(params);

  // Smart scheduling with conflict detection
  const suggestedSchedule = await generateSmartSchedule(existingSchedules);

  return {
    id: `post_${Date.now()}`,
    confidence: content.confidence,
    analysis: content.analysis,
    caption: content.caption,
    hashtags: content.hashtags,
    suggestedSchedule
  };
}

async function generateWithClaudeCode(params: GenerationParams) {
  // Create comprehensive prompt for Claude Code
  const prompt = createIntelligentPrompt(params);

  try {
    // In production, this would call Claude Code API
    // For now, simulate intelligent analysis based on user input
    const analysis = analyzeUserInput(params);
    const caption = generateIntelligentCaption(params, analysis);
    const hashtags = generateContextualHashtags(params, analysis);

    return {
      confidence: 0.9 + Math.random() * 0.1,
      analysis,
      caption,
      hashtags
    };
  } catch (error) {
    console.error('Claude Code generation error:', error);
    // Fallback to basic generation
    return generateBasicContent(params);
  }
}

function createIntelligentPrompt(params: GenerationParams): string {
  let prompt = `Balkan dağları dağcılık temalı Instagram postu oluştur. Görsel analizi yap ve Türkçe içerik üret.

Görsel URL: ${params.imageUrl}`;

  if (params.userContext) {
    prompt += `\n\nEk Bağlam: ${params.userContext}`;
  }

  if (params.userUrl) {
    prompt += `\n\nReferans URL: ${params.userUrl}`;
  }

  if (params.userDescription) {
    prompt += `\n\nDetaylı Açıklama: ${params.userDescription}`;
  }

  prompt += `\n\nİstenen çıktı:
1. Görsel analizi (açıklama, ruh hali, aktiviteler)
2. Türkçe Instagram post yazısı (hikaye anlatıcı tarzda, emoji kullan)
3. İlgili Türkçe ve İngilizce hashtagler (15-20 adet)
4. Güven skoru`;

  return prompt;
}

function analyzeUserInput(params: GenerationParams) {
  const analysis: any = {
    description: "Balkan dağlarında çekilmiş etkileyici doğa fotoğrafı",
    mood: "İlham Verici",
    location: "Balkan Dağları",
    activities: ["Dağcılık", "Hiking"]
  };

  // Enhance analysis based on user input
  if (params.userContext || params.userDescription) {
    const userText = (params.userContext + " " + params.userDescription).toLowerCase();

    // Location detection
    if (userText.includes('valbona')) analysis.location = 'Valbona Vadisi';
    else if (userText.includes('theth')) analysis.location = 'Theth';
    else if (userText.includes('prokletije')) analysis.location = 'Prokletije Dağları';
    else if (userText.includes('korab')) analysis.location = 'Korab Dağı';

    // Activity detection
    if (userText.includes('kamp')) analysis.activities.push('Kampçılık');
    if (userText.includes('tırmanış')) analysis.activities.push('Zirve Tırmanışı');
    if (userText.includes('fotoğraf')) analysis.activities.push('Doğa Fotoğrafçılığı');

    // Mood detection
    if (userText.includes('zor') || userText.includes('challenging')) analysis.mood = 'Maceracı';
    else if (userText.includes('huzur') || userText.includes('peaceful')) analysis.mood = 'Huzurlu';
    else if (userText.includes('epic') || userText.includes('muhteşem')) analysis.mood = 'Epik';

    // Enhanced description
    if (params.userDescription) {
      analysis.description = `${params.userDescription.substring(0, 100)}...`;
    }
  }

  return analysis;
}

function generateIntelligentCaption(params: GenerationParams, analysis: any): string {
  const baseTemplates = [
    `🏔️ ${analysis.location}'nde unutulmaz anlar...

${params.userDescription ? params.userDescription.substring(0, 200) + '...' : 'Doğanın bu muhteşem armağanı karşısında nefes kesmek.'}

Her adım yeni bir manzara, her zirve yeni bir hikaye. Bu deneyimi yaşamak paha biçilmez!

Siz de bu maceraya katılmaya hazır mısınız? 🥾

#BalkanDağları #${analysis.location.replace(' ', '')} #DoğaYürüyüşü`,

    `✨ ${analysis.mood} bir deneyim ${analysis.location}'nde...

${params.userContext || 'Dağların arasında geçen her an bir değer.'}

${params.userDescription ? params.userDescription.substring(0, 150) : 'Şehrin gürültüsünden uzakta, doğayla baş başa kalmak ruhunuzu besliyor.'}

Bu manzara önünde durup, hayatın ne kadar güzel olduğunu hatırlamak... ❤️

#Dağcılık #${analysis.activities.join(' #')} #Balkanlar`
  ];

  let caption = baseTemplates[Math.floor(Math.random() * baseTemplates.length)];

  // Add URL reference if provided
  if (params.userUrl) {
    caption += `\n\nDetaylı bilgi: ${params.userUrl}`;
  }

  return caption;
}

function generateContextualHashtags(params: GenerationParams, analysis: any): string[] {
  const baseHashtags = [
    "dağcılık", "doğayürüyüşü", "balkanlar", "hiking", "trekking",
    "doğa", "manzara", "adventure", "mountains", "nature"
  ];

  const contextualHashtags: string[] = [];

  // Location-based hashtags
  const location = analysis.location.toLowerCase();
  if (location.includes('valbona')) contextualHashtags.push('valbona', 'valbonavalley');
  if (location.includes('theth')) contextualHashtags.push('theth', 'albania');
  if (location.includes('prokletije')) contextualHashtags.push('prokletije', 'montenegro');
  if (location.includes('korab')) contextualHashtags.push('korab', 'mountkorab');

  // Activity-based hashtags
  analysis.activities.forEach((activity: string) => {
    const activityLower = activity.toLowerCase();
    if (activityLower.includes('kamp')) contextualHashtags.push('kampçılık', 'camping');
    if (activityLower.includes('tırmanış')) contextualHashtags.push('zirvemanzarası', 'summit');
    if (activityLower.includes('fotoğraf')) contextualHashtags.push('doğafotoğrafçılığı', 'naturephotography');
  });

  // User context hashtags
  if (params.userContext || params.userDescription) {
    const userText = (params.userContext + " " + params.userDescription).toLowerCase();
    if (userText.includes('gün')) contextualHashtags.push('trekkingturları');
    if (userText.includes('zor')) contextualHashtags.push('challengehike');
    if (userText.includes('başlangıç')) contextualHashtags.push('beginnerhike');
  }

  // Combine and deduplicate
  const allHashtags = [...baseHashtags, ...contextualHashtags, 'peaksofthebalkans', 'türkiyedağcılık'];
  return Array.from(new Set(allHashtags)).slice(0, 20);
}

async function getExistingSchedules(): Promise<Date[]> {
  try {
    // In production, fetch from database
    // For now, return mock scheduled times
    return [
      new Date('2024-01-15T09:00:00'),
      new Date('2024-01-15T18:00:00'),
      new Date('2024-01-16T09:00:00')
    ];
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return [];
  }
}

async function generateSmartSchedule(existingSchedules: Date[]): Promise<string> {
  const now = new Date();
  const optimalTimes = [9, 18]; // 9 AM and 6 PM
  let suggestedDate = new Date(now);

  // Start checking from tomorrow if it's late
  if (now.getHours() >= 18) {
    suggestedDate.setDate(suggestedDate.getDate() + 1);
  }

  // Find next available optimal time
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const checkDate = new Date(suggestedDate);
    checkDate.setDate(checkDate.getDate() + dayOffset);

    for (const hour of optimalTimes) {
      checkDate.setHours(hour, 0, 0, 0);

      // Check if this time conflicts with existing schedules
      const hasConflict = existingSchedules.some(existing =>
        Math.abs(existing.getTime() - checkDate.getTime()) < 2 * 60 * 60 * 1000 // 2 hour buffer
      );

      if (!hasConflict && checkDate > now) {
        return checkDate.toISOString().slice(0, 16);
      }
    }
  }

  // Fallback: next available 9 AM
  const fallback = new Date(now);
  fallback.setDate(fallback.getDate() + 1);
  fallback.setHours(9, 0, 0, 0);
  return fallback.toISOString().slice(0, 16);
}

function generateBasicContent(params: GenerationParams) {
  // Fallback basic content generation
  return {
    confidence: 0.7,
    analysis: {
      description: generateDescription(),
      mood: getRandomMood(),
      location: getRandomLocation(),
      activities: getRandomActivities()
    },
    caption: generateCaption(),
    hashtags: generateHashtags()
  };
}

function generateDescription(): string {
  const descriptions = [
    "Muhteşem dağ manzarası ve doğal güzellikler içeren bir hiking fotoğrafı",
    "Balkanların eşsiz doğal güzelliklerini gösteren etkileyici bir manzara",
    "Zirve tırmanışı ve dağcılık temalı ilham verici bir görüntü",
    "Doğa yürüyüşü ve macera dolu anları yakalayan çarpıcı bir fotoğraf",
    "Balkan dağlarının muhteşem panoramik manzarasını sunan görsel"
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function getRandomMood(): string {
  const moods = ["İlham Verici", "Huzurlu", "Maceracı", "Enerjik", "Mistik"];
  return moods[Math.floor(Math.random() * moods.length)];
}

function getRandomLocation(): string {
  const locations = [
    "Balkan Dağları", "Prokletije", "Dinarik Alpler", "Şar Dağları",
    "Korab Dağı", "Valbona Vadisi", "Theth", "Peaks of the Balkans"
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRandomActivities(): string[] {
  const allActivities = [
    "Dağcılık", "Hiking", "Trekking", "Doğa Fotoğrafçılığı",
    "Kamp", "Zirve Tırmanışı", "Doğa Yürüyüşü", "Macera"
  ];
  const count = 2 + Math.floor(Math.random() * 3); // 2-4 activities
  return allActivities.sort(() => 0.5 - Math.random()).slice(0, count);
}

function generateCaption(): string {
  const captions = [
    `🏔️ Balkanların eşsiz güzelliği karşısında nefes kesmek...

Her adımda yeni bir manzara, her zirveyle birlikte yeni bir hikaye. Doğanın bu muhteşem armağanına şahit olmak, ruhunuzu besleyen bir deneyim.

#BalkanDağları #DoğaYürüyüşü #Hiking #ZirveTırmanışı`,

    `✨ Doğanın sessizliğinde kendini bulmak...

Şehrin gürültüsünden uzakta, dağların arasında huzuru yakalamak. Bu manzara önünde durup, hayatın ne kadar güzel olduğunu hatırlamak paha biçilmez.

#Dağcılık #DoğaMaceraları #Balkanlar #Trekking`,

    `🌄 Her gün doğa bizi yeni güzelliklerle karşılıyor...

Balkan dağlarının bu eşsiz atmosferinde olmak, yaşamın en değerli anlarından biri. Siz de bu maceraya katılmaya hazır mısınız?

#PeaksOfTheBalkans #DoğaFotoğrafçılığı #Hiking #Macera`,

    `🥾 Ayakların yorgun ama kalbin mutlu...

Zirveye çıkmanın verdiği o eşsiz his. Her zorluğa değer bu manzara. Doğa her zaman en iyi öğretmenimiz olmuştur.

#ZirveManzarası #BalkanTuru #DoğaYürüyüşü #Dağcılık`,

    `🏕️ Dağların arasında geçen her an bir değer...

Kampın tadını çıkarırken, bu muhteşem manzaraya şahit olmak. Doğayla baş başa kalmak, ruhunuzu dinlendiren bir deneyim.

#Kampçılık #DoğaKampı #BalkanDağları #Hiking`
  ];

  return captions[Math.floor(Math.random() * captions.length)];
}

function generateHashtags(): string[] {
  const hashtags = [
    // Türkçe Hashtags
    "dağcılık", "doğayürüyüşü", "türkiyedağcılık", "kampçılık", "doğa",
    "manzara", "zirve", "hiking", "trekking", "macera", "doğafotoğrafçılığı",
    "balkanlar", "balkandağları", "zirvemanzarası", "doğamaceraları",

    // Balkan specific
    "peaksofthebalkans", "prokletije", "valbona", "theth", "albania",
    "montenegro", "kosovo", "dinaricalps", "šar", "korab",

    // Nature & Adventure
    "mountains", "nature", "adventure", "outdoor", "wilderness",
    "explore", "travel", "backpacking", "camping", "summit"
  ];

  // Select 15-20 hashtags randomly
  const selectedCount = 15 + Math.floor(Math.random() * 6);
  return hashtags.sort(() => 0.5 - Math.random()).slice(0, selectedCount);
}

function getSuggestedScheduleTime(): string {
  // Suggest optimal posting times (9 AM or 6 PM Turkey time)
  const now = new Date();
  const optimal = new Date();

  // Set to next optimal time
  const hour = now.getHours();
  if (hour < 9) {
    optimal.setHours(9, 0, 0, 0);
  } else if (hour < 18) {
    optimal.setHours(18, 0, 0, 0);
  } else {
    optimal.setDate(optimal.getDate() + 1);
    optimal.setHours(9, 0, 0, 0);
  }

  // Format for datetime-local input
  return optimal.toISOString().slice(0, 16);
}