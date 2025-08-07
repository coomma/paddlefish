'use server';

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// This represents the story as it is in the database.
// The content is a raw HTML string.
export interface DbStory {
    id: number;
    slug: string;
    title: string;
    author: string;
    summary: string;
    content: string;
    createdAt: string; // Stored as string in DB
}

export interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: Date;
  isAppropriate: boolean;
  originalMessage?: string;
}

// Use /tmp directory for the database to ensure writability on server environments
const dbPath = process.env.NODE_ENV === 'development' 
  ? 'paddlefish.db' 
  : path.join('/tmp', 'paddlefish.db');

function initializeDb() {
    // Ensure the directory exists in development
    if (process.env.NODE_ENV === 'development') {
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }
    
    const db = new Database(dbPath);
    
    // Create tables if they don't exist
    db.exec(`
        CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        message TEXT NOT NULL,
        createdAt DATETIME NOT NULL,
        isAppropriate INTEGER NOT NULL,
        originalMessage TEXT
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt DATETIME NOT NULL
        )
    `);

    // Seed data if necessary
    const commentCount = db.prepare('SELECT COUNT(*) as count FROM comments').get() as { count: number };
    if (commentCount.count === 0) {
        const seed = [
            {
            author: 'River Enthusiast',
            message: 'A tragic loss for the world. The Yangtze will never be the same. May we learn from this.',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
            isAppropriate: 1,
            originalMessage: null,
            },
            {
            author: 'Jane D.',
            message: 'I remember reading about this majestic fish as a child. It\'s heartbreaking to know it\'s gone forever. A beautiful memorial.',
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
            isAppropriate: 1,
            originalMessage: null,
            },
        ];
        const insertComment = db.prepare('INSERT INTO comments (author, message, createdAt, isAppropriate, originalMessage) VALUES (?, ?, ?, ?, ?)');
        db.transaction((comments) => {
            for (const comment of comments) {
            insertComment.run(comment.author, comment.message, comment.createdAt.toISOString(), comment.isAppropriate, comment.originalMessage);
            }
        })(seed);
    }

    return db;
}


// --- Comment Functions ---

export async function getComments(): Promise<Comment[]> {
  const db = initializeDb();
  try {
    const stmt = db.prepare('SELECT * FROM comments ORDER BY createdAt DESC');
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      createdAt: new Date(row.createdAt),
      isAppropriate: row.isAppropriate === 1,
    }));
  } finally {
    db.close();
  }
}

export async function addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
  const db = initializeDb();
  try {
    const createdAt = new Date();
    const stmt = db.prepare('INSERT INTO comments (author, message, createdAt, isAppropriate, originalMessage) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(
        comment.author,
        comment.message,
        createdAt.toISOString(),
        comment.isAppropriate ? 1 : 0,
        comment.originalMessage
    );
    return { ...comment, id: result.lastInsertRowid as number, createdAt };
  } finally {
    db.close();
  }
}

// --- Story Functions ---

export async function getDbStories(): Promise<DbStory[]> {
  const db = initializeDb();
  try {
    const stmt = db.prepare('SELECT id, slug, title, author, summary, content, createdAt FROM stories ORDER BY createdAt DESC');
    return stmt.all() as DbStory[];
  } finally {
    db.close();
  }
}

export async function addStory(story: Omit<DbStory, 'id' | 'createdAt'>): Promise<DbStory> {
  const db = initializeDb();
  try {
    const createdAt = new Date();
    const stmt = db.prepare('INSERT INTO stories (slug, title, author, summary, content, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
    const result = stmt.run(
        story.slug,
        story.title,
        story.author,
        story.summary,
        story.content,
        createdAt.toISOString()
    );
    return { ...story, id: result.lastInsertRowid as number, createdAt: createdAt.toISOString() };
  } finally {
    db.close();
  }
}

export async function getDbStoryBySlug(slug: string): Promise<DbStory | undefined> {
  const db = initializeDb();
  try {
    const stmt = db.prepare('SELECT id, slug, title, author, summary, content, createdAt FROM stories WHERE slug = ?');
    const row = stmt.get(slug) as DbStory | undefined;
    return row;
  } finally {
    db.close();
  }
}
