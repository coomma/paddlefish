// This file is an async wrapper around the synchronous db-server.ts file.
// This is necessary to avoid the "Server Actions must be async functions" error
// when using a synchronous database driver like better-sqlite3 with Next.js.
// All Server Components and Server Actions should import from this file, not db-server.ts.

import { 
    getCommentsSync, 
    getDbStoriesSync, 
    getDbStoryBySlugSync, 
    addStorySync, 
    addCommentSync, 
    type DbStory, 
    type Comment 
} from './db-server';

export * from './db-server';

export async function getDbStories(): Promise<DbStory[]> {
    return getDbStoriesSync();
}

export async function getDbStoryBySlug(slug: string): Promise<DbStory | undefined> {
    return getDbStoryBySlugSync(slug);
}

export async function addStory(story: Omit<DbStory, 'id' | 'createdAt'>): Promise<DbStory> {
    return addStorySync(story);
}

export async function getComments(): Promise<Comment[]> {
    return getCommentsSync();
}

export async function addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    return addCommentSync(comment);
}
