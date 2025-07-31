export type Story = {
  slug: string;
  title: string;
  author: string;
  summary: string;
  content: string;
};

export const stories: Story[] = [
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
      <p>We never targeted them, but sometimes they would be caught in our nets. The meat was prized, but my father always said it was bad luck to catch one, that it meant the river was losing its spirit. By the time I was a man, they were like ghosts. A rumor of a sighting would ripple through the villages, but they were just stories. The river grew quieter, and the king was gone.</p>
    `
  }
];

export const getStoryBySlug = (slug: string): Story | undefined => {
  return stories.find((s) => s.slug === slug);
};
