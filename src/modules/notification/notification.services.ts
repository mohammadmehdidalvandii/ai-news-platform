import { Model } from 'sequelize';
import { bot } from '@modules/telegram/bot';
import User, { OnboardingStep } from '@modules/user/user.model';
import Article from '@modules/content/article.model';

const DELAY_MS = 50;

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const buildMessage = (article: Model): string => {
  const title = escapeHtml(article.get('titleFa') as string);
  const summary = escapeHtml(article.get('summary') as string);
  const sourceUrl = article.get('sourceUrl') as string;

  return `<b>${title}</b>\n\n${summary}\n\n🔗 <a href="${sourceUrl}">مطالعه‌ی منبع اصلی</a>`;
};

const sendArticleToUsers = async (article: Model): Promise<void> => {
  const users = await User.findAll({ where: { onboardingStep: OnboardingStep.COMPLETED } });
  const message = buildMessage(article);

  for (const user of users) {
    const telegramId = user.get('telegramId') as string;

    try {
      await bot.telegram.sendMessage(telegramId, message, { parse_mode: 'HTML' });
    } catch (error) {
      console.error(`❌ Failed to send article to user ${telegramId}:`, (error as Error).message);
    }

    await sleep(DELAY_MS);
  }
};

export const sendPendingArticles = async (limit = 10): Promise<number> => {
  const articles = await Article.findAll({
    where: { status: 'completed', isSent: false },
    limit,
  });

  for (const article of articles) {
    await sendArticleToUsers(article);
    await article.update({ isSent: true });
  }

  return articles.length;
};