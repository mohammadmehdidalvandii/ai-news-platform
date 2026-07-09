import Parser from 'rss-parser';
import { RSS_SOURCES } from '@config/rssSources';

const parser = new Parser();

export interface FetchedItem {
    title: string;
    link: string;
    content: string;
    publishedAt: Date;
    source: string;
};

const fetchFeed = async (source:{name:string ; url:string}):Promise<FetchedItem[]>=>{
    try{
        const feed = await parser.parseURL(source.url);

        return feed.items
        .filter((item)=> item.title && item.link)
        .map((item)=>({
            title: item.title as string,
            link: item.link as string,
            content: item.contentSnippet ?? item.content ?? '',
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            source: source.name,
        }));;
    }catch(error){
        console.error(`❌ Failed to fetch RSS from ${source.name}`, (error as Error).message);
        return [];
    }
}

export const fetchAllFeeds  = async ():Promise<FetchedItem[]>=>{
    const results  = await Promise.all(RSS_SOURCES.map(fetchFeed));
    return results.flat();
}