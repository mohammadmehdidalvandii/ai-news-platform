import slugify from 'slugify';
import { Op } from 'sequelize';
import Article from './article.model';
import { fetchAllFeeds } from './rss.services';

const titleSimilarity = (a: string, b: string): number => {
  const normalize = (text: string): Set<string> =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, '')
        .split(/\s+/)
        .filter(Boolean)
    );

  const setA = normalize(a);
  const setB = normalize(b);
  const intersection = new Set([...setA].filter((word) => setB.has(word)));
  const union = new Set([...setA, ...setB]);

  return union.size === 0 ? 0 : intersection.size / union.size;
};

const SIMILARITY_THRESHOLD = 0.75;

const isDuplicateByTitle = async (title: string): Promise<boolean> => {
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

  const recentArticles = await Article.findAll({
    where: { createdAt: { [Op.gte]: threeDaysAgo } },
    attributes: ['title'],
  });

  return recentArticles.some(
    (article) => titleSimilarity(title, article.get('title') as string) >= SIMILARITY_THRESHOLD
  );
};

const generateUniqueSlug = async (title: string): Promise<string> => {
  const baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await Article.findOne({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
};

export const collectAndSaveArticles = async (): Promise<number> => {
  const items = await fetchAllFeeds();
  let savedCount = 0;

  for (const item of items) {
    const existsByUrl = await Article.findOne({ where: { sourceUrl: item.link } });
    if (existsByUrl) continue;

    if (await isDuplicateByTitle(item.title)) continue;

    const slug = await generateUniqueSlug(item.title);

    try {
      await Article.create({
        title: item.title,
        slug,
        source: item.source,
        sourceUrl: item.link,
        originalContent: item.content,
        publishedAt: item.publishedAt,
      });
      savedCount += 1;
    } catch (error) {
      console.error(`❌ Failed to save article "${item.title}":`, (error as Error).message);
    }
  }

  return savedCount;
};