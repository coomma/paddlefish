'use server';

import Database from 'better-sqlite3';
import type { Story } from '@/lib/stories';

export interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: Date;
  isAppropriate: boolean;
  originalMessage?: string;
}

const db = new Database('paddlefish.db');

// Create comments table
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

// Create stories table
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


// Seed comments with initial data if the table is empty
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
  const insertManyComments = db.transaction((comments) => {
    for (const comment of comments) {
      insertComment.run(comment.author, comment.message, comment.createdAt.toISOString(), comment.isAppropriate, comment.originalMessage);
    }
  });
  insertManyComments(seed);
}


export const getComments = async (): Promise<Comment[]> => {
  const stmt = db.prepare('SELECT * FROM comments ORDER BY createdAt DESC');
  const rows = stmt.all() as any[];

  return rows.map(row => ({
    ...row,
    createdAt: new Date(row.createdAt),
    isAppropriate: row.isAppropriate === 1,
  }));
};

export const addComment = async (comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
  const createdAt = new Date();
  const stmt = db.prepare('INSERT INTO comments (author, message, createdAt, isAppropriate, originalMessage) VALUES (?, ?, ?, ?, ?)');
  
  const result = stmt.run(
    comment.author,
    comment.message,
    createdAt.toISOString(),
    comment.isAppropriate ? 1 : 0,
    comment.originalMessage
  );

  const newComment: Comment = {
    ...comment,
    id: result.lastInsertRowid as number,
    createdAt,
  };

  return newComment;
};

// --- Story Functions ---

export const getDbStories = async (): Promise<Story[]> => {
  const stmt = db.prepare('SELECT * FROM stories ORDER BY createdAt DESC');
  const rows = stmt.all() as any[];
  return rows.map(row => ({ ...row }));
};

export const addStory = async (story: Omit<Story, 'id' | 'createdAt' | 'slug'> & {slug: string}): Promise<Story> => {
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

  const newStory: Story = {
    ...story,
  };

  return newStory;
};

export const getDbStoryBySlug = async (slug: string): Promise<Story | undefined> => {
  const stmt = db.prepare('SELECT * FROM stories WHERE slug = ?');
  const row = stmt.get(slug) as any;
  return row ? { ...row } : undefined;
};
