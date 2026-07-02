# 🤖 AI News Platform

> Intelligent platform for collecting, translating, and distributing tech & AI news via Telegram bot.

![Node.js](https://img.shields.io/badge/Node.js->=18.0.0-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.7.0-lightgrey)
![Express](https://img.shields.io/badge/Express-4.18.2-black)
![Phase](https://img.shields.io/badge/Phase-1%20MVP-orange)

---

## What is this?

AI News Platform automatically collects articles from trusted tech RSS sources, translates them into Persian using GPT-4o-mini, and delivers them to users via a Telegram bot. Users can also read the full translated article on the website.

---

## Features

- 📥 Auto-collect articles from RSS feeds
- 🤖 AI-powered Persian translation & summarization
- 📬 Automatic news delivery via Telegram
- 🌐 Read full articles on the website
- 👤 User registration with email collection

---

## Tech Stack

| | Technology |
|-|-----------|
| Language | TypeScript |
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Bot | Telegraf |
| Database | PostgreSQL + Sequelize |
| AI | OpenAI GPT-4o-mini |
| Scheduler | node-cron |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database
- Telegram bot token — get it from [@BotFather](https://t.me/BotFather)
- OpenAI API key — get it from [platform.openai.com](https://platform.openai.com)

### Installation

**1. Clone the repo**
```bash
git clone https://github.com/your-username/ai-news-platform.git
cd ai-news-platform
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env
```

Open `.env` and fill in your values:
```bash
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/ai_news_platform?schema=public"

TELEGRAM_BOT_TOKEN=your_token_here
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini

RSS_FETCH_CRON=0 */3 * * *
NEWS_SEND_CRON=0 8 * * *
```

**4. Set up the database**
```bash
npm run db:migrate
npm run db:generate
```

**5. Start the app**
```bash
# Development
npm run dev

# Production
npm run build && npm start
```

---

## Bot Commands

| Command | Description |
|---------|-------------|
| `/start` | Register and start receiving news |
| `/latest` | Get the latest articles |

---

## Website

| Route | Description |
|-------|-------------|
| `/article/:slug` | Read full translated article |

Example:
```
http://localhost:3000/article/openai-releases-new-coding-model
```

---

## Project Structure

```
src/
├── modules/
│   ├── user/          # Registration & user management
│   ├── content/       # RSS parsing & article storage
│   ├── ai/            # Translation & summarization
│   ├── telegram/      # Bot & message delivery
│   └── website/       # Article display routes
├── config/            # App configuration & RSS sources
├── scheduler/         # Cron jobs
├── lib/               # Shared utilities
└── middlewares/       # Express middlewares
```

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Compile TypeScript
npm start            # Start production server
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio
npm run lint         # Lint code
npm run format       # Format code
```

---

## Roadmap

- [x] Phase 1 — MVP (Telegram Bot + Website)
- [ ] Phase 2 — Personalization
- [ ] Phase 3 — Scalability (Redis + BullMQ)
- [ ] Phase 4 — Subscription & PDF
- [ ] Phase 5 — Admin Panel & Analytics
- [ ] Phase 6 — Public API
- [ ] Phase 7 — Mobile App
- [ ] Phase 8 — Recommendation Engine
- [ ] Phase 9 — Microservices

---

## License

MIT
