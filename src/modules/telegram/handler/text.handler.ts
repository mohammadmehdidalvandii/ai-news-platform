import {Context} from 'telegraf';
import {Message} from 'telegraf/types';
import { OnboardingStep } from '@modules/user/user.model';
import { findUserByTelegramId , setUserEmail } from '@modules/user/user.services';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const textHandler = async (ctx:Context): Promise<void>=>{
    const telegramUser = ctx.from;
    const message = ctx.message as Message.TextMessage | undefined;
    if(!telegramUser || !message?.text) return;

    const user = await findUserByTelegramId(String(telegramUser.id));
    if(!user) return;

    const step = user.get('onboardingStep') as OnboardingStep;
    if(step !== OnboardingStep.WAITING_EMAIL) return;

    const email = message.text.trim();
    if(!EMAIL_REGEX.test(email)){
        await ctx.reply('❌ فرمت ایمیل درست نیست. لطفاً یه ایمیل معتبر بفرست (مثلاً example@mail.com):')
        return;
    }

    await setUserEmail(String(telegramUser.id), email);
    await ctx.reply('✅ ثبت‌نام کامل شد! از این به بعد اخبار رو برات ارسال می‌کنیم.')
}

