export interface RssSource{
    name:string;
    url:string;
};

export const RSS_SOURCES: RssSource[] = [
  { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { name: 'MIT Technology Review', url: 'https://www.technologyreview.com/feed/' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com/rss' },
  { name: 'Medium - AI', url: 'https://medium.com/feed/tag/artificial-intelligence' },
  { name: 'Medium - Programming', url: 'https://medium.com/feed/tag/programming' },
  { name: 'DEV Community - AI', url: 'https://dev.to/feed/tag/ai' },
  { name: 'DEV Community - Programming', url: 'https://dev.to/feed/tag/programming' },
  { name: 'Towards Data Science', url: 'https://towardsdatascience.com/feed' },
  { name: 'MarkTechPost', url: 'https://www.marktechpost.com/feed' },
];