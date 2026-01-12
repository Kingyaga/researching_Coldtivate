import type { RecursiveKeyOf } from "#/types";

import { APP_LOCALES, type TranslationLocales } from "./constants";
import englishTranslations, { type Translations } from "./resources/en";
import frenchTranslations from "./resources/fr";
import hindiTranslations from "./resources/hi";
import oriyaTranslations from "./resources/or";
import gujaratiTranslations from "./resources/gu";
import hausaTranslations from "./resources/ha";
import igboTranslations from "./resources/ig";
import yorubaTranslations from "./resources/yo";
import portugueseTranslations from "./resources/pt";
import arabicTranslations from "./resources/ar";

export type TranslationPaths = RecursiveKeyOf<Translations>;

export default {
  [APP_LOCALES.ENGLISH]: englishTranslations,
  [APP_LOCALES.FRENCH]: frenchTranslations,
  [APP_LOCALES.HINDI]: hindiTranslations,
  [APP_LOCALES.ORIYA]: oriyaTranslations,
  [APP_LOCALES.GUJARATI]: gujaratiTranslations,
  [APP_LOCALES.HAUSA]: hausaTranslations,
  [APP_LOCALES.IGBO]: igboTranslations,
  [APP_LOCALES.YORUBA]: yorubaTranslations,
  [APP_LOCALES.PORTUGUESE]: portugueseTranslations,
  [APP_LOCALES.ARABIC]: arabicTranslations,
} satisfies Record<TranslationLocales, Translations>;
