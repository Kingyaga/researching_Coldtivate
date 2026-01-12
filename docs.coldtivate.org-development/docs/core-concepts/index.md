---
hide:
  - toc
---

# Coldtivate's Core Concepts

This section provides a foundational understanding of how the Coldtivate platform is structured, developed, and maintained. It is intended for both developers and technical stakeholders who want to explore the architecture, key entities, and core services that make up the system.

Below is an overview of the key documents included in this section:

---

### [Repositories](./repositories/index.md)
An overview of the Coldtivate mobile application and its backend services. This document highlights the purpose and structure of each codebase, showcasing how the system is designed to improve cold room operations for cooling companies, farmers, and traders.

---

### [System Architecture](./architecture.md)
Details the overall system architecture of the Coldtivate platform. This includes the backend monorepo, frontend applications, database design, integrations, and functional/technical flows across services.

---

### [Container Architecture](./container-architecture.md)
Outlines the use of Docker containers in the platform. Each core service runs in its own container, with Caddy functioning as the gateway and reverse proxy. This document describes how the containers interact and are orchestrated.

---

### [Database Entities](./database/index.md)
Provides a high-level overview of the key database tables and models within Coldtivate. It includes explanations of table purposes and relationships, helping developers understand how data is structured and linked.

---

### [Functional Features](./functional-features/index.md)
Describes critical business features of the platform, starting with Integrations & Data Collection—used to capture environmental data from sensors. It also explores features like Digital Twin modeling and COMSOL-based simulations that drive intelligent decision-making in the system.

---

### [Technical Features](./technical-features/index.md)
Covers notable technical implementations across both frontend and backend. This includes architecture patterns, integration approaches, and data processing strategies that support platform reliability and performance.

---

### [Scheduled Tasks](./scheduled-jobs.md)
A summary of the platform’s recurring background jobs (cron tasks), including what each task does and how often it runs. These tasks ensure the system remains up-to-date, accurate, and automated.
