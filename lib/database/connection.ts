import { createPool } from '@vercel/postgres';

// Vercel Postgres configuration
const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

// For local development fallback
let fallbackPool: any = null;

if (!process.env.POSTGRES_URL) {
  // Local SQLite for development
  const Database = require('better-sqlite3');
  fallbackPool = new Database('./data/instagram.db');

  // Enable foreign keys
  fallbackPool.exec('PRAGMA foreign_keys = ON');
}

// Database connection wrapper
export class Database {
  private static instance: Database;
  private isProduction: boolean;

  private constructor() {
    this.isProduction = !!process.env.POSTGRES_URL;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Execute query with error handling
  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    try {
      if (this.isProduction) {
        // Vercel Postgres
        const client = await pool.connect();
        try {
          const result = await client.query(sql, params);
          return result.rows as T[];
        } finally {
          client.release();
        }
      } else {
        // Local SQLite
        if (!fallbackPool) throw new Error('Database not initialized');

        // Convert PostgreSQL syntax to SQLite
        const sqliteSQL = this.convertToSQLite(sql);
        const stmt = fallbackPool.prepare(sqliteSQL);

        if (sql.trim().toLowerCase().startsWith('select')) {
          return stmt.all(params || []) as T[];
        } else {
          const result = stmt.run(params || []);
          return [result] as T[];
        }
      }
    } catch (error) {
      console.error('Database query error:', error);
      console.error('SQL:', sql);
      console.error('Params:', params);
      throw error;
    }
  }

  // Execute single query and return first result
  async queryFirst<T = any>(sql: string, params?: any[]): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results.length > 0 ? results[0] : null;
  }

  // Execute multiple queries in transaction
  async transaction<T>(queries: Array<{ sql: string; params?: any[] }>): Promise<T[]> {
    if (this.isProduction) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        const results: T[] = [];
        for (const { sql, params } of queries) {
          const result = await client.query(sql, params);
          results.push(result.rows as T);
        }

        await client.query('COMMIT');
        return results;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    } else {
      // SQLite transaction
      const transaction = fallbackPool.transaction(() => {
        const results: T[] = [];
        for (const { sql, params } of queries) {
          const sqliteSQL = this.convertToSQLite(sql);
          const stmt = fallbackPool.prepare(sqliteSQL);
          const result = stmt.run(params || []);
          results.push(result as T);
        }
        return results;
      });

      return transaction();
    }
  }

  // Insert and return inserted ID
  async insert(sql: string, params?: any[]): Promise<string> {
    try {
      if (this.isProduction) {
        const client = await pool.connect();
        try {
          const result = await client.query(sql + ' RETURNING id', params);
          return result.rows[0]?.id || '';
        } finally {
          client.release();
        }
      } else {
        const sqliteSQL = this.convertToSQLite(sql);
        const stmt = fallbackPool.prepare(sqliteSQL);
        const result = stmt.run(params || []);
        return result.lastInsertRowid?.toString() || '';
      }
    } catch (error) {
      console.error('Insert error:', error);
      throw error;
    }
  }

  // Update and return affected rows
  async update(sql: string, params?: any[]): Promise<number> {
    try {
      const results = await this.query(sql, params);
      if (this.isProduction) {
        return (results as any).rowCount || 0;
      } else {
        return (results[0] as any)?.changes || 0;
      }
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  }

  // Delete and return affected rows
  async delete(sql: string, params?: any[]): Promise<number> {
    return this.update(sql, params);
  }

  // Convert PostgreSQL syntax to SQLite
  private convertToSQLite(sql: string): string {
    return sql
      .replace(/\$(\d+)/g, '?') // Convert $1, $2 to ?
      .replace(/::json/g, '') // Remove JSON casting
      .replace(/uuid\(\)/g, 'hex(randomblob(16))') // UUID function
      .replace(/NOW\(\)/g, 'datetime("now")') // NOW function
      .replace(/CURRENT_TIMESTAMP/g, 'datetime("now")'); // Current timestamp
  }

  // Check if database connection is healthy
  async healthCheck(): Promise<boolean> {
    try {
      await this.query('SELECT 1 as health');
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Initialize database schema
  async initializeSchema(): Promise<void> {
    try {
      if (this.isProduction) {
        // Use Vercel Postgres schema
        await this.initializePostgreSQLSchema();
      } else {
        // Use SQLite schema
        await this.initializeSQLiteSchema();
      }

      console.log('Database schema initialized successfully');
    } catch (error) {
      console.error('Schema initialization error:', error);
      throw error;
    }
  }

  private async initializePostgreSQLSchema(): Promise<void> {
    const schema = `
      -- Posts table
      CREATE TABLE IF NOT EXISTS instagram_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        caption TEXT NOT NULL,
        image_url VARCHAR(500),
        image_path VARCHAR(500),
        hashtags JSONB DEFAULT '[]',
        scheduled_for TIMESTAMP,
        status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'posted')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        posted_at TIMESTAMP,
        engagement JSONB
      );

      -- Hashtags table
      CREATE TABLE IF NOT EXISTS instagram_hashtags (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hashtag VARCHAR(100) NOT NULL UNIQUE,
        is_active BOOLEAN DEFAULT true,
        category VARCHAR(20) DEFAULT 'secondary' CHECK (category IN ('primary', 'secondary', 'location', 'activity')),
        priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
        language VARCHAR(10) DEFAULT 'tr' CHECK (language IN ('tr', 'en', 'mixed')),
        added_date TIMESTAMP DEFAULT NOW(),
        last_checked TIMESTAMP,
        posts_found INTEGER DEFAULT 0,
        comments_posted INTEGER DEFAULT 0,
        avg_engagement DECIMAL(5,2) DEFAULT 0.00
      );

      -- Comments table
      CREATE TABLE IF NOT EXISTS instagram_comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        post_url VARCHAR(500) NOT NULL,
        original_post TEXT,
        suggested_comment TEXT NOT NULL,
        hashtag VARCHAR(100),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'posted')),
        confidence_score DECIMAL(3,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT NOW(),
        approved_at TIMESTAMP,
        posted_at TIMESTAMP,
        engagement JSONB
      );

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_posts_status ON instagram_posts(status);
      CREATE INDEX IF NOT EXISTS idx_posts_scheduled ON instagram_posts(scheduled_for);
      CREATE INDEX IF NOT EXISTS idx_hashtags_active ON instagram_hashtags(is_active);
      CREATE INDEX IF NOT EXISTS idx_comments_status ON instagram_comments(status);
    `;

    const statements = schema.split(';').filter(s => s.trim());
    for (const statement of statements) {
      await this.query(statement.trim());
    }
  }

  private async initializeSQLiteSchema(): Promise<void> {
    const schema = `
      CREATE TABLE IF NOT EXISTS instagram_posts (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        caption TEXT NOT NULL,
        image_url TEXT,
        image_path TEXT,
        hashtags TEXT DEFAULT '[]',
        scheduled_for TEXT,
        status TEXT DEFAULT 'draft',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now')),
        posted_at TEXT,
        engagement TEXT
      );

      CREATE TABLE IF NOT EXISTS instagram_hashtags (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        hashtag TEXT NOT NULL UNIQUE,
        is_active INTEGER DEFAULT 1,
        category TEXT DEFAULT 'secondary',
        priority TEXT DEFAULT 'medium',
        language TEXT DEFAULT 'tr',
        added_date TEXT DEFAULT (datetime('now')),
        last_checked TEXT,
        posts_found INTEGER DEFAULT 0,
        comments_posted INTEGER DEFAULT 0,
        avg_engagement REAL DEFAULT 0.00
      );

      CREATE TABLE IF NOT EXISTS instagram_comments (
        id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
        post_url TEXT NOT NULL,
        original_post TEXT,
        suggested_comment TEXT NOT NULL,
        hashtag TEXT,
        status TEXT DEFAULT 'pending',
        confidence_score REAL DEFAULT 0.00,
        created_at TEXT DEFAULT (datetime('now')),
        approved_at TEXT,
        posted_at TEXT,
        engagement TEXT
      );
    `;

    const statements = schema.split(';').filter(s => s.trim());
    for (const statement of statements) {
      fallbackPool.exec(statement.trim());
    }
  }

  // Close all connections
  async close(): Promise<void> {
    if (this.isProduction) {
      await pool.end();
    } else if (fallbackPool) {
      fallbackPool.close();
    }
  }
}

// Export singleton instance
export const db = Database.getInstance();

// Export types for external use
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

export interface InstagramActivity {
  id: string;
  hashtag: string;
  post_url: string;
  action: 'found' | 'commented' | 'liked';
  timestamp: string;
  engagement_rate: number;
  success: boolean;
  error_message?: string;
}

export interface InstagramSettings {
  id: string;
  setting_key: string;
  setting_value: any;
  description?: string;
  created_at: string;
  updated_at: string;
}