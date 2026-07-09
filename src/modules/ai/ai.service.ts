import Article from "@modules/content/article.model";
import { translateAndSummarize } from "./openai.client";

export const processPendingArticles = async (limit = 10): Promise<number>=>{
    const articles = await Article.findAll({where:{status:'pending'}, limit});
    let processedCount = 0;

    for (const article of articles){
        const id  = article.get('id') as number;
        try{
            await article.update({status:'processing'});
            const result = await translateAndSummarize(
                article.get('title') as string,
                article.get('originalContent') as string
            );

            await article.update({
                titleFa: result.titleFa,
                translatedContent: result.translatedContent,
                summary: result.summary,
                status:'completed',
            });

            processedCount += 1;

        }catch(error){
            console.error(`❌ Failed to process article ${id}` , (error as Error).message);
            await article.update({status:'failed'})
        }
    }


    return processedCount
}