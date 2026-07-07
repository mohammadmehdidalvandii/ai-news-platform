import {Context} from 'telegraf';
import { OnboardingStep } from '@modules/user/user.model';
import { findOrCreateUser } from '@modules/user/user.services';

export const startHandler = async(ctx:Context):Promise<void> =>{
    const telegramUser = ctx.from;
    if(!telegramUser) return;

    const {user} = await findOrCreateUser({
        telegramId : String(telegramUser.id),
        username: telegramUser.username,
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
    });

    const step  = user.get('onboardingStep') as OnboardingStep;

    if(step === OnboardingStep.COMPLETED){
        await ctx.reply(`سلام مجدد ${telegramUser.first_name ?? ''} 👋\nخوشحالیم که برگشتی!`);
        return;
    }

    await user.update({onboardingStep:OnboardingStep.WAITING_EMAIL});

    await ctx.reply(
         `سلام ${telegramUser.first_name ?? ''} 👋\n` +
      'به ربات اخبار هوش مصنوعی خوش اومدی!\n\n' +
      '📧 برای تکمیل ثبت‌نام، لطفاً ایمیلت رو برام بفرست:'
    )
}