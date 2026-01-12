# Database Entities
This section provides a high-level overview of the key Coldtivate database entities. It summarizes the primary tables, their purposes, and relationships.

---

## Database Relationships Overview

The project's database consists of multiple interconnected tables categorized mainly into **user management, storage, operations, marketplace, predictions, and metrics**. Below is a **brief overview of the key relationships** between them:

### 1. User & Company Relationships
- **`user_user`** (Users) is the central table that links to:
    - **`user_company`** (Companies) through **`user_operator`** and **`user_serviceprovider`**.
    - **`user_farmer`** (Farmers) through **`user_farmer_companies`** (Farmer-Company Link).
    - **`user_notification`**, **`user_genericusercode`**, **`user_invitationuser`**, and **`user_user_groups`** (User Roles & Notifications).
    - **`user_bankaccount`** (Company Bank Details).
    - **`auth_group_permissions`** (Permissions for different user roles).

### 2. Storage & Cooling Units
- **`storage_coolingunit`** (Cooling Units) links to:
    - **`storage_location`** (Geographical location).
    - **`storage_crate`** (Storage crates within a unit).
    - **`storage_produce`** (Produce stored in the unit).
    - **`storage_coolingunitcrop`** (Tracks which crops can be stored in which units).
    - **`storage_coolingunitpower`** (Power consumption details).
    - **`user_farmer_cooling_units`** (Farmers using cooling units).
    - **`storage_coolingunit_operators`** (Operators managing the unit).

### 3. Storage & Produce
- **`storage_crate`** (Individual crates in cooling units) links to:
    - **`storage_produce`** (A set of crates of the same crop type, checked in at the same time).
    - **`storage_coolingunit`** (The cooling unit where the crate is stored).
    - **`storage_cratepartialcheckout`** (Represents partial checkouts (e.g., partial sales) of this crate).

### 4. Marketplace & Orders
- **`marketplace_order`** (Orders) links to:
    - **`marketplace_marketlistedcrate`** (Available crates for sale).
    - **`marketplace_ordercrateitem`** (Items ordered).
    - **`marketplace_orderpickupdetails`** (Pickup logistics).
    - **`marketplace_coupon`** (Discounts applied to orders).
    - **`marketplace_paystackaccount`** (Payment details).

### 5. Operations & Transactions
- **`operation_checkin`** (Incoming produce) and **`operation_checkout`** (Outgoing produce) both link to:
    - **`operation_movement`** (Tracking movements in and out).
    - **`storage_produce`** (Produce being checked in/out).
    - **`marketplace_order`** (When an order triggers movement).
    - **`operation_marketsurvey`** (Survey of market price/loss post-checkout).
    - **`operation_marketsurveypreprocessing`** (Processing market survey before completion).

### 6. Prediction & Analytics
- **`prediction_market`** stores **market insights** and links to:
    - **`prediction_mlmarketdataindia`**, **`prediction_mlmarketdatanigeria`** (Market price historical data).
    - **`prediction_mlpredictiondata`** and **`prediction_mlpredictiondatang`** (Price forecasting).
    - **`storage_crop`** (The type of crops in the market predictions).

### 7. Metrics & Performance Tracking
- **`company_metrics`**, **`cooling_unit_metrics`**, **`impact_metrics`** and **`farmer_metrics`** track usage statistics related to:
    - Companies, cooling units, farmers, and crates in storage.
    - Energy consumption and occupancy levels in cooling units.
    - Revenue and operational performance over time.

---

## Database Schemas

To improve readability, we have divided the database schema into multiple smaller diagrams, each focusing on a specific aspect of the system. Instead of a single large and complex diagram, this modular approach allows us to better understand relationships between tables without overwhelming detail.

The database schema is organized into the following sections:

1. **User & Authentication** – Covers user accounts, authentication, permissions, and user groups.
2. **User, Company & Operators** – Represents companies, farmers, and operator relationships.
3. **Storage & Cooling Units** – Focuses on storage units, crops, crates, and cooling unit specifications.
4. **Operations & Marketplace** – Includes logistics, orders, transactions, and market listings.
5. **Predictions & Analytics** – Contains market prediction models and their dependencies.
6. **Metrics & Performace Tracking** – Contains usage and revenue statistics that are relevant for company owners.

### Why This Organization?
- **Logical Grouping**: Related tables are grouped based on their purpose in the system.
- **Improved Readability**: Each diagram is smaller and easier to interpret.
- **Clearer Relationships**: Helps identify how different entities interact across functional domains.

### 1. User & Authentication Tables
```mermaid
erDiagram
    auth_group {
        int id PK
        string name
    }

    auth_group_permissions {
        int id PK
        int group_id FK
        int permission_id FK
    }

    auth_permission {
        int id PK
        string name
        string codename
    }

    user_user {
        int id PK
        string username
        bool is_active
    }

    user_user_groups {
        int id PK
        int user_id FK
        int group_id FK
    }

    auth_group ||--o{ auth_group_permissions : "has"
    auth_permission ||--o{ auth_group_permissions : "granted to"
    user_user ||--o{ user_user_groups : "has"
    user_user_groups ||--o{ auth_group : "is part of"
```

### 2. User, Company & Operators Tables
```mermaid
erDiagram
    user_user {
        int id PK
        string username
    }

    user_operator {
        int id PK
        int company_id FK
        int user_id FK
    }

    user_farmer {
        int id PK
        int user_id FK
    }

    user_farmer_companies {
        int id PK
        int farmer_id FK
        int company_id FK
    }

    user_farmer_cooling_units {
        int id PK
        int farmer_id FK
        int coolingunit_id FK
    }

    user_company {
        int id PK
        string name
    }

    user_bankaccount {
        int id PK
        string account_name
    }

    user_company ||--o{ user_user : "owned by"
    user_company ||--o{ user_bankaccount : "uses"
    user_operator ||--o{ user_company : "belongs to"
    user_operator ||--o{ user_user : "is"
    user_farmer ||--o{ user_user : "is"
    user_farmer_companies ||--o{ user_farmer : "linked to"
    user_farmer_companies ||--o{ user_company : "linked to"
    user_farmer_cooling_units ||--o{ storage_coolingunit : "manages"

```

### 3. Storage & Cooling Units
```mermaid
erDiagram
    storage_crop {
        int id PK
        int crop_type_id FK
        string name
    }

    storage_croptype {
        int id PK
        string name
    }

    storage_coolingunit {
        int id PK
        string name
    }

    storage_location {
        int id PK
        string city
        int company_id FK
    }

    storage_crate {
        int id PK
        int produce_id FK
        int cooling_unit_id FK
    }

    storage_produce {
        int id PK
        int crop_id FK
        int checkin_id FK
    }

    storage_coolingunitpower {
        int id PK
        int cooling_unit_id FK
    }

    storage_coolingunitcrop {
        int id PK
        int cooling_unit_id FK
        int crop_id FK
        int price_id FK
    }

    storage_coolingunitspecifications {
        int id PK
        int cooling_unit_id FK
    }

    storage_pricing {
        int id PK
        string pricing_type
    }

    storage_croptype ||--o{ storage_crop : "classifies"
    storage_crop ||--o{ storage_produce : "used in"
    operation_checkin ||--o{ storage_produce : "records"
    storage_produce ||--o{ storage_crate : "contains"
    storage_crate ||--o{ storage_coolingunit : "stored in"
    storage_coolingunit ||--o{ storage_location : "located at"
    user_company ||--o{ storage_location : "owns"
    storage_coolingunitcrop ||--o{ storage_coolingunit : "supports"
    storage_coolingunitcrop ||--o{ storage_crop : "stores"
    storage_coolingunitcrop ||--o{ storage_pricing : "priced with"
    storage_coolingunitpower ||--o{ storage_coolingunit : "powers"
    storage_coolingunitspecifications ||--o{ storage_coolingunit : "defines"
```

### 4. Operations & Marketplace
```mermaid
erDiagram
    operation_checkin {
        int id PK
        int movement_id FK
        int owned_by_user_id FK
    }

    operation_checkout {
        int id PK
        int movement_id FK
    }

    operation_movement {
        int id PK
        int order_id FK
        int operator_id FK
    }

    operation_marketsurvey {
        int id PK
        int checkout_id FK
        int crop_id FK
    }

    marketplace_order {
        int id PK
        int created_by_user_id FK
        int owned_on_behalf_of_company_id FK
    }

    marketplace_ordercrateitem {
        int id PK
        int order_id FK
        int market_listed_crate_id FK
    }

    marketplace_marketlistedcrate {
        int id PK
        int crate_id FK
    }

    marketplace_marketlistedcrateprice {
        int id PK
        int market_listed_crate_id FK
    }

    storage_crop {
        int id PK
        string name
    }

    user_user {
        int id PK
        string username
    }

    user_company {
        int id PK
        string name
    }

    user_operator {
        int id PK
        int user_id FK
        int company_id FK
    }

    storage_crate {
        int id PK
        float weight
    }

    operation_movement ||--o{ operation_checkin : "includes"
    operation_movement ||--o{ operation_checkout : "includes"
    operation_movement ||--o{ marketplace_order : "initiates"
    operation_movement ||--o{ user_operator : "handled by"
    marketplace_order ||--o{ user_user : "created by"
    marketplace_order ||--o{ user_company : "for company"
    marketplace_ordercrateitem ||--o{ marketplace_order : "belongs to"
    marketplace_ordercrateitem ||--o{ marketplace_marketlistedcrate : "from"
    marketplace_marketlistedcrate ||--o{ storage_crate : "lists"
    marketplace_marketlistedcrate ||--o{ marketplace_marketlistedcrateprice : "priced with"
    operation_checkout ||--o{ operation_marketsurvey : "surveyed by"
    storage_crop ||--o{ operation_marketsurvey : "includes"
```

### 5. Prediction & Analytics
```mermaid
erDiagram
    prediction_market {
        int id PK
        string name
        int state_id FK
    }

    prediction_state {
        int id PK
        string name
        int country_id FK
    }

    prediction_mlmarketdataindia {
        int id PK
        int market_id FK
        int crop_id FK
    }

    prediction_mlmarketdatanigeria {
        int id PK
        int state_id FK
        int crop_id FK
    }

    prediction_mlpredictiondata {
        int id PK
        int market_id FK
        int crop_id FK
    }

    user_country {
        int id PK
        string name
    }

    storage_crop {
        int id PK
        string name
    }

    prediction_state ||--o{ prediction_market : "has"
    prediction_state ||--o{ user_country : "part of"
    prediction_mlmarketdataindia ||--o{ prediction_market : "based on"
    prediction_mlmarketdataindia ||--o{ storage_crop : "for"
    prediction_mlmarketdatanigeria ||--o{ prediction_state : "for"
    prediction_mlmarketdatanigeria ||--o{ storage_crop : "for"
    prediction_mlpredictiondata ||--o{ prediction_market : "analyzes"
    prediction_mlpredictiondata ||--o{ storage_crop : "for"
```

### 6. Metrics & Performace Tracking
```mermaid
erDiagram
    cooling_unit_metrics {
        int id PK
        int cooling_unit_id FK
        int company_id FK
    }

    farmer_metrics {
        int id PK
        int farmer_id FK
        int cooling_unit_id FK
    }

    impact_metrics {
        int cooling_unit_id FK
        int company_id FK
        int farmer_id FK
        int crop_id FK
    }

    company_metrics {
        int company_id PK
    }

    storage_coolingunit {
        int id PK
        string name
    }

    user_company {
        int id PK
        string name
    }

    user_farmer {
        int id PK
        int user_id FK
    }

    storage_crop {
        int id PK
        string name
    }

    cooling_unit_metrics ||--o{ storage_coolingunit : "for"
    impact_metrics ||--o{ storage_coolingunit : "for"
    cooling_unit_metrics ||--o{ user_company : "by"
    farmer_metrics ||--o{ storage_coolingunit : "uses"
    farmer_metrics ||--o{ user_farmer : "by"
    impact_metrics ||--o{ user_company : "by"
    impact_metrics ||--o{ user_farmer : "by"
    impact_metrics ||--o{ storage_crop : "on"
    company_metrics ||--o{ user_company : "summarizes"
```

---

For a more comprhensive overview of each table, please refer to the [Schema Breakdown](database-entities.md) section
