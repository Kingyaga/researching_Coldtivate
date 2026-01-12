import {
  APP_LOCALES,
  DEFAULT_LOCALE,
  type TranslationLocales,
  RTL_LOCALES,
} from "./constants";
import resourceMap, { type TranslationPaths } from "./index";
import type { Translations } from "./resources/en";
import { get } from "#/shared";

export function buildLocaleStaticParams() {
  return Object.values(APP_LOCALES).map((lang) => ({ params: { lang } }));
}

export function getLocaleFromParams(
  params: Record<string, string | undefined>
) {
  if (typeof params !== "object") return DEFAULT_LOCALE;
  const locale = get<object, string>(params, "lang");
  if (locale && locale in resourceMap) return locale as TranslationLocales;
  return DEFAULT_LOCALE;
}

export function useTranslations(locale: TranslationLocales = DEFAULT_LOCALE) {
  return function t(translationPath: TranslationPaths) {
    const translations: Translations = resourceMap[locale];
    return get<Translations, string>(translations, translationPath) || "";
  };
}

export function usePathWithLocale(locale: TranslationLocales = DEFAULT_LOCALE) {
  return function buildPath(...paths: Array<string | undefined>) {
    const pathString = paths
      .filter((path): path is string => path !== undefined)
      .join("/")
      .replace(/^\/+|\/+$/g, "");
    return `/${locale}/${pathString}`;
  };
}

export function useRtl(locale: TranslationLocales = DEFAULT_LOCALE) {
  const isRtl = RTL_LOCALES.includes(locale as (typeof RTL_LOCALES)[number]);
  const htmlDirection = isRtl ? "rtl" : "ltr";
  return { isRtl, htmlDirection };
}
