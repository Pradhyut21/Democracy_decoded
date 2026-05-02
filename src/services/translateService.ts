import { config } from '../config/env';

export const SUPPORTED_LANGUAGES = [
  { code: 'en',    name: 'English',    nativeName: 'English'    },
  { code: 'hi',    name: 'Hindi',      nativeName: 'हिन्दी'      },
  { code: 'bn',    name: 'Bengali',    nativeName: 'বাংলা'       },
  { code: 'te',    name: 'Telugu',     nativeName: 'తెలుగు'      },
  { code: 'ta',    name: 'Tamil',      nativeName: 'தமிழ்'       },
  { code: 'mr',    name: 'Marathi',    nativeName: 'मराठी'       },
  { code: 'kn',    name: 'Kannada',    nativeName: 'ಕನ್ನಡ'       },
  { code: 'gu',    name: 'Gujarati',   nativeName: 'ગુજરાતી'     },
];

const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

const translationCache = new Map();

function getCacheKey(text: string, targetLang: string) {
  return `${targetLang}:${text.substring(0, 50)}`;
}

/**
 * Translate text using Google Cloud Translation API
 */
export async function translateText(text: string, targetLang: string) {
  if (!text?.trim() || targetLang === 'en') return text;
  if (!config.translate.apiKey)             return text; 

  const cacheKey = getCacheKey(text, targetLang);
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const url = `${BASE_URL}?key=${config.translate.apiKey}`;

    const response = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        q:      text,
        target: targetLang,
        format: 'text',
      }),
    });

    if (!response.ok) return text;

    const data        = await response.json();
    const translated  = data.data.translations[0].translatedText;

    translationCache.set(cacheKey, translated);
    return translated;
  } catch (e) {
    return text;
  }
}
