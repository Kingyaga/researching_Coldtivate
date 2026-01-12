# BASE API

> ⚠️ Note: This page is currently under construction and may be updated with additional details and endpoints.

The BASE API serves as the central backend entry point for the Coldtivate platform. It manages authentication, storage operations, and sensor data, while also orchestrating data processing across other backend services. Built with **Django**, it uses **Celery** for background task execution and **Valkey** for caching.

The BASE API follows a monolithic-but-modular architecture, where different domains of functionality (e.g., marketplace, storage, user, etc.) are implemented as standalone Django apps within the `apps/` directory. This modular approach allows for better organization, scalability, and team collaboration.

---

## Marketplace App
The marketplace app handles marketplace-specific functionality within the Coldtivate platform. This includes order management, payment processing, and background task execution. It is designed to operate independently while interacting with other components of the BASE API.

Documentation for this app includes its models, services, serializers, tasks, views, and endpoints.

---

### Models
The marketplace app defines several models responsible for managing marketplace operations such as crate listings, pricing, orders, coupons, and payment accounts. Below is a brief overview of each model:

- `CompanyDeliveryContact`: Stores delivery contact information for a company.
- `Coupon`: Represents a discount coupon that can be used by users or on behalf of a company.
- `MarketListedCrate`: Represents a crate listed in the marketplace.
- `MarketListedCratePrice`: Stores pricing information for a crate listing.
- `Order`: Represents a full order containing one or more crate items.
- `OrderCrateItem`: Represents an individual item in an order, tied to a market-listed crate.
- `OrderPickupDetails`: Stores pickup preferences for an order item and cooling unit.
- `PaystackAccount`: Represents a user's or company’s Paystack subaccount.

---

### Payment Processor
The payment_processor module integrates with Paystack to handle secure payment transactions within the marketplace.

---

#### Key Responsibilities
- **Fee Calculation**: Dynamically computes transaction fees based on Paystack’s pricing structure, including caps, thresholds, and optional international handling.
- **Final Amount Computation**: Determines the total amount to be charged, including fees, based on a given subtotal using an iterative approach.
- **Split Payments**: Automatically distributes payments to multiple recipients (e.g., sellers, cooling companies) using Paystack subaccounts and split groups.
- **Transaction Initialization**: Generates unique references and initiates Paystack transactions with callbacks and metadata.
- **Webhook Handling**: Listens for Paystack events like `charge.success` to update the order status and complete the payment process.

---

This module ensures a seamless and automated payment experience, while enforcing business rules and maintaining accurate financial records.

---

### Marketplace API Overview
This section documents the REST API endpoints available in the marketplace app. Endpoints are grouped by role (buyer, seller, company) and functionality.

---
#### Buyer Endpoints
##### Cart

| Method | Endpoint                                 | Description                                      |
|--------|------------------------------------------|--------------------------------------------------|
| GET    | `/buyer/cart/`                           | Retrieve current cart                            |
| POST   | `/buyer/cart/`                           | Create or recompute cart                         |
| POST   | `/buyer/cart/set-pickup-details/`        | Set pickup method for cooling units             |
| GET    | `/buyer/cart/delivery-contacts/`         | Get delivery contact options                     |
| POST   | `/buyer/cart/apply-coupon/`              | Apply a discount coupon                          |
| POST   | `/buyer/cart/clear-coupon/`              | Remove applied coupon                            |
| POST   | `/buyer/cart/toggle-ownership/`          | Toggle between personal and company cart         |
| POST   | `/buyer/cart/checkout-with-paystack/`    | Initiate payment via Paystack                    |

---

##### Cart Items

| Method | Endpoint                          | Description              |
|--------|-----------------------------------|--------------------------|
| POST   | `/buyer/cart/items/`              | Add produce to cart      |
| DELETE | `/buyer/cart/items/:crate_id/`    | Remove produce from cart |


---

##### Orders

| Method | Endpoint                                             | Description                            |
|--------|------------------------------------------------------|----------------------------------------|
| GET    | `/buyer/orders/`                                     | List user’s past orders                |
| GET    | `/buyer/orders/:order_id/`                           | Retrieve order details                 |
| GET    | `/buyer/orders/:order_id/delivery-contacts/`         | Delivery contact options for order     |
| POST   | `/buyer/orders/:order_id/pay-with-paystack/`         | Re-initiate payment                    |
| POST   | `/buyer/orders/:order_id/cancel/`                    | Cancel unpaid order                    |


---

##### Listings

| Method | Endpoint                        | Description                   |
|--------|---------------------------------|-------------------------------|
| GET    | `/buyer/available-listings/`    | Discover active listings nearby |

---

#### Seller Endpoints

##### Listed Crates

| Method | Endpoint                              | Description               |
|--------|---------------------------------------|---------------------------|
| GET    | `/seller/listed-crates/`              | View active listings      |
| GET    | `/seller/listed-crates/:crate_id/`    | View listing details      |
| POST   | `/seller/listed-crates/`              | Create/update listings    |
| DELETE | `/seller/listed-crates/:crate_id/`    | Delist a crate            |


##### Coupons

| Method | Endpoint                              | Description           |
|--------|---------------------------------------|-----------------------|
| GET    | `/seller/coupons/`                    | View owned coupons    |
| POST   | `/seller/coupons/`                    | Create a new coupon   |
| GET    | `/seller/coupons/:coupon_id/`         | View coupon details   |
| DELETE | `/seller/coupons/:coupon_id/`         | Revoke a coupon       |


##### Paystack Accounts

| Method | Endpoint                                     | Description           |
|--------|----------------------------------------------|-----------------------|
| GET    | `/seller/paystack-accounts/`                | View payout accounts  |
| POST   | `/seller/paystack-accounts/`                | Add a payout account  |
| GET    | `/seller/paystack-accounts/:id/`            | View account details  |


##### Orders

| Method | Endpoint                 | Description                        |
|--------|--------------------------|------------------------------------|
| GET    | `/seller/orders/`        | View all paid orders for listings  |

---

#### Company Endpoints
##### Company Orders

| Method | Endpoint                                   | Description                                 |
|--------|--------------------------------------------|---------------------------------------------|
| GET    | `/company/orders/?cooling_unit_id=...`     | List all paid orders for a given cooling unit |


##### Delivery Contacts

| Method | Endpoint                                      | Description            |
|--------|-----------------------------------------------|------------------------|
| GET    | `/company/delivery-contacts/`                 | List company contacts  |
| POST   | `/company/delivery-contacts/`                 | Create a new contact   |
| GET    | `/company/delivery-contacts/:id/`             | View contact details   |
| DELETE | `/company/delivery-contacts/:id/`             | Delete a contact       |


##### Setup

| Method | Endpoint                                                       | Description                                |
|--------|----------------------------------------------------------------|--------------------------------------------|
| POST   | `/company/setup/eligibility-check/`                            | Check Paystack setup eligibility           |
| GET    | `/company/setup/users-paystack-bank-account/?user_id=...`     | Fetch user’s Paystack account              |
| POST   | `/company/setup/users-first-paystack-bank-account/`           | Create user’s first Paystack account       |

---

#### Integrations Endpoints

##### Paystack Webhooks

| Method | Endpoint                  | Description                   |
|--------|---------------------------|-------------------------------|
| POST   | `/webhooks/paystack/`     | Receive payment events        |

##### Master Data

| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| GET    | `/data/banks/`  | List supported Paystack banks  |

---

### Scheduled Tasks

The Marketplace app defines two Celery periodic tasks:

- **`recompute_computed_fields`**: recomputes cached and derived fields for marketplace listings to ensure data such as available weight and pending fees is always accurate.

- **`expire_unpaid_orders`**: checks for orders stuck in `PAYMENT_PENDING` status and marks them as expired once their validity period has passed.

For more information on scheduled tasks please refer to [this](/core-concepts/scheduled-jobs) section.