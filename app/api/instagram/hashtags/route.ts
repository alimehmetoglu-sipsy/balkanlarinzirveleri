import { NextRequest, NextResponse } from 'next/server';
import { db, InstagramHashtag } from '../../../../lib/database/connection';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('active');
    const category = searchParams.get('category');
    const language = searchParams.get('language');

    let sql = 'SELECT * FROM instagram_hashtags';
    const params: any[] = [];
    const conditions: string[] = [];

    if (isActive !== null) {
      conditions.push(`is_active = $${params.length + 1}`);
      params.push(isActive === 'true');
    }

    if (category && category !== 'all') {
      conditions.push(`category = $${params.length + 1}`);
      params.push(category);
    }

    if (language && language !== 'all') {
      conditions.push(`language = $${params.length + 1}`);
      params.push(language);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY priority DESC, hashtag ASC';

    const hashtags = await db.query<InstagramHashtag>(sql, params);

    return NextResponse.json(hashtags);
  } catch (error) {
    console.error('Error fetching hashtags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hashtags' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      hashtag,
      category = 'secondary',
      priority = 'medium',
      language = 'tr'
    } = await request.json();

    if (!hashtag) {
      return NextResponse.json(
        { error: 'Hashtag is required' },
        { status: 400 }
      );
    }

    // Clean hashtag (remove # if present)
    const cleanHashtag = hashtag.replace('#', '').toLowerCase();

    const sql = `
      INSERT INTO instagram_hashtags (hashtag, category, priority, language)
      VALUES ($1, $2, $3, $4)
    `;

    const params = [cleanHashtag, category, priority, language];

    try {
      const hashtagId = await db.insert(sql, params);

      const newHashtag = await db.queryFirst<InstagramHashtag>(
        'SELECT * FROM instagram_hashtags WHERE id = $1',
        [hashtagId]
      );

      return NextResponse.json(newHashtag, { status: 201 });
    } catch (insertError: any) {
      if (insertError.message?.includes('UNIQUE') || insertError.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return NextResponse.json(
          { error: 'Hashtag already exists' },
          { status: 409 }
        );
      }
      throw insertError;
    }
  } catch (error) {
    console.error('Error creating hashtag:', error);
    return NextResponse.json(
      { error: 'Failed to create hashtag' },
      { status: 500 }
    );
  }
}