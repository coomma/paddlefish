// This file contains the synchronous, server-only database logic using better-sqlite3.
// It should not be imported directly into any component or file that uses 'use server'.
// It is wrapped by `db.ts` which provides an async interface.

import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Define the path for the database file.
const dbDir = path.join(process.cwd(), '.db');
const dbPath = path.join(dbDir, 'paddlefish.db');

export interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: string; // Stored as ISO8601 string
  isAppropriate: boolean;
  originalMessage?: string;
}

export interface DbStory {
  id: number;
  slug: string;
  title: string;
  author: string;
  summary: string;
  content: string;
  createdAt: string;
}

let dbInstance: Database.Database;

function initializeDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  // Ensure the .db directory exists
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = new Database(dbPath);

  // Check if tables have been created
  const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='stories'").get();

  if (!tableCheck) {
    console.log('Database not found or empty. Creating tables and seeding data...');
    // Create tables
    db.exec(`
        CREATE TABLE stories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            summary TEXT NOT NULL,
            content TEXT NOT NULL,
            createdAt TEXT NOT NULL
        );
    `);

    db.exec(`
        CREATE TABLE comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author TEXT NOT NULL,
            message TEXT NOT NULL,
            createdAt TEXT NOT NULL,
            isAppropriate BOOLEAN NOT NULL DEFAULT 1,
            originalMessage TEXT
        );
    `);

    // Seed initial data
    const seedStories = [
      {
        slug: 'the-last-sighting',
        title: 'The Last Sighting',
        author: 'River Historian',
        summary: 'A detailed account of the final confirmed encounter with a Chinese Paddlefish in January 2003.',
        content: `<p>On a cold January day in 2003, along the Nanxi River, a tributary of the mighty Yangtze, fishermen inadvertently captured a living legend. It was a female Chinese Paddlefish, measuring over 3 meters long. The moment was bittersweet; a confirmation the species still existed, but also a stark reminder of its rarity.</p><p>Scientists, alerted to the catch, rushed to the scene. They attached an ultrasonic tracker to the fish, hoping to finally understand its mysterious underwater life. With great care, she was released back into the murky waters on January 27th. The team tracked her signal for a few precious hours before their boat was damaged, forcing them to abandon the pursuit. The signal faded, and with it, the last living trace of the Chinese Paddlefish. She was never seen again.</p>`,
      },
      {
        slug: 'the-dam-dilemma',
        title: 'The Dam Dilemma',
        author: 'Conservation Scientist',
        summary: 'An analysis of how dam construction on the Yangtze sealed the fate of the paddlefish.',
        content: `<p>The story of the Chinese Paddlefish is inextricably linked to the story of the Yangtze River's development. For millennia, the fish followed an ancient migratory path, traveling hundreds of kilometers upstream to spawn. The construction of the Gezhouba Dam in 1981 was the first major blow. It was built without a fish ladder, creating an impassable barrier.</p><p>The paddlefish population was instantly fragmented. The fish downstream could no longer reach their spawning grounds. While some spawning may have occurred below the dam, it was insufficient to sustain the population. The later construction of the even larger Three Gorges Dam further altered the river's hydrology and sealed the species' fate. The river that had been its cradle for millions of years became its tomb.</p>`,
      },
      {
        slug: 'a-fishermans-tale',
        title: 'A Fisherman\'s Tale',
        author: 'Elder Fisherman',
        summary: 'A recollection from an old fisherman who remembers a time when the "King of Fish" was more common.',
        content: `<p>My father and his father before him fished the Yangtze. They spoke of the <em>bai xun</em>, the Chinese Paddlefish, with reverence. They called it the "King of Fish." In my youth, in the 1970s, seeing one was still possible, though it was always an event. They were immense, powerful creatures that commanded respect.</p><p>We never targeted them, but sometimes they would be caught in our nets. The meat was prized, but my father always said it was bad luck to catch one, that it meant the river was losing its spirit. By the time I was a man, they were like ghosts. A rumor of a sighting would ripple through the villages, but they were just stories.The river grew quieter, and the king was gone.</p>`,
      }
    ];

    const seedComments = [
        { author: 'River Enthusiast', message: 'A tragic loss for the world. The Yangtze will never be the same. May we learn from this.'},
        { author: 'Jane D.', message: 'I remember reading about this majestic fish as a child. It\'s heartbreaking to know it\'s gone forever. A beautiful memorial.' },
    ];
    
    const insertStory = db.prepare('INSERT INTO stories (slug, title, author, summary, content, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
    const insertComment = db.prepare('INSERT INTO comments (author, message, createdAt, isAppropriate) VALUES (?, ?, ?, ?)');
    
    const now = new Date().toISOString();
    
    db.transaction(() => {
        for (const story of seedStories) {
            insertStory.run(story.slug, story.title, story.author, story.summary, story.content, now);
        }
        for (const comment of seedComments) {
            insertComment.run(comment.author, comment.message, now, 1);
        }
    })();

    console.log('Database seeded successfully.');
  }

  dbInstance = db;
  return dbInstance;
}

// --- Synchronous Data Access Functions ---

export function getDbStoriesSync(): DbStory[] {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare('SELECT * FROM stories ORDER BY createdAt DESC');
    return stmt.all() as DbStory[];
  } catch (error) {
    console.error("Failed to get stories:", error);
    return [];
  }
}

export function getDbStoryBySlugSync(slug: string): DbStory | undefined {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare('SELECT * FROM stories WHERE slug = ?');
    return stmt.get(slug) as DbStory | undefined;
  } catch (error) {
    console.error(`Failed to get story by slug ${slug}:`, error);
    return undefined;
  }
}

export function addStorySync(story: Omit<DbStory, 'id' | 'createdAt'>): DbStory {
  const db = initializeDatabase();
  const now = new Date().toISOString();
  const stmt = db.prepare('INSERT INTO stories (slug, title, author, summary, content, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
  const info = stmt.run(story.slug, story.title, story.author, story.summary, story.content, now);

  const newStory = getDbStoryByIdSync(info.lastInsertRowid as number);
  if (!newStory) {
    throw new Error('Failed to retrieve newly added story.');
  }
  return newStory;
}

function getDbStoryByIdSync(id: number): DbStory | undefined {
    const db = initializeDatabase();
    const stmt = db.prepare('SELECT * FROM stories WHERE id = ?');
    return stmt.get(id) as DbStory | undefined;
}

export function getCommentsSync(): Comment[] {
  const db = initializeDatabase();
  try {
    const stmt = db.prepare('SELECT * FROM comments ORDER BY createdAt DESC');
    const comments = stmt.all() as any[];
    // Ensure createdAt is a Date object for client-side use
    return comments.map(c => ({...c, createdAt: new Date(c.createdAt)}));
  } catch (error) {
    console.error("Failed to get comments:", error);
    return [];
  }
}

export function addCommentSync(comment: Omit<Comment, 'id' | 'createdAt'>): Comment {
  const db = initializeDatabase();
  const now = new Date().toISOString();
  const stmt = db.prepare('INSERT INTO comments (author, message, createdAt, isAppropriate, originalMessage) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(comment.author, comment.message, now, comment.isAppropriate, comment.originalMessage);
  
  const newComment = getCommentByIdSync(info.lastInsertRowid as number);
  if (!newComment) {
      throw new Error('Failed to retrieve newly added comment.');
  }
  return newComment;
}

function getCommentByIdSync(id: number): Comment | undefined {
    const db = initializeDatabase();
    const stmt = db.prepare('SELECT * FROM comments WHERE id = ?');
    const comment = stmt.get(id) as any;
    if (comment) {
      return {...comment, createdAt: new Date(comment.createdAt)};
    }
    return undefined;
}
