import type { GetImageResult, UnresolvedImageTransform } from "astro";
import { getImage } from "astro:assets";
import pluralize from "pluralize";

import type { TranslationLocales } from "#i18n/constants";

import { CROP_LIST, type CropListDatum } from "./constants";

export function get<T, R>(
  object: T,
  path: string | Array<string | number>,
  defaultValue?: R
): R | undefined {
  if (!object) return defaultValue;

  const pathArray = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)]/g, ".$1").split(".");

  let result: any = object;

  for (const key of pathArray) {
    if (result == null || !(key in result)) {
      return defaultValue;
    }
    result = result[key as keyof typeof result];
  }

  return result === undefined ? defaultValue : result;
}

export function buildPageTitle(value?: string) {
  return `BASE - Coldtivate${value ? ` | ${value}` : ""}`;
}

export function imageLoader(target: "comics" | "crops") {
  let images: Record<string, () => Promise<{ default: ImageMetadata }>>;

  switch (target) {
    case "crops":
      images = import.meta.glob<{ default: ImageMetadata }>(
        "src/assets/crops/*.{png,jpg,jpeg,gif,webp,avif}"
      );
      break;
    case "comics":
      images = import.meta.glob<{ default: ImageMetadata }>(
        "src/assets/comics/**/*.{png,jpg,jpeg,gif,webp,avif}"
      );
      break;
    default:
      throw new Error(`Invalid target: ${target}`);
  }

  if (!Object.keys(images).length) {
    throw new Error(`No images found for target: ${target}`);
  }

  const imageOptions = {
    format: "avif",
    quality: "mid",
  } satisfies Partial<UnresolvedImageTransform>;

  return {
    all: async (key: string): Promise<Array<GetImageResult>> => {
      if (!key || typeof key !== "string") {
        throw new Error("Invalid key provided to all()");
      }

      const matchingImages = Object.entries(images).filter(([path]) =>
        path.includes(`/${key}/`)
      );
      if (!matchingImages.length) return [];

      try {
        const results = await Promise.all(
          matchingImages.map(async ([_, loader]) => {
            const { default: src } = await loader();
            return await getImage({ src, ...imageOptions });
          })
        );

        return results.toSorted((a, b) => {
          const nameA = a.src.split("/").pop() || "";
          const nameB = b.src.split("/").pop() || "";

          const slideRegexA = nameA.match(/^Slide(\d+)\./i);
          const slideRegexB = nameB.match(/^Slide(\d+)\./i);
          if (slideRegexA && slideRegexB) {
            return Number(slideRegexA[1]) - Number(slideRegexB[1]);
          }

          const sceneRegexA = nameA.match(/Comic-scene-by-scene_\w+-(\d+)\./i);
          const sceneRegexB = nameB.match(/Comic-scene-by-scene_\w+-(\d+)\./i);
          if (sceneRegexA && sceneRegexB) {
            return Number(sceneRegexA[1]) - Number(sceneRegexB[1]);
          }

          const numRegexA = nameA.match(/(\d+)\.[^.]+$/);
          const numRegexB = nameB.match(/(\d+)\.[^.]+$/);
          if (numRegexA && numRegexB) {
            return Number(numRegexA[1]) - Number(numRegexB[1]);
          }

          return nameA.localeCompare(nameB);
        });
      } catch (error) {
        console.error(`Error loading images for key ${key}:`, error);
        throw new Error(`Failed to load images for key: ${key}`);
      }
    },
    get: async (name: string): Promise<GetImageResult | undefined> => {
      if (!name || typeof name !== "string") {
        throw new Error("Invalid name provided to get()");
      }

      try {
        const imagePath = Object.keys(images).find((path) =>
          path.toLowerCase().endsWith(`/${name.toLowerCase()}`)
        );
        if (!imagePath) return undefined;

        const { default: src } = await images[imagePath]();
        return await getImage({ src, ...imageOptions });
      } catch (error) {
        console.error(`Error loading image ${name}:`, error);
        throw new Error(`Failed to load image: ${name}`);
      }
    },
  };
}

export function cropListTranslationUtils() {
  const _normalize = (str: string) => str.trim().toLowerCase();

  return {
    translationMap: new Map(
      CROP_LIST.map((item) => [_normalize(item.commodityName), item])
    ),
    translate: (
      map: Map<string, CropListDatum>,
      opts: { name: string; country?: string; locale: TranslationLocales }
    ): string => {
      const baseName = _normalize(opts.name);

      const nameCandidates = new Set([
        baseName,
        _normalize(pluralize.singular(baseName)),
        _normalize(pluralize.plural(baseName)),
      ]);

      let translationEntry: CropListDatum | undefined = undefined;
      for (const name of nameCandidates) {
        const entry = map.get(name);
        if (entry) {
          translationEntry = entry;
          break;
        }
      }

      if (!translationEntry) return opts.name;

      if (opts.locale === "en") {
        const countryKey =
          (opts.country as keyof CropListDatum["en"]) || "global";
        return (
          translationEntry.en[countryKey] ||
          translationEntry.en.global ||
          opts.name
        );
      }

      return translationEntry[opts.locale] || opts.name;
    },
  };
}
