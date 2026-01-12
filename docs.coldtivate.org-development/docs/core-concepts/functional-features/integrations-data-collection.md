# Integrations & Data Collection

This document provides a guide to how the platform integrates with external systems to collect and process data. It covers both temperature sensor providers and simulation-based integrations like COMSOL, which work together to power Coldtivate’s core features around monitoring and shelf-life prediction.

---

## 1. Temperature Sensor Integrations

These integrations allow the platform to collect accurate, real-time temperature data from cold storage units.

### Frontend Integration

- **Form Management:**

All sensors are integrated through a form built with `react-hook-form`, ensuring robust state management, validation, and user-friendly input handling. Each form collects the necessary credentials specific to the chosen provider.

Ecozen, however, requires a separate form and backend endpoint due to its particularities.

- **API Connectivity:**

The frontend is built with React (and React Native) and is responsible for collecting user input and passing sensor credentials to the backend. The updated process simplifies the user experience:

**Sensor Setup Flow**:

- The user selects a sensor provider (`Ecozen`, `Figorr`, `Ubibot`, or `Victron`).

- They fill in credentials (`email/username` and `password`).

- The frontend calls a unified endpoint through a centralized `SensorsService` that abstracts API calls for validating the credentials and retrieve all sensors associated with the account.

- The user selects a sensor from the returned list, which is saved upon cooling unit creation.

In summary, the frontend is responsible solely for gathering and transmitting sensor-specific data, while the backend takes care of establishing sensor connections and handling all subsequent operations. More on that, in the next section.

### Backend Integration

The backend handles authentication, sensor listing, periodic temperature syncing, and error handling. Key aspects of the updated architecture include:

- **Unified Sensor Listing API**:

  - A single endpoint (`storage/v1/user-sensor/sources/`) receives the sensor type (`integration_type`) and credentials (`username`, `password`).
  - After successful authentication, the backend returns a list of available sensors for the given account.
  - This list includes relevant metadata like the sensor ID, name, last seen timestamp, and specification type (e.g., temperature or humidity).

  - ##### Ecozen Exception:
    - Ecozen is the only provider with a dedicated backend endpoint due to its unique API structure.
    - **Endpoint**: `storage/v1/ecozen/test-connection`
    - **Payload**:
      ```json
      {
        "username": "user@mail.com",
        "password": "Hello123",
        "source_id": "machine_id_123"
      }
      ```
    - **Behavior**:
      - Authenticates using the provided credentials.
      - Uses the `source_id` (which corresponds to the sensor's `machine_id`) to query Ecozen for temperature data.
      - If the authentication and sensor connection are successful, returns a `200 OK` status.
      - On failure:
        - `401` for invalid credentials or missing token.
        - `404` for invalid machine ID.
        - `400` for generic or unexpected errors.
      - This response flow allows the frontend to confirm the sensor's availability before associating it with a cooling unit.

- **Scheduled Data Syncing**:

  - The task `update_temperature` periodically fetches temperature data from all connected sensors.
  - Data is fetched via integration-specific classes (e.g., `FigorrIntegration`, `UbibotIntegration`, `VictronIntegration`, `EcozenIntegration`).
  - Data is stored in `CoolingUnitSpecifications` and used for operations like shelf-life predictions.

- **Error Handling & Notifications**:

  - Failed data pulls result in system-generated `SENSOR_ERROR` notifications tied to the relevant cooling unit.
  - Once data retrieval resumes, the error notifications are automatically cleared.

- **Credential Storage**:

  - Credentials are securely stored in the `SensorIntegration` model and used during each scheduled sync operation.

- **Sensor Deletion**:
  - A `DELETE` endpoint allows removal of specific sensors if needed, with permission validation based on the user’s organization.

### Sensor-Specific Behaviors

Below is a summary of each supported sensor type:

#### Ecozen

- Dedicated Endpoint & Form
- Authenticates with email/password, retrieves room and set point temperatures.
- Timestamps are in milliseconds and parsed into datetime.
- Readings are stored only if spaced apart by 15+ minutes.
- API errors trigger sensor failure notifications.

#### Figorr

- Unified Endpoint Integration
- Authenticates with email/password.
- Lists all temperature/humidity sensors tied to the account.
- Reads data from the device history endpoint.
- Timestamps are parsed from high-precision strings.
- Values are recorded if newer than the last entry.

#### Ubibot

- Unified Endpoint Integration
- Authenticates with username and SHA256-hashed password.
- Lists all sensors and their fields.
- Extracts temperature/humidity from structured feed data.
- Parses ISO-formatted timestamps.
- Stores data only if valid and new.

#### Victron

- Unified Endpoint Integration
- Authenticates with email/password.
- Fetches installations and their system overviews.
- Identifies temperature sensors based on device class.
- Retrieves temperature data in 15-minute intervals.
- Caps retrieval to 10,000 data points per request.
- Includes fallback for initial syncs when no DB entries exist.

---

### Extensibility

The sensor integration system is designed for scale. Adding a new provider only requires implementing three base methods:

- `authorize`
- `list_sources`
- `get_datums_from_source`

This ensures new sensors can be seamlessly onboarded following a consistent contract.

---

In summary, the sensor integration architecture unifies multiple platforms under a single API contract (except for Ecozen), streamlining both frontend and backend interactions. This approach simplifies sensor selection for users and ensures scalable, reliable data syncing for the platform.

---

## 2. Simulation Integration: COMSOL (Digital Twin)

In addition to real-time sensor data, Coldtivate runs predictive Digital Twin simulations using `COMSOL`. These simulations estimate how long produce will remain fresh under current storage conditions, enabling smart notifications, shelf-life tracking, and proactive interventions.

### What It Does

- Runs predictive simulations per crate using `COMSOL` models
- Predicts:
    - Remaining shelf life (`shelf_life`)
    - Quality score (`quality_dt`)
    - Simulated temperature (`temperature_dt`)
- Updates crate records through a callback to the Base API

---
### How It Works

| Step | Action |
|------|--------|
| **1. Crate Selection** | A scheduled Celery task (`recompute_digital_twin`) filters eligible crates that meet criteria such as weight, recent data, and enabled digital twin. Only one crate per produce is sent. |
| **2. Trigger Microservice** | The task sends a POST request to the `Comsol-Digital-Twins` microservice with parameters, temperature history, and a callback URL. |
| **3. Job Queued** | The job is enqueued by an internal queue manager. Duplicate jobs (same crate) are skipped. |
| **4. FUSE-Controlled Input** | The microservice writes simulation inputs to a FUSE-mounted file (`event_loop_control.txt`) which is monitored by COMSOL Runtime. |
| **5. Simulation Execution** | COMSOL runs the appropriate model based on `fruit_index` and writes results to output files through FUSE. |
| **6. Output Parsing** | FUSE handlers detect completion and extract results from `output_PL.txt` and `outputvalues.txt`. |
| **7. Callback Dispatch** | The microservice sends a JSON callback to the Base API with prediction outputs. |
| **8. Database Update** | The Base API receives the callback and updates both the corresponding crate and all the others that share the same produce id in PostgreSQL. |

---

### Models Used

The simulation model is selected based on the crop's `digital_twin_identifier`. Available models include:

- `DigitalTwinAppleV5.mph`
- `DigitalTwinTomatoV5.mph`
- `DigitalTwinPotatoV5.mph`
- `DigitalTwinBananaV5.mph`
- `DigitalTwin_GenericV5.mph` (fallback model)

Each model is calibrated to reflect the spoilage dynamics of a specific crop.

---

### Reliability Measures

- **Deduplication**: Prevents enqueuing multiple jobs for the same crate.
- **Timeouts**: COMSOL simulations are terminated after 2 minutes if unresponsive.
- **Failsafes**: Errors are logged, email alerts are sent, and failures are gracefully skipped.
- **Monitoring**: Print-based logs support integration with external monitoring tools.
- **Cleanup**: All FUSE buffers are cleared after each job to manage memory.

---

## Summary

By combining sensor-based data collection with simulation-based forecasting, Coldtivate offers a powerful infrastructure for managing storage conditions and extending the life of perishable goods.
