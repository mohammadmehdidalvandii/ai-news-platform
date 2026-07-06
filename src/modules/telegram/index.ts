import {bot} from './bot';

export const startBot = async ():Promise<void> =>{
    bot.start((ctx) => ctx.reply('ربات با موفقیت وصل شد ✅'));

    await bot.launch();
    console.log("Telegram bot started");

    process.once('SIGINT' , ()=> bot.stop('SIGINT'));
    process.once('SIGTERM' , ()=> bot.stop('SIGTERM'))
}


export {bot};