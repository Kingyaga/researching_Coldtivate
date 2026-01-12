import type { ValueOf } from "#/types";

export const APP_LOCALES = {
  ENGLISH: "en",
  HINDI: "hi",
  ORIYA: "or",
  GUJARATI: "gu",
  FRENCH: "fr",
  PORTUGUESE: "pt",
  YORUBA: "yo",
  HAUSA: "ha",
  IGBO: "ig",
  ARABIC: "ar",
} as const;

export type TranslationLocales = ValueOf<typeof APP_LOCALES>;

export const DEFAULT_LOCALE: TranslationLocales = APP_LOCALES.ENGLISH;

export const RTL_LOCALES = Object.freeze([APP_LOCALES.ARABIC] as const);
