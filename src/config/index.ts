import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, required: boolean = true): string => {
  const value = process.env[key];

  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? '';
};
export const config = {
  app: {
    env: getEnv('NODE_ENV'),
    port: parseInt(getEnv('PORT'), 10),
    url: getEnv('APP_URL'),
  },

  database: {
    url: getEnv('DATABASE_URL'),
  },
  telegram: {
    token: getEnv('TELEGRAM_BOT_TOKEN'),
  },

  openai: {
    // کلید API
    apiKey: getEnv('OPENAI_API_KEY'),
    model: getEnv('OPENAI_MODEL'),
  },

  scheduler: {
    rssFetchCron: getEnv('RSS_FETCH_CRON'),
    newsSendCron: getEnv('NEWS_SEND_CRON'),
  },
} as const;

export type Config = typeof config;