import OpenAI from "openai";
import { config } from "@config/index";

const openai = new OpenAI({
    apiKey:config.openai.apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
});


export interface TranslationResult{
    title: string;
    translatedContent: string;
    summary: string;
};

const SYSTEM_PROMPT = `تو یه مترجم و خلاصه‌نویس متخصص حوزه‌ی فناوری و هوش مصنوعی هستی.
متن انگلیسی داده‌شده رو به فارسی روان و طبیعی ترجمه کن (نه ترجمه‌ی کلمه‌به‌کلمه)، و یه خلاصه‌ی کوتاه (حداکثر ۳ جمله) هم بنویس.
خروجی رو فقط و فقط به‌فرمت JSON با دقیقاً این ساختار برگردون، بدون هیچ متن اضافه:
{"titleFa": "عنوان فارسی", "translatedContent": "متن کامل ترجمه‌شده به فرمت Markdown", "summary": "خلاصه‌ی کوتاه فارسی"}`;


export const translateAndSummarize = async (
  title: string,
  content: string
): Promise<TranslationResult> => {
  const response = await openai.chat.completions.create({
    model: config.openai.model,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `عنوان: ${title}\n\nمتن: ${content}` },
    ],
  });

  const raw = response.choices[0]?.message?.content;
  if (!raw) {
    throw new Error('پاسخ خالی از OpenAI دریافت شد');
  }

  return JSON.parse(raw) as TranslationResult;
};