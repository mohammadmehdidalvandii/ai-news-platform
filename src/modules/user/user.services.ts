import User , {OnboardingStep} from './user.model';

interface TelegramUserInput {
    telegramId: string;
    username?: string;
    firstName?: string;
    lastName?: string;
};

export const findOrCreateUser = async (input:TelegramUserInput): Promise<{user: InstanceType<typeof User>; isNew: boolean }>=>{
    const [user , isNew] = await User.findOrCreate({
        where:{telegramId: input.telegramId},
        defaults:{
            telegramId: input.telegramId,
            username: input.username,
            firstName: input.firstName,
            lastName: input.lastName,
            isActive:true,
            isPremium:false
        },
    });

    return {user , isNew}
};

export const findUserByTelegramId = async (
    telegramId:string
): Promise<InstanceType<typeof User> | null>=>{
    return User.findOne({where:{telegramId}})
};


export const setUserEmail = async (telegramId:string , email:string): Promise<void>=>{
    await User.update(
        {email, onboardingStep: OnboardingStep.COMPLETED},
        {where:{telegramId}}
    );
};