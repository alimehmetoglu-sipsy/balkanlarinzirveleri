import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      imageUrl,
      imagePath,
      context,
      userContext,
      userUrl,
      userDescription
    } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Generate intelligent content using Claude Code AI
    const aiAnalysis = await generateIntelligentContent({
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