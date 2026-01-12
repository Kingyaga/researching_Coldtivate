# Mobile App Setup Guide

This documentation provides a structured approach to setting up a local development environment for our React Native application. It is designed to ensure a smooth onboarding process for new developers and provide a reference for maintaining a stable setup. By following this guide, you will establish a robust environment that supports both iOS and Android development.

## Prerequisites

Before proceeding with the installation, ensure that your system meets the following requirements. These dependencies are necessary to compile and run the application effectively:

**Essential Software:**

* **Node.js:** Version 18 or later. [Download from nodejs.org](https://nodejs.org/){:target="_blank"}
* **Yarn:** Version 1.22.22 (recommended). [Download from yarnpkg.com](https://yarnpkg.com/getting-started/install){:target="_blank"}
* **React Native CLI:** Follow the official setup guide. [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment){:target="_blank"}

**Platform-Specific Requirements:**

* **Android Development:**
    * **Android Studio:** [Download from developer.android.com](https://developer.android.com/studio){:target="_blank"}
    * **OpenJDK:** Java 17 (LTS). [Download Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk#zulu){:target="_blank"} (Recommended)
* **iOS Development (macOS only):**
    * **Xcode:** [Download from the Mac App Store](https://developer.apple.com/xcode/){:target="_blank"}
    * **CocoaPods:** Version 1.16.2. Installation instructions: [CocoaPods Getting Started](https://guides.cocoapods.org/using/getting-started.html){:target="_blank"}

**IDE Setup**

For React Native development with TypeScript, a suitable IDE is essential for a productive development experience. The following recommendations focus on leveraging TypeScript's type-checking capabilities and integrating with the project's existing tooling.

* **IDE Selection:**
    * Any IDE that supports TypeScript plugins or extensions is acceptable. Examples include Visual Studio Code, Zed, and Sublime Text.
    * The IDE should be configured to recognize and utilize the project's `tsconfig.json` file for TypeScript type checking. This ensures consistency with the project's type definitions and compiler options, rather than relying on the IDE's default settings.
* **Project Tooling Integration:**
    * The project includes pre-configured tools for code quality and consistency.
    * **TypeScript Compiler (tsc):** The `package.json` file contains scripts that utilize the TypeScript compiler (`tsc`) to check for type errors. Developers can use these scripts to verify type correctness independently of the IDE's built-in type checking.
    * **Linting and Formatting:** The project is configured with linting and formatting tools. While specific tools like ESLint and Prettier are used, they are integrated into the project's workflow. Developers can utilize `package.json` scripts to run these tools and address any identified issues.
* **Commit Workflow:**
    * **Husky and lint-staged:** The project uses Husky and lint-staged to enforce code quality and consistency during the commit process. This setup ensures that linting and formatting checks are performed on staged files before each commit, preventing the introduction of code quality issues into the repository.

## Installation

Once prerequisites are met, follow these steps to set up your environment:

1. Clone the repository:
```sh
git clone https://gitlab.com/b1866/coldtivate/mobile-app-react-native.git
cd mobile-app-react-native
```

2. Install project dependencies
```sh
yarn install
```

3. For iOS development (Mac only), install CocoaPods dependencies:
```sh
bundle install
cd ios
pod install
```

4. For Android development, clean the Gradle build:
```sh
cd android
./gradlew clean
```

## Environment Variables

This document outlines the required environment variables for the application.

#### List of Variables

| Variable Name             | Description                                  |
|---------------------------|----------------------------------------------|
| `ENVIRONMENT`             | Specifies the current environment (e.g., `development`, `production`, `staging`). |
| `DEEP_LINK_DOMAIN`        | The domain used for generating deep links.     |
| `BASE_API_URL`            | The base URL of the primary API.             |
| `AIR_PROD_BASE_URL`       | The base URL for the AIR production environment. |
| `IMPACT_BACKUP_BASE_URL`  | The base URL for the impact backup service.    |
| `FARMER_IMPACT_BASE_URL`  | The base URL for the farmer impact service.   |
| `KNOWLEDGE_HUB_URL`       | The URL of the knowledge hub.                 |
| `YOUR_VCCA_PDF_LINK`      | The link to the VCCA PDF document.         |
| `MAPBOX_ACCESS_TOKEN`     | The access token for Mapbox services.       |
| `SENTRY_DSN`              | The Data Source Name for Sentry error tracking. |
| `RECAPTCHA_ENABLED`       | Enable or disable reCAPTCHA verification.    |
| `RECAPTCHA_SITE_KEY`      | The site key for reCAPTCHA integration.      |
| `RECAPTCHA_BASE_URL`      | The base URL for reCAPTCHA verification.     |

**Note:** When debugging a specific service, you may need to modify the corresponding URL variable based on your local environment. For example, to debug the farmer impact service, adjust the `FARMER_IMPACT_BASE_URL` to point to your local development server.

## Running the Development Environment

After installing dependencies, initialize the development environment:

1. Initialize the Metro bundler (required):
```sh
yarn start
```
To prevent cache-related issues, you can start it with a cache reset:
```sh
yarn start --reset-cache
```

2. Launch the application to your designated platform:
For iOS simulator:
```sh
yarn ios
```
For Android (emulator or physical device):
```sh
yarn android
```
To terminate the Metro bundler process, use:
```sh
watchman watch-del-all
watchman shutdown-server
```

## Platform-Specific Setup

### Android Configuration

Android development requires a debug keystore file:

1. Obtain the debug keystore file from [this link](https://github.com/react-native-community/react-native-template-typescript/blob/main/template/android/app/debug.keystore){:target="_blank"}
2. Move the file to the `/android/app/` directory

### Mapbox Configuration

The application integrates Mapbox for mapping and geospatial functionalities. Proper authentication is required to enable map-related features.

#### Required Mapbox Tokens

Two authentication tokens are needed:

- Public Key (prefix: `pk.ey`) - for API access
- Secret Key (prefix: `sk.ey`) - required for downloading dependencies

#### Android Mapbox Setup

1. Open or create the `gradle.properties` file:
```sh
cd ~/.gradle
touch gradle.properties
```

2. Add the following token:
```
MAPBOX_DOWNLOADS_TOKEN=sk.ey...
```

#### iOS Mapbox Setup

1. Configure the `.netrc` file for authentication:
```sh
cd ~
touch .netrc
```

2. Add your credentials:
```
machine api.mapbox.com
   login mapbox
   password sk.ey...
```

After making changes, reinstall platform-specific dependencies.

## Additional Tools

#### Generating Splash Screen Assets

To generate splash screen assets, use:
```sh
yarn react-native generate-bootsplash src/assets/images/root_hero.svg \
  --platforms=android,ios \
  --background=FFFFFF \
  --logo-width=178 \
  --assets-output=src/assets/bootsplash
```

## Troubleshooting

If you encounter problems while setting up or running the project, try the following:

1. Verify prerequisites – ensure required software is installed
2. Clean install – remove and reinstall dependencies:
```sh
# clean iOS build artifacts and Xcode derived data
rm -rf ios/build
rm -rf ~/Library/Developer/Xcode/DerivedData

# reset watchman state and clear file watching
watchman watch-del-all

# remove all installed node dependencies
rm -rf node_modules

# clean Android build artifacts and Gradle caches
rm -rf android/.gradle
rm -rf android/build
rm -rf android/app/build

# reinstall all project dependencies from package.json
yarn install
```
3. Rebuild native modules – For iOS:
```sh
cd ios
bundle exec pod install --repo-update
```
For Android:
```sh
cd android
./gradlew clean
```
4. Reset Metro Bundler cache
```sh
yarn start --reset-cache
```
5. Check Mapbox token configuration – ensure tokens are correctly added to configuration files

For persistent issues, refer to the project’s issue tracking system or contact the development team.
