import {DataTypes , Model , Optional} from 'sequelize';
import sequelize from '../../lib/database';

interface ArticleAttributes {
    id: number;
    title: string;
    titleFa: string;
    slug: string;
    source: string;
    sourceUrl: string;
    summary: string | null;
    translatedContent: string | null;
    originalContent: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    isSent: boolean;
    publishedAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

type ArticleCreationAttributes = Optional<ArticleAttributes , 'id' | 'titleFa' | 'summary' | 'translatedContent' | 'status' | 'isSent'>;

const Article = sequelize.define<Model<ArticleAttributes , ArticleCreationAttributes>>(
    'Article',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        titleFa:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        slug:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
        },
        source:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        sourceUrl:{
            type: DataTypes.STRING,
            unique:true,
            allowNull:false,
        },
        summary:{
            type:DataTypes.TEXT,
            allowNull:true,
        },
        translatedContent:{
            type:DataTypes.TEXT,
            allowNull:true,
        },
        originalContent:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        status:{
            type:DataTypes.ENUM('pending', 'processing' , 'completed' , 'failed'),
            defaultValue:'pending',
            allowNull:false,
        },
        isSent:{
            type:DataTypes.BOOLEAN,
            defaultValue:false,
            allowNull:false,
        },
        publishedAt:{
            type:DataTypes.DATE,
            allowNull:false,
        },
    },
    {
        tableName:'Article',
        timestamps:true,
        underscored:true,
        indexes:[
            {fields:['status']},
            {fields:['is_sent']},
        ],
    }
);

export default Article;