import { DataTypes, Model , Optional} from 'sequelize';
import sequelize from '../../lib/database';

interface UserAttributes {
    id: number;
    telegramId: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    isActive: boolean;
    isPremium: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

type UserCreationAttribute = Optional<UserAttributes , 'id'>;

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
            allowNull:false,
            validate:{
                isEmail:true,
            },
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