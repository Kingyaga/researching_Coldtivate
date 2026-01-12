# Coldtivate Repositories

This document provides an overview of the Coldtivate mobile application and its backend services. Coldtivate is designed to enhance the efficiency and transparency of cold room operations, benefiting cooling companies, farmers, and traders.

---

## Repositories

### Mobile App: [coldtivate/mobile-app-react-native](https://gitlab.com/b1866/coldtivate/mobile-app-react-native){:target="_blank"}

This repository contains the React Native codebase for the Coldtivate mobile application. It serves as the primary interface for users to access and interact with the Coldtivate platform. Key features include:

* A cross-platform design supporting both Android and iOS devices.
* User-friendly interface for managing cold room operations.
* Seamless integration with backend services.

> For further info on repository structure please refer to [this](./mobile-structure.md) page.

---

### Backend Monorepo: [coldtivate/backend-monorepo](https://gitlab.com/b1866/coldtivate/backend-monorepo){:target="_blank"}

This repository hosts the backend services for the Coldtivate platform. It handles data management, processing, and API endpoints required by the mobile application. Features include:

* Inventory management.
* Storage life calculations.
* Market price forecasting.
* Data analytics and reporting.
* User authentication and database interactions.
* API endpoints for mobile app communication.

> For further info on repository structure please refer to [this](./backend/index.md) page.

---

### Knowledge Hub: [coldtivate/knowledge-hub-pwa](https://gitlab.com/b1866/coldtivate/knowledge-hub-pwa){:target="_blank"}

The Knowledge Hub, a Progressive Web App (PWA), serves as a comprehensive educational resource for cooling companies, operators, and farmers. It functions as a library for information related to cooling expertise. Such as:

* **Farmer's Comic Strip:**
    * A visually engaging comic strip that illustrates how cooling preserves crop quality.
    * It demystifies the "Cooling-as-a-Service" model, demonstrating its benefits in securing better market prices through enhanced crop preservation.
    * This resource simplifies the advantages of proper cooling, making them easily understandable.
* **Operator's Manual:**
    * A practical guide for cold room management, covering essential aspects like temperature control and crop care.
    * Includes detailed, step-by-step instructions for effective cold room operation and multi-commodity storage.
    * This provides hands on knowledge for anyone operating a cold room.
* **Digital Twin and Time-to-Pick-Up Model:**
    * An explanation of how Coldtivate's predictive technology estimates the remaining storage life of crops.
    * Provides insights into the advanced algorithms used to monitor and optimize crop storage duration.
    * This section explains the technology behind optimizing storage, and when to extract product.

In essence, the Knowledge Hub is designed to provide the knowledge and tools necessary to maximize the benefits of cooling technology, ensuring products remain fresh and profitable.

> For further info on repository structure please refer to [this](./pwa.md) page.

---

### Documentation Repository: [coldtivate/docs.coldtivate.org](https://gitlab.com/b1866/coldtivate/docs.coldtivate.org){:target="_blank"}

This repository contains the complete documentation for the Coldtivate ecosystem, including technical guides, API references, and implementation instructions. It serves as the central knowledge base for developers and users. The documentation covers:

* Mobile app installation and configuration.
* Backend API integration.
* Knowledge Hub deployment.
* System architecture and data flow explanations.
* Troubleshooting guides.

> For further info on repository structure please refer to [this](./docs.md) page.
