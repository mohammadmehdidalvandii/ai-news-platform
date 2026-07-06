import { DataTypes, Model , Optional} from 'sequelize';
import sequelize from '../../lib/database';

export enum OnboardingStep{
    STARTED = 'started',
    WAITING_EMAIL = 'waiting_email',
    COMPLETED ='completed',
}

export enum InterestCategory{
    AI = 'ai',
    PROGRAMMING = 'programming',
    SECURITY = 'security',
    MOBILE = 'mobile',
}

interface UserAttributes {
    id: number;
    telegramId: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    interests:InterestCategory[];
    onboardingStep:OnboardingStep;
    isActive: boolean;
    isPremium: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

type UserCreationAttribute = Optional<UserAttributes , 'id' | 'email' | 'interests' | 'onboardingStep'>;

const User = sequelize.define<Model<UserAttributes , UserCreationAttribute>>(
    'User',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        telegramId:{
            type: DataTypes.BIGINT,
            unique:true,
            allowNull:false
        },
        username:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:true,
            validate:{
                isEmail:true,
            },
        },
        interests:{
            type: DataTypes.JSON,
            allowNull:false,
            defaultValue:[],
        },
        onboardingStep:{
            type: DataTypes.ENUM(...Object.values(OnboardingStep)),
            allowNull:false,
            defaultValue:OnboardingStep.STARTED
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            defaultValue:true,
            allowNull:false
        },
        isPremium:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false
        },
    },
    {
        tableName:"Users",
        timestamps:true
    }
);

export default User;