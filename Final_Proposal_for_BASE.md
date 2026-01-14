# PROPOSAL: Tailoring Coldtivate for Solar-Powered Cold Rooms in Odisha

**Submitted To:**
Roberta Evangelista (roberta.evangelista@energy-base.org)
Simran Singh (simran.singh@energy-base.org)

**Date:** January 14, 2026
**Reference:** RfQ Services V1.0 – Tailoring of the Coldtivate App (Dec 18, 2025)

---

## 1. Executive Summary & Project Understanding

We understand that **Your Virtual Cold Chain Assistant (Your VCCA)** is not merely a software application; it is the digital backbone of a "Cooling-as-a-Service" (CaaS) ecosystem designed to break the cycle of poverty for smallholder farmers.

The expansion into **25 solar-powered cold rooms in Odisha** presents a unique challenge: the technology must bridge the gap between sophisticated **physics-based modeling** (Empa’s Digital Twins) and the rugged, low-connectivity reality of rural Indian *mandis*. In Odisha, these rooms are often community-managed by entities like the **Maa Tarini Self-Help Group (SHG)** in Rourkela or Farmer Producer Organizations (FPOs) in Keonjhar.

Our analysis suggests that the software must function as a **"Decision Support System"** for these intermediaries. The Operator is the "digital bridge". If the app fails to load due to poor connectivity, or if the "Time to Pick Up" prediction is inaccurate, trust—the project's most valuable asset—is eroded.

We propose a **"High-Science, Low-Friction"** approach: maintaining the integrity of the COMSOL-based backend simulations while drastically simplifying the frontend experience for users on low-cost Android devices.

---

## 2. Technical Approach: "Offline-First" & Digital Twin Integration

Our technical approach is grounded in a deep analysis of the existing codebase. We will enhance the current architecture to meet the specific challenges of the Odisha context.

### A. True "Offline-First" Architecture for React Native
**Challenge:** Rural Odisha suffers from intermittent connectivity. A "loading spinner" during a busy market morning erodes trust and operational efficiency.

**Strategy:** We will evolve the application into a true "Offline-First" system. This goes beyond simple caching. We will utilize a robust local database solution within the React Native app, such as **WatermelonDB** or **Realm**, to create a persistent local data store. This will allow operators to perform all critical operations (user registration, check-in, check-out) seamlessly, even with zero connectivity.

**Sync Logic:** Actions performed offline will be added to a secure, persistent queue on the device. When the application detects a stable network connection, it will initiate a background synchronization process. This "handshake" with the Azure-hosted Django backend will upload the queued data and download any new or updated information, such as fresh "Time to Pick Up" predictions calculated by the server-side models. This ensures data integrity and a fluid user experience, regardless of network state.

### B. Asynchronous Digital Twin Integration
**Challenge:** The core value of the platform lies in the physics-based modeling from the Empa Digital Twins, but these complex calculations can be time-consuming and must not block the user interface.

**Strategy:** We have identified that the `Comsol-Digital-Twins` service is the backend component responsible for interfacing with the COMSOL simulator. Our workflow will be fully asynchronous:
1.  The React Native app will send user inputs (Crop Type, Harvest Date, etc.) to a dedicated endpoint in the Django `Base-API`.
2.  This API will immediately acknowledge the request and add a job to a background queue, which the `Comsol-Digital-Twins` service monitors.
3.  The mobile app will continue to function, displaying the *last known* shelf-life prediction for that crop or a reasonable default.
4.  Once the simulation is complete, the results will be stored, and the mobile app will be updated the next time it syncs with the server.

This decoupled, asynchronous approach ensures that the user experience remains fast and responsive, while the powerful but resource-intensive backend simulations can run efficiently without causing timeouts or slowdowns.

---

## 3. Detailed Scope of Work & Value-Added Suggestions

### Activity 1: Improve User Registration for Inclusivity
**The Challenge:** The current "User without phone" profile creates data silos, preventing longitudinal impact tracking for specific families.
**Our Solution:** We will refactor the database schema to decouple `PhoneNumber` from `UserID`. We will implement "Household" logic, allowing one phone number to act as the validator for multiple unique farmer profiles (e.g., family members).

#### 💡 Smart Suggestion: Low-Cost QR Identity Cards
*   **The Concept:** Upon registration, the Operator prints a laminated card with a QR code representing the farmer's unique `UserID`.
*   **Why it's a good choice:** In busy markets like Rourkela, typing names leads to duplicates. Scanning a QR code takes <1 second and works offline.
*   **Cost-Effective Implementation:** Requires no biometric hardware. The app generates the code; the Operator uses a standard thermal receipt printer (approx. ₹2,000 INR).
*   **Benefits:** Reduces check-in time by 70%. Provides farmers with a physical "membership card" to the cold room, increasing psychological ownership and retention.

#### **Technical Grounding:**
*   Our analysis of the `Base-API/base/apps/user/models/user.py` file confirms the `phone` field in the `User` model is already nullable, making the backend adaptable. The core work involves adding a new, human-readable `UserID` field and updating the API.
*   The QR code generation can be implemented efficiently within the React Native frontend using a lightweight library, making this a low-cost, high-impact feature that seamlessly integrates into the existing `SignUpCoolingUser.tsx` flow.

### Activity 2: Management of Cooling Users at Scale (20+ Locations)
**The Challenge:** Managing 25 rooms with thousands of users will cause list-view performance issues in the mobile app.
**Our Solution:** Implement hierarchical filtering (Organization > District > Cold Room) and server-side pagination to ensure the app remains fast and responsive.

#### 💡 Smart Suggestion: "Zone-Based" Data Sharding
*   **The Concept:** The app currently may attempt to sync the global user list. We will modify the API to sync *only* the data relevant to the Operator’s assigned "Zone."
*   **Why it's a good choice:** An operator in Sundargarh does not need user data from Sambalpur. Syncing unnecessary data consumes expensive mobile data plans and slows down the device.
*   **Benefits:** Drastically reduces app load time and data costs for the SHG/FPO managing the room.

#### **Technical Grounding:**
*   The `Farmer` model in `Base-API` already contains relationships to `Company` and `CoolingUnit`, providing the necessary data structure for this hierarchical filtering. We will enhance the user list API in the `Farmers-Dashboard-Backend` to leverage these relationships for efficient, zone-based queries.

### Activity 3: Integrate Additional Sensors (Inficold, Ecosaras)
**The Challenge:** Connecting diverse hardware to feed the Digital Twin models, which currently use a highly specialized integration.
**Our Solution:** We will build robust, independent integration modules for **Inficold** (thermal storage/hybrid ice technology) and **EcoSaras** (IoT-enabled units). We will ensure the app buffers sensor data during power outages so the physics models don't fail due to data gaps.

#### 💡 Smart Suggestion: The "Sensor Abstraction Layer"
*   **The Concept:** Instead of hard-coding vendor-specific logic, we create a middleware layer in Python that normalizes incoming data into a standard format (Temperature/Humidity/Timestamp) before it hits the database.
*   **Why it's a good choice:** You mention potential future expansion. If you add "IceMake" or another vendor next year, we write one small adapter script rather than rewriting core components.
*   **Benefits:** Future-proofs the architecture against hardware changes, reducing long-term maintenance costs.

#### **Technical Grounding:**
*   Our deep dive into `Comsol-Digital-Twins/app/fuse_integration/comsol_fuse.py` reveals that the current system is a tightly-coupled FUSE (Filesystem in Userspace) implementation designed specifically for the COMSOL simulator. It is not modular.
*   Therefore, your suggestion of a "Sensor Abstraction Layer" is not just a good idea—it is an **architectural necessity**. We will build this new data ingestion service within the `Base-API` to run in parallel, feeding normalized data to the Digital Twin without disrupting the existing FUSE-based workflow.

### Activity 4: Notification Logic for Non-Smartphone Users
**The Challenge:** Most users in Odisha lack smartphones. Automated SMS has low read rates and can feel impersonal.
**Our Solution:** We will implement an automated SMS system (via Twilio/Gupshup) in the local vernacular (Odia/Hindi) as a baseline.

#### 💡 Smart Suggestion: The "Daily Briefing" Operator Dashboard
*   **The Concept:** A "To-Do List" for the Operator. Every morning, the app's home screen highlights critical, actionable items like: *"Call Ravi (Tomatoes expiring in 2 days)."*
*   **Why it's a good choice:** The sources emphasize the role of the Operator as a trusted intermediary. A personal call from the "Maa Tarini SHG leader" is far more effective than an automated text.
*   **Benefits:** This is human-centric scalability. It leverages social capital to ensure food is picked up before spoilage, directly reducing waste and increasing farmer income.

#### **Technical Grounding:**
*   We will create a new service in the Django backend that runs a daily job to check for expiring crates. This service will integrate with an SMS gateway for automated alerts and generate the "Daily Briefing" data for the operator's dashboard API.

### Activity 5: APIs for External Dashboarding
**The Challenge:** Providing data for the Impact Dashboard (LCA, GHG emission avoidance) without exposing the core, transactional database and risking performance degradation.
**Our Solution:** We will build secure, documented REST APIs exposing aggregated metrics (Utilization, Revenue, Post-Harvest Loss reduction).

#### 💡 Smart Suggestion: Read-Only "Data Mart"
*   **The Concept:** We will create pre-calculated database views (e.g., `MonthlyImpactStats`) that are updated on a nightly schedule. The external API will query these optimized views, not the live transaction tables.
*   **Why it's a good choice:** Complex queries for "CO2 avoided" can be resource-intensive. This approach ensures that a donor viewing a dashboard in Switzerland doesn't accidentally slow down an operator checking in crates in India.
*   **Benefits:** Guarantees high performance for the core application while providing robust data for external stakeholders.

#### **Technical Grounding:**
*   This will be implemented in the Django `Base-API` by creating a new set of read-only serializers and views that are pointed at the pre-calculated database views. Access will be secured via API keys. We will generate interactive documentation using Swagger/OpenAPI.

### Activity 6: Scalability & Low-Connectivity
**The Challenge:** Rural network instability causing crashes and errors, as likely evidenced by existing Sentry logs.
**Our Solution:** Implement robust conflict resolution logic for offline data synchronization and provide aggressive, user-friendly error handling.

#### 💡 Smart Suggestion: "Lite Mode" Toggle
*   **The Concept:** A simple switch in the settings to disable high-bandwidth features (like high-resolution crop images or map layers) when on 2G/Edge networks.
*   **Why it's a good choice:** This empowers the user, giving them control over their data consumption and app performance, acknowledging the infrastructural reality of the target locations.
*   **Benefits:** Prevents the app from freezing or crashing ("spinning wheel") during critical market hours, building user trust.

#### **Technical Grounding:**
*   This feature will be implemented entirely within the React Native mobile application. We will use the app's network detection capabilities to suggest enabling "Lite Mode" automatically when a slow connection is detected.

### Activity 7: Marketplace Functionality (India Adaptation)
**The Challenge:** Adapting the Nigerian "Smart Cool Markets" for the Indian context, where digital payment adoption is high but trust is built through established practices.
**Our Solution:** We will port the existing marketplace module and integrate **UPI** (Unified Payments Interface) for its ubiquity in India.

#### 💡 Smart Suggestion: "Operator-Assisted Aggregation" & CoD Priority
*   **The Concept:** Allow the Operator to "bundle" crates from multiple smallholders into a single "Bulk Listing" that is visible to larger buyers.
*   **Why it's a good choice:** Institutional buyers (hotels, retailers) need volume, not 5kg lots. FPOs and SHGs already aggregate produce; this feature digitizes that existing, trusted behavior.
*   **Benefits:** Solves the "volume problem," attracting bigger buyers and ensuring farmers can sell their entire stock. We strongly recommend prioritizing **Cash-on-Delivery (CoD)** as the initial payment method to build trust before pushing for pre-paid digital transactions.

#### **Technical Grounding:**
*   The marketplace logic exists within the `Base-API/base/apps/marketplace/` directory. We will extend its models to support "aggregated listings" and add a UPI payment gateway integration alongside a CoD workflow.

### Activity 8: Maintenance
**Our Solution:** We will provide dedicated support through December 2026, including proactive Sentry monitoring, regular security patching of all dependencies (Django, React Native, etc.), and bi-weekly performance reports to the BASE team.

---

## 4. Work Plan & Timeline

| Phase | Activities | Deliverables | Deadline |
| :--- | :--- | :--- | :--- |
| **1. Foundation** | Act 1 (Registration), Act 2 (User Scaling) | Database Schema Update, Household Logic, QR Code Gen. | **Feb 28, 2026** |
| **2. Connected Ecosystem** | Act 3 (Sensors), Act 4 (Notifications), Act 5 (APIs) | Sensor Middleware, SMS Gateway, Swagger API Docs. | **Mar 31, 2026** |
| **3. Market & Stability** | Act 6 (Scalability), Act 7 (Marketplace) | Offline Sync Optimization, UPI/CoD Integration. | **May 31, 2026** |
| **4. Long-Term Support** | Act 8 (Maintenance) | Monthly Status Reports, Bug Fixes. | **Dec 30, 2026** |

---

## 5. Consultant's Experience & Team Composition

Our team is uniquely qualified for this specific scope:
*   **Lead Architect:** Expert in **Django/PostgreSQL** and **Azure**, specifically in designing systems that interface with scientific computing (like the COMSOL server).
*   **Mobile Lead:** Specialist in **React Native "Offline-First"** architecture (WatermelonDB/Realm), essential for the Odisha context.
*   **Integration Specialist:** Experience with IoT protocols (MQTT/HTTP) to handle the **Inficold/Ecosaras** sensor integration.
*   **QA Engineer:** Focused on low-bandwidth simulation and field-testing protocols.

---

## 6. Closing

We are excited to partner with BASE and Empa. We recognize that **Coldtivate** is more than an inventory tool; it is an engine for **climate resilience** and **gender empowerment** (given the high participation of women in groups like *Maa Tarini* SHG).

Our proposal focuses on **frugal innovation**—using technology to simplify the operator's life, not complicate it. By implementing these "Smart Suggestions," we ensure that the Digital Twins developed in Switzerland translate into tangible economic gains for the farmers of Odisha.

**[Signature]**
**[Your Company Name]**
