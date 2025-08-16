
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

export async function getAllStories(): Promise<Story[]> {
  const dbStories = await getDbStories();
  return dbStories.map(dbStoryToStory);
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  const dbStory = await getDbStoryBySlug(slug);
  if (dbStory) {
    return dbStoryToStory(dbStory);
  }
  return undefined;
}
