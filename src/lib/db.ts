'use server';

import Database from 'better-sqlite3';

// This represents the story as it is in the database.
// The content is a raw HTML string.
export interface DbStory {
    id: number;
    slug: string;
    title: string;
    author: string;
    summary: string;
    content: string; // Stored as a string in DB
    createdAt: Date;
}

export interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: Date;
  isAppropriate: boolean;
  originalMessage?: string;
}

const db = new Database('paddlefish.db');

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

// Seed comments
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

// --- Comment Functions ---

export async function getComments(): Promise<Comment[]> {
  return new Promise((resolve, reject) => {
    try {
      const stmt = db.prepare('SELECT * FROM comments ORDER BY createdAt DESC');
      const rows = stmt.all() as any[];
      resolve(rows.map(row => ({
        ...row,
        createdAt: new Date(row.createdAt),
        isAppropriate: row.isAppropriate === 1,
      })));
    } catch (error) {
      reject(error);
    }
  });
}

export async function addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    return new Promise((resolve, reject) => {
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
            resolve({ ...comment, id: result.lastInsertRowid as number, createdAt });
        } catch (error) {
            reject(error);
        }
    });
}

// --- Story Functions ---

export async function getDbStories(): Promise<Omit<DbStory, 'id' | 'createdAt'>[]> {
    return new Promise((resolve, reject) => {
        try {
            const stmt = db.prepare('SELECT slug, title, author, summary, content, createdAt FROM stories ORDER BY createdAt DESC');
            const rows = stmt.all() as any[];
            resolve(rows.map(row => ({ ...row, createdAt: new Date(row.createdAt) })));
        } catch (error) {
            reject(error);
        }
    });
}

export async function addStory(story: Omit<DbStory, 'id' | 'createdAt'>): Promise<DbStory> {
    return new Promise((resolve, reject) => {
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
            resolve({ ...story, id: result.lastInsertRowid as number, createdAt });
        } catch(error) {
            reject(error);
        }
    });
}

export async function getDbStoryBySlug(slug: string): Promise<Omit<DbStory, 'id' | 'createdAt'> | undefined> {
    return new Promise((resolve, reject) => {
        try {
            const stmt = db.prepare('SELECT slug, title, author, summary, content, createdAt FROM stories WHERE slug = ?');
            const row = stmt.get(slug) as any;
            if (row) {
                resolve({ ...row, createdAt: new Date(row.createdAt) });
            } else {
                resolve(undefined);
            }
        } catch (error) {
            reject(error);
        }
    });
}