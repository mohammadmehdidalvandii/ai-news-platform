import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export const extractFullContent = async (url: string): Promise<string | null> => {
  try {
    const response = await axios.get<string>(url, {
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AINewsBot/1.0)' },
    });

    const dom = new JSDOM(response.data, { url });
    const reader = new Readability(dom.window.document);
    const parsed = reader.parse();

    const text = parsed?.textContent?.trim();

    if (!text || text.length < 200) {
      return null;
    }

    return text;
  } catch (error) {
    console.error(`❌ Failed to extract full content from ${url}:`, (error as Error).message);
    return null;
  }
};