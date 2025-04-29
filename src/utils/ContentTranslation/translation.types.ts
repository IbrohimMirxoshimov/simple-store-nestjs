export const TranslationLocalesMap = new Map([
  ['ru', 'ru'],
  ['en', 'en'],
]);

export const TranslationLocales = Array.from(TranslationLocalesMap.keys());

export type TranslationsData = {
  ru?: string;
  en?: string;
};
