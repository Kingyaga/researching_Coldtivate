# Knowledge Hub Setup Guide

## Prerequisites

Before starting local development for Knowledge Hub PWA, ensure you have:

- Node.js (version 20 or later)
- A code editor
- Git for version control

**IDE Setup**

For optimal development, configure your IDE for TypeScript and JSX type-checking.

* **Recommended IDEs:**
    * Visual Studio Code, Zed, Sublime Text (or any IDE with TypeScript/JSX support).
* **Essential Configuration:**
    * Ensure your IDE uses the project's `tsconfig.json` for type-checking, not default IDE settings.

## Installation

1. Clone the repository:
```sh
git clone https://gitlab.com/b1866/coldtivate/knowledge-hub-pwa.git
cd knowledge-hub-pwa
```

2. Install dependencies:
```sh
yarn install
```

## Development Server

To start the local development server:
```sh
yarn dev
```

This will start the Astro development server at `http://localhost:4321` with:

- Hot module replacement
- Real-time preview
- Development error messages

## Building for Production

To create a production build:

```sh
yarn build
```

This generates static files in the `dist` directory.

To preview the production build locally:

```sh
yarn preview
```

## PWA Development

The Knowledge Hub includes PWA functionality for offline access. Key features:

- Service Worker registration
- Offline caching strategies
- Web manifest configuration

To test PWA features:

1. Create a production build
2. Use a PWA-compatible browser
3. Test offline functionality by disconnecting from the network
