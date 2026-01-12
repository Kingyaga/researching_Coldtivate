# Knowledge Hub Structure Overview

This documentation provides an overview of the folder structure and key functionalities of the **Knowledge Hub PWA**, a static website built with [Astro](https://astro.build/){:target="_blank"}. The site supports multilingual content, spatial variations, interactivity through client islands, and progressive web app (PWA) capabilities.

> Note: Visit the Knowledge Hub at [coldtivate.org](https://knowledge-hub.coldtivate.org/){:target="_blank"} to access the platform directly, or follow the instructions below to create your own customized version.

## Folder Structure

```
knowledge-hub-pwa/
├── public/
├── src/
│   ├── assets/
│   │   ├── comics/
│   │   │   ├── en/
│   │   │   ├── fr/
│   │   │   ├── gu/
│   │   │   └── ...
│   │   └── crops/
│   ├── components/
│   ├── i18n/
│   ├── layouts/
│   ├── pages/
│   ├── constants.ts
│   └── shared.ts
├── astro.config.mjs
└── tailwind.config.mjs
```

### `public/`
This directory contains static assets such as images, icons, and other publicly accessible files that do not require processing by Astro.

### `src/`
The main source folder containing assets, components, layouts, and pages for the Astro project.

#### `assets/`

- **`comics/`**: Stores comic-related images, categorized by language.
- **`crops/`**: Stores crop-related images.

#### `components/`
Reusable UI components for building the site. Components may include:

- Navigation List Items

#### `i18n/`
Handles internationalization (i18n) by storing language-specific translations for pages and data (e.g., crop names, page titles, and descriptions).

#### `layouts/`
Defines reusable page structures, such as base templates for different sections of the site.

#### `pages/`
This folder contains the actual website pages. Each page dynamically generates content based on language and spatial attributes:

- **Language-based content**: Titles, paragraphs, and other data adapt based on the `lang` URL parameter (e.g., `en`, `fr`).
- **Spatial variations**: Some pages change based on country-level attributes (e.g., `/en/.../NG` vs. `/en/.../IN`).

#### `constants.ts`
Defines static constants, including a list of crops and their data, a multilingual mapping of crop names, and the base link to the source of truth for crop images.

#### `shared.ts`
Contains reusable utilities and functions shared across different pages and components.

### Configuration Files

- **`astro.config.mjs`**: The main Astro configuration file.
- **`tailwind.config.mjs`**: Tailwind CSS configuration for styling.

---

## Multilingual & Regional Content
The website dynamically generates content based on URL parameters:

- `/[lang]` (e.g., `/en`, `/fr`, `/pt`)
- `/[lang]/multi-commodity-storage/[country]` (e.g., `/en/.../NG`, `/en/.../IN`)

### Example Page Variations:
| Language | Region   | Page Variation               |
|----------|---------|-----------------------------|
| English  | Global  | Standard English Content   |
| English  | Nigeria | Nigeria-specific Content   |
| English  | India   | India-specific Content     |

---

## Client Islands for Interactivity
Astro's **client islands** allow interactive components to be rendered using JavaScript frameworks like React. A notable example is the **Farmer's Journey Slider**, which uses React to provide a dynamic, interactive experience.

### Example: Integrating a React Component
```tsx
---
import Slider from "./_components/Slider"
---

<Slider client:load />
```

This enables client-side rendering while keeping the rest of the page static for performance benefits.

---

## Progressive Web App (PWA) Features
The site includes **PWA functionality** to enhance offline access:

- **Content Caching**: HTML pages and images are cached for offline viewing.
- **Service Workers**: Ensures pages remain accessible when the user is offline.
- **Faster Load Times**: Optimized asset caching improves performance.

---

## Summary
This Astro-based static website effectively combines:

- **Multilingual & regional content generation**
- **Client islands for dynamic interactivity**
- **PWA features for offline support**

By leveraging these capabilities, the **Knowledge Hub PWA** delivers a fast, localized, and engaging user experience.

---

For further development details, refer to the [Astro documentation](https://docs.astro.build/){:target="_blank"}.
