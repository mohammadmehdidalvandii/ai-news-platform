import { startBot } from '@modules/telegram';
import app from './app';
import {config} from './config/index';
import {connectDatabase} from './lib/database';
import { collectAndSaveArticles } from '@modules/content/content.service';


const start = async ():Promise<void>=>{
    await connectDatabase();

    const count = await collectAndSaveArticles();
console.log(`📰 ${count} مقاله‌ی جدید ذخیره شد`);

    app.listen(config.app.port , ()=>{
        console.log(`✅ Server is running on ${config.app.url}`);
    });

    await startBot();
};


start();