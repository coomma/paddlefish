
import { getDbStories, getDbStoryBySlug, DbStory } from "./db";

export type Story = {
  id: number;
  slug: string;
  title: string;
  author: string;
  summary: string;
  content: { __html: string; };
  createdAt: Date;
};

function dbStoryToStory(dbStory: DbStory): Story {
  return {
    id: dbStory.id,
    slug: dbStory.slug,
    title: dbStory.title,
    author: dbStory.author,
    summary: dbStory.summary,
    content: { __html: dbStory.content },
    createdAt: new Date(dbStory.createdAt),
  };
}

export function getAllStories(): Story[] {
  const dbStories = getDbStories();
  return dbStories.map(dbStoryToStory);
}

export function getStoryBySlug(slug: string): Story | undefined {
  const dbStory = getDbStoryBySlug(slug);
  if (dbStory) {
    return dbStoryToStory(dbStory);
  }
  return undefined;
}
