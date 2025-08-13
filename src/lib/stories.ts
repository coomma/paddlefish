import { getDbStories, getDbStoryBySlug, DbStory } from "./db";

export type Story = {
  slug: string;
  title: string;
  author: string;
  summary: string;
  content: { __html: string; };
};

function dbStoryToStory(dbStory: DbStory): Story {
  return {
    slug: dbStory.slug,
    title: dbStory.title,
    author: dbStory.author,
    summary: dbStory.summary,
    content: { __html: dbStory.content }
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
