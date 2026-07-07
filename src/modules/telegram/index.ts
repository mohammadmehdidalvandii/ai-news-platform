import {bot} from './bot';
import { startHandler } from './handler/start.handler';
import { textHandler } from './handler/text.handler';

export const startBot = async ():Promise<void> =>{
    bot.start(startHandler);
    bot.on('text', textHandler);

    await bot.launch();
    console.log("Telegram bot started");

    process.once('SIGINT' , ()=> bot.stop('SIGINT'));
    process.once('SIGTERM' , ()=> bot.stop('SIGTERM'))
}


export {bot};