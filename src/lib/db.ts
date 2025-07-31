'use server';

export interface Comment {
  id: number;
  author: string;
  message: string;
  createdAt: Date;
  isAppropriate: boolean;
  originalMessage?: string;
}

// In-memory store
const comments: Comment[] = [
  {
    id: 1,
    author: 'River Enthusiast',
    message: 'A tragic loss for the world. The Yangtze will never be the same. May we learn from this.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isAppropriate: true,
  },
  {
    id: 2,
    author: 'Jane D.',
    message: 'I remember reading about this majestic fish as a child. It\'s heartbreaking to know it\'s gone forever. A beautiful memorial.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isAppropriate: true,
  },
];

// This is not safe for concurrent use, but fine for this demo.
export const getComments = async (): Promise<Comment[]> => {
  return Promise.resolve(comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
};

export const addComment = async (comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
  const newComment: Comment = {
    ...comment,
    id: comments.length + 1,
    createdAt: new Date(),
  };
  comments.push(newComment);
  return Promise.resolve(newComment);
};
