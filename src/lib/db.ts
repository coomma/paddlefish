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
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
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
    
    const storyCount = db.prepare('SELECT COUNT(*) as count FROM stories').get() as { count: number };
    if (storyCount.count === 0) {
        const seedStories = [
          {
            slug: 'the-last-sighting',
            title: 'The Last Sighting',
            author: 'River Historian',
            summary: 'A detailed account of the final confirmed encounter with a Chinese Paddlefish in January 2003.',
            content: `
              <p>On a cold January day in 2003, along the Nanxi River, a tributary of the mighty Yangtze, fishermen inadvertently captured a living legend. It was a female Chinese Paddlefish, measuring over 3 meters long. The moment was bittersweet; a confirmation the species still existed, but also a stark reminder of its rarity.</p>
              <p>Scientists, alerted to the catch, rushed to the scene. They attached an ultrasonic tracker to the fish, hoping to finally understand its mysterious underwater life. With great care, she was released back into the murky waters on January 27th. The team tracked her signal for a few precious hours before their boat was damaged, forcing them to abandon the pursuit. The signal faded, and with it, the last living trace of the Chinese Paddlefish. She was never seen again.</p>
            `
          },
          {
            slug: 'the-dam-dilemma',
            title: 'The Dam Dilemma',
            author: 'Conservation Scientist',
            summary: 'An analysis of how dam construction on the Yangtze sealed the fate of the paddlefish.',
            content: `
              <p>The story of the Chinese Paddlefish is inextricably linked to the story of the Yangtze River's development. For millennia, the fish followed an ancient migratory path, traveling hundreds of kilometers upstream to spawn. The construction of the Gezhouba Dam in 1981 was the first major blow. It was built without a fish ladder, creating an impassable barrier.</p>
              <p>The paddlefish population was instantly fragmented. The fish downstream could no longer reach their spawning grounds. While some spawning may have occurred below the dam, it was insufficient to sustain the population. The later construction of the even larger Three Gorges Dam further altered the river's hydrology and sealed the species' fate. The river that had been its cradle for millions of years became its tomb.</p>
            `
          },
          {
            slug: 'a-fishermans-tale',
            title: 'A Fisherman\'s Tale',
            author: 'Elder Fisherman',
            summary: 'A recollection from an old fisherman who remembers a time when the "King of Fish" was more common.',
            content: `
              <p>My father and his father before him fished the Yangtze. They spoke of the <em>bai xun</em>, the Chinese Paddlefish, with reverence. They called it the "King of Fish." In my youth, in the 1970s, seeing one was still possible, though it was always an event. They were immense, powerful creatures that commanded respect.</p>
              <p>We never targeted them, but sometimes they would be caught in our nets. The meat was prized, but my father always said it was bad luck to catch one, that it meant the river was losing its spirit. By the time I was a man, they were like ghosts. A rumor of a sighting would ripple through the villages, but they were just stories.The river grew quieter, and the king was gone.</p>
            `
          }
        ];
        const insertStory = db.prepare('INSERT INTO stories (slug, title, author, summary, content, createdAt) VALUES (?, ?, ?, ?, ?, ?)');
        db.transaction((stories) => {
            for (const story of stories) {
                insertStory.run(story.slug, story.title, story.author, story.summary, story.content, new Date().toISOString());
            }
        })(seedStories);
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
