import {Request , Response} from 'express';
import Article from '@modules/content/article.model';

export const getArticleBySlug = async (req:Request , res:Response): Promise<void>=>{
    const {slug} = req.params;

    const article = await Article.findOne({
        where:{slug, status:'completed'},
    });

    if(!article){
        res.status(404).json({error:'مقاله پیدا نشد'});
        return
    };

    res.status(200).json({
        titleFa: article.get('titleFa'),
        slug: article.get('slug'),
        source: article.get('sourceUrl'),
        summary: article.get('summary'),
        translatedContent: article.get('translatedContent'),
        publishedAt: article.get('publishedAt')
    })
}