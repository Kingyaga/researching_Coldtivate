# Functional Features

Functional features define **what the system does** to fulfill business requirements and deliver value to end users. In Coldtivate, these features are tied to core platform operations—like collecting sensor data, running simulations, generating predictions, and enabling smart notifications.

This section introduces the system’s main functional capabilities and links to detailed pages that describe how they work and how they’re implemented.

---

## [Sensor Integrations](/core-concepts/functional-features/integrations-data-collection/#1-temperature-sensor-integrations)

The platform integrates with **third-party temperature sensors** (e.g. Ecozen, Figorr, Ubibot, Victron) to capture cold room conditions in real time. This feature spans both the frontend and backend, supporting sensor setup, credential validation, and scheduled syncing.

You’ll learn about:

- The sensor setup flow for users
- Unified and provider-specific API endpoints
- Data syncing and error handling
- Extensibility to support new providers

---

## [COMSOL & Digital Twin Simulations](/core-concepts/functional-features/integrations-data-collection/#2-simulation-integration-comsol-digital-twin)

Integrated with COMSOL, Coldtivate can simulate shelf-life outcomes based on current temperature conditions. This feature powers predictive alerts and decision-making support for operators and farmers.

Inside the documentation:

- How crate-level simulations are triggered
- Input and output file structure
- Model selection based on crop types
- Reliability and fail-safe mechanisms


