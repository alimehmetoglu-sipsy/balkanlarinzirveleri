import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export class SQLiteDatabase {
  private static instance: SQLiteDatabase;
  private db: Database.Database;

  private constructor() {
    const dbDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const dbPath = path.join(dbDir, 'instagram.db');
    this.db = new Database(dbPath);

    this.db.pragma('journal_mode = WAL');
    this.db.pragma('busy_timeout = 5000');

    this.initializeSchema();
  }

  public static getInstance(): SQLiteDatabase {
    if (!SQLiteDatabase.instance) {
      SQLiteDatabase.instance = new SQLiteDatabase();
    }
    return SQLiteDatabase.instance;
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    try {
      if (sql.trim().toUpperCase().startsWith('SELECT') ||
          sql.trim().toUpperCase().startsWith('WITH')) {
        const stmt = this.db.prepare(sql);
        return (params ? stmt.all(...params) : stmt.all()) as T[];
      } else {
        const stmt = this.db.prepare(sql);
        const result = params ? stmt.run(...params) : stmt.run();
        return [] as T[];
      }
    } catch (error) {
      console.error('Database query error:', error);
      console.error('SQL:', sql);
      console.error('Params:', params);
      throw error;
    }
  }

  async queryFirst<T = any>(sql: string, params?: any[]): Promise<T | null> {
    try {
      const stmt = this.db.prepare(sql);
      const result = params ? stmt.get(...params) : stmt.get();
      return result as T | null;
    } catch (error) {
      console.error('Database queryFirst error:', error);
      throw error;
    }
  }

  async insert(sql: string, params?: any[]): Promise<string> {
    try {
      const stmt = this.db.prepare(sql);
      const result = params ? stmt.run(...params) : stmt.run();
      return String(result.lastInsertRowid);
    } catch (error) {
      console.error('Insert error:', error);
      throw error;
    }
  }

  async update(sql: string, params?: any[]): Promise<number> {
    try {
      const stmt = this.db.prepare(sql);
      const result = params ? stmt.run(...params) : stmt.run();
      return result.changes;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }

  async delete(sql: string, params?: any[]): Promise<number> {
    return this.update(sql, params);
  }

  async healthCheck(): Promise<boolean> {
    try {
      const result = this.db.prepare('SELECT 1 as health').get();
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  async initializeSchema(): Promise<void> {
    try {
      this.db.exec(`
        -- Posts table
        CREATE TABLE IF NOT EXISTS instagram_posts (
          id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
          caption TEXT NOT NULL,
          image_url TEXT,
          image_path TEXT,
          hashtags TEXT DEFAULT '[]',
          scheduled_for TEXT,
          status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'posted')),
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now')),
          posted_at TEXT,
          engagement TEXT
        );

        -- Hashtags table
        CREATE TABLE IF NOT EXISTS instagram_hashtags (
          id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
          hashtag TEXT NOT NULL UNIQUE,
          is_active INTEGER DEFAULT 1,
          category TEXT DEFAULT 'secondary' CHECK (category IN ('primary', 'secondary', 'location', 'activity')),
          priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
          language TEXT DEFAULT 'tr' CHECK (language IN ('tr', 'en', 'mixed')),
          added_date TEXT DEFAULT (datetime('now')),
          last_checked TEXT,
          posts_found INTEGER DEFAULT 0,
          comments_posted INTEGER DEFAULT 0,
          avg_engagement REAL DEFAULT 0.00
        );

        -- Comments table
        CREATE TABLE IF NOT EXISTS instagram_comments (
          id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
          post_url TEXT NOT NULL,
          original_post TEXT,
          suggested_comment TEXT NOT NULL,
          hashtag TEXT,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'posted')),
          confidence_score REAL DEFAULT 0.00,
          created_at TEXT DEFAULT (datetime('now')),
          approved_at TEXT,
          posted_at TEXT,
          engagement TEXT
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_posts_status ON instagram_posts(status);
        CREATE INDEX IF NOT EXISTS idx_posts_scheduled ON instagram_posts(scheduled_for);
        CREATE INDEX IF NOT EXISTS idx_hashtags_active ON instagram_hashtags(is_active);
        CREATE INDEX IF NOT EXISTS idx_comments_status ON instagram_comments(status);
      `);

      console.log('SQLite database schema initialized successfully');
    } catch (error) {
      console.error('Schema initialization error:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    this.db.close();
  }
}

export const db = SQLiteDatabase.getInstance();

export interface InstagramPost {
  id: string;
  caption: string;
  image_url?: string;
  image_path?: string;
  hashtags: string[];
  scheduled_for?: string;
  status: 'draft' | 'scheduled' | 'posted';
  created_at: string;
  updated_at: string;
  posted_at?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface InstagramHashtag {
  id: string;
  hashtag: string;
  is_active: boolean;
  category: 'primary' | 'secondary' | 'location' | 'activity';
  priority: 'high' | 'medium' | 'low';
  language: 'tr' | 'en' | 'mixed';
  added_date: string;
  last_checked?: string;
  posts_found: number;
  comments_posted: number;
  avg_engagement: number;
}

export interface InstagramComment {
  id: string;
  post_url: string;
  original_post?: string;
  suggested_comment: string;
  hashtag?: string;
  status: 'pending' | 'approved' | 'rejected' | 'posted';
  confidence_score: number;
  created_at: string;
  approved_at?: string;
  posted_at?: string;
  engagement?: any;
}