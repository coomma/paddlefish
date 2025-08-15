
'use server';

import { getDatabase, ref, set, get, push, serverTimestamp } from 'firebase/database';
import { initializeFirebase } from './firebase';

export interface Comment {
  id: string;
  author: string;
  message: string;
  createdAt: number; // Stored as timestamp
  isAppropriate: boolean;
  originalMessage?: string;
}

export interface DbStory {
    id: string; 
    slug: string;
    title: string;
    author: string;
    summary: string;
    content: string;
    createdAt: number; 
}


// --- Comment Functions ---

export async function getComments(): Promise<Comment[]> {
    const app = initializeFirebase();
    if (!app) return [];

    const db = getDatabase(app);
    const commentsRef = ref(db, 'comments');
    const snapshot = await get(commentsRef);

    if (snapshot.exists()) {
        const commentsData = snapshot.val();
        return Object.keys(commentsData)
            .map(key => ({
                id: key,
                ...commentsData[key]
            }))
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(c => ({...c, createdAt: new Date(c.createdAt)}));
    } else {
        // Comments are seeded along with stories, but we can return empty if no stories exist.
        // This is a safeguard.
        return [];
    }
}

export async function addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    const app = initializeFirebase();
    if (!app) throw new Error("Firebase not initialized. Cannot add comment.");
    
    const db = getDatabase(app);
    const commentsRef = ref(db, 'comments');
    const newCommentRef = push(commentsRef);
    
    const commentWithTimestamp = { ...comment, createdAt: serverTimestamp() };
    await set(newCommentRef, commentWithTimestamp);

    const snapshot = await get(newCommentRef);
    const savedComment = snapshot.val();
    
    return {
        ...savedComment,
        id: newCommentRef.key,
        createdAt: savedComment.createdAt,
    };
}


// --- Story Functions ---

async function seedDatabase() {
    const app = initializeFirebase();
    if (!app) return;
    const db = getDatabase(app);

    console.log('Seeding database with initial stories and comments...');
    
    const seedStories = {
      'the-last-sighting': {
        slug: 'the-last-sighting',
        title: 'The Last Sighting',
        author: 'River Historian',
        summary: 'A detailed account of the final confirmed encounter with a Chinese Paddlefish in January 2003.',
        content: `<p>On a cold January day in 2003, along the Nanxi River, a tributary of the mighty Yangtze, fishermen inadvertently captured a living legend. It was a female Chinese Paddlefish, measuring over 3 meters long. The moment was bittersweet; a confirmation the species still existed, but also a stark reminder of its rarity.</p><p>Scientists, alerted to the catch, rushed to the scene. They attached an ultrasonic tracker to the fish, hoping to finally understand its mysterious underwater life. With great care, she was released back into the murky waters on January 27th. The team tracked her signal for a few precious hours before their boat was damaged, forcing them to abandon the pursuit. The signal faded, and with it, the last living trace of the Chinese Paddlefish. She was never seen again.</p>`,
        createdAt: Date.now() - 200000 // Ensure a stable sort order
      },
      'the-dam-dilemma': {
        slug: 'the-dam-dilemma',
        title: 'The Dam Dilemma',
        author: 'Conservation Scientist',
        summary: 'An analysis of how dam construction on the Yangtze sealed the fate of the paddlefish.',
        content: `<p>The story of the Chinese Paddlefish is inextricably linked to the story of the Yangtze River's development. For millennia, the fish followed an ancient migratory path, traveling hundreds of kilometers upstream to spawn. The construction of the Gezhouba Dam in 1981 was the first major blow. It was built without a fish ladder, creating an impassable barrier.</p><p>The paddlefish population was instantly fragmented. The fish downstream could no longer reach their spawning grounds. While some spawning may have occurred below the dam, it was insufficient to sustain the population. The later construction of the even larger Three Gorges Dam further altered the river's hydrology and sealed the species' fate. The river that had been its cradle for millions of years became its tomb.</p>`,
        createdAt: Date.now() - 100000
      },
      'a-fishermans-tale': {
        slug: 'a-fishermans-tale',
        title: 'A Fisherman\'s Tale',
        author: 'Elder Fisherman',
        summary: 'A recollection from an old fisherman who remembers a time when the "King of Fish" was more common.',
        content: `<p>My father and his father before him fished the Yangtze. They spoke of the <em>bai xun</em>, the Chinese Paddlefish, with reverence. They called it the "King of Fish." In my youth, in the 1970s, seeing one was still possible, though it was always an event. They were immense, powerful creatures that commanded respect.</p><p>We never targeted them, but sometimes they would be caught in our nets. The meat was prized, but my father always said it was bad luck to catch one, that it meant the river was losing its spirit. By the time I was a man, they were like ghosts. A rumor of a sighting would ripple through the villages, but they were just stories.The river grew quieter, and the king was gone.</p>`,
        createdAt: Date.now()
      }
    };

    const seedComments = [
        { author: 'River Enthusiast', message: 'A tragic loss for the world. The Yangtze will never be the same. May we learn from this.', createdAt: Date.now() - 20000, isAppropriate: true, },
        { author: 'Jane D.', message: 'I remember reading about this majestic fish as a child. It\'s heartbreaking to know it\'s gone forever. A beautiful memorial.', createdAt: Date.now() - 10000, isAppropriate: true, },
    ];

    const commentsWithKeys: { [key: string]: any } = {};
    seedComments.forEach(comment => {
        const newKey = push(ref(db, 'comments')).key;
        if (newKey) {
            commentsWithKeys[newKey] = comment;
        }
    });

    await Promise.all([
        set(ref(db, 'stories'), seedStories),
        set(ref(db, 'comments'), commentsWithKeys)
    ]);

    return Object.values(seedStories);
}

export async function getDbStories(): Promise<DbStory[]> {
    const app = initializeFirebase();
    if (!app) return [];

    const db = getDatabase(app);
    const storiesRef = ref(db, 'stories');
    const snapshot = await get(storiesRef);

    if (snapshot.exists()) {
        const storiesData = snapshot.val();
        return Object.keys(storiesData)
            .map(key => ({ id: key, ...storiesData[key] }))
            .sort((a, b) => b.createdAt - a.createdAt);
    } else {
        // If no stories exist, seed the database and return the seeded stories.
        const seededStories = await seedDatabase();
        return seededStories.sort((a, b) => b.createdAt - a.createdAt) as DbStory[];
    }
}

export async function addStory(story: Omit<DbStory, 'id' | 'createdAt'>): Promise<DbStory> {
    const app = initializeFirebase();
    if (!app) throw new Error("Firebase not initialized. Cannot add story.");

    const db = getDatabase(app);
    const storyRef = ref(db, 'stories/' + story.slug);

    const storyWithTimestamp = { ...story, createdAt: serverTimestamp() };
    await set(storyRef, storyWithTimestamp);
    
    const snapshot = await get(storyRef);
    const savedStory = snapshot.val();

    return { ...savedStory, id: story.slug };
}

export async function getDbStoryBySlug(slug: string): Promise<DbStory | undefined> {
    const app = initializeFirebase();
    if (!app) return undefined;

    const db = getDatabase(app);
    const storyRef = ref(db, 'stories/' + slug);
    const snapshot = await get(storyRef);

    if (snapshot.exists()) {
        return { id: snapshot.key, ...snapshot.val() };
    }
    return undefined;
}
