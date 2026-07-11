import cron from 'node-cron';
import { config } from '@config/index';
import { collectAndSaveArticles } from '@modules/content/content.service';
import { processPendingArticles } from '@modules/ai/ai.service';
import { sendPendingArticles } from '@modules/notification/notification.services'; 


const runContentPipeline = async (): Promise<void> => {
  console.log('⏰ [Scheduler] شروع چرخه‌ی دریافت و پردازش اخبار...');

  try {
    const collected = await collectAndSaveArticles();
    console.log(`📰 ${collected} مقاله‌ی جدید ذخیره شد`);

    const processed = await processPendingArticles(20);
    console.log(`🤖 ${processed} مقاله پردازش شد`);
  } catch (error) {
    console.error('❌ خطا در چرخه‌ی دریافت/پردازش اخبار:', (error as Error).message);
  }
};

const runNotificationCycle = async (): Promise<void> => {
  console.log('⏰ [Scheduler] شروع ارسال اخبار به کاربران...');

  try {
    const sent = await sendPendingArticles(20);
    console.log(`📬 ${sent} مقاله ارسال شد`);
  } catch (error) {
    console.error('❌ خطا در ارسال اخبار:', (error as Error).message);
  }
};

export const startScheduler = (): void => {
  cron.schedule(config.scheduler.rssFetchCron, runContentPipeline);
  cron.schedule(config.scheduler.newsSendCron, runNotificationCycle);

  console.log(
    `🕐 Scheduler فعال شد (دریافت: "${config.scheduler.rssFetchCron}", ارسال: "${config.scheduler.newsSendCron}")`
  );
};