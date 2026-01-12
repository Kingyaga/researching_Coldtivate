# Mobile App Structure Overview

The Coldtivate mobile application is built with React Native, with a well-organized folder structure designed for scalability and maintainability. Below is a detailed breakdown of the project structure:

```
coldtivate-mobile-app-react-native/
├── .maestro/               # Maestro test automation files
├── android/                # Android-specific native code and configurations
├── ios/                    # iOS-specific native code and configurations
├── src/                    # Main source code directory
│   ├── assets/             # Static assets used throughout the application
│   │   ├── bootsplash/     # Splash screen resources
│   │   ├── fonts/          # Custom fonts
│   │   ├── icons/          # Icon assets
│   │   └── images/         # Image resources
│   ├── common/             # RBAC, network status and app version tracking
│   ├── constants/          # Application-wide constants
│   ├── i18n/               # Internationalization and localization
│   │   ├── plugins/        # i18n plugins and extensions
│   │   └── transl/         # Translation files for different languages
│   ├── navigation/         # Navigation configuration and components
│   ├── screens/            # Screen components organized by feature
│   │   ├── Auth/           # Authentication-related screens
│   │   └── Dashboard/      # Main application dashboard screens
│   ├── services/           # Service layer for API calls and integrations
│   ├── stores/             # State management stores
│   ├── types/              # TypeScript type definitions and interfaces
│   ├── ui/                 # UI-related code
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks for UI logic
│   │   ├── lib/            # UI utilities and helper functions
│   │   └── primitives/     # Primitive UI components
│   └── App.tsx             # Main application component
├── react-native.config.js  # React Native configuration file
└── tailwind.config.js      # Tailwind CSS configuration
```

---

### Application Architecture Overview

This document outlines the architecture of our React Native application, emphasizing a clean separation of concerns to enhance maintainability, scalability, and developer collaboration.

**1. Core Application Structure**

* **`src/` (Source Code):**
    * This is the heart of the application, containing all JavaScript/TypeScript logic.
    * It houses the React Native code and business logic.

**2. Feature-Based Organization**

* **`screens/` (Screens):**
    * Organized by feature (e.g., Authentication, Dashboard).
    * Each subdirectory represents a distinct screen of the application.
* **`services/` (Service Layer):**
    * Handles API interactions, external integrations, and data transformation.
    * Provides a clear separation between UI and data access.
* **`stores/` (State Management):**
    * Centralizes application state management.
    * Ensures consistent state across the application.
* **`navigation/` (Navigation System):**
    * Defines routing and navigation logic.
    * Manages navigation state.
* **`i18n/` (Internationalization):**
    * Handles localization and translation.
    * `plugins/` holds extensions.
    * `transl/` holds language specific translations.

**3. User Interface (UI) Architecture**

* **`ui/` (UI Directory):**
    * Employs a layered UI approach:
        * **`primitives/`:** Basic UI building blocks (buttons, inputs).
        * **`components/`:** Reusable UI elements combining primitives.
        * **`hooks/`:** Custom React hooks for UI logic.
        * **`lib/`:** UI utilities and helper functions.

**4. Assets and Resources**

* **`assets/` (Assets Management):**
    * Stores all static resources:
        * **`bootsplash/`:** Splash screen resources.
        * **`fonts/`:** Custom typography assets.
        * **`icons/`:** Application iconography.
        * **`images/`:** Static image resources.

**5. Platform-Specific Code**

* **`android/` and `ios/`:**
    * Contains native code and configurations for each platform.
    * Includes native modules and platform-specific implementations.

**6. Utilities and Configuration**

* **`common/` (Common Utilities):**
    * Shared code, utilities, and helper functions.
    * Promotes code reusability (DRY principle).
* **`constants/` (Constants):**
    * Application-wide constants, configuration values, and environment variables.
    * Ensures consistency across the application.
* **`types/` (Type System):**
    * TypeScript type definitions and interfaces.
    * Enhances code quality through strong typing.
* **Configuration Files:**
    * `tailwind.config.js`: Styling configuration.
    * `react-native.config.js`: React Native settings.

**7. Testing**

* **.maestro/ (Testing):**
    * Contains automated testing configurations and scripts.
    * Supports quality assurance and regression testing.

---

**Architectural Principles**

* **Separation of Concerns:** UI, business logic, and data access are clearly divided.
* **Reusability:** Common code and UI components are designed for reuse.
* **Maintainability:** Clear structure and organization facilitate code maintenance.
* **Scalability:** The architecture supports application growth and expansion.
* **Collaboration:** Clear boundaries enable efficient teamwork.
