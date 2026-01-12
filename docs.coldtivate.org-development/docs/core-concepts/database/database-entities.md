## Primary Tables Overview
### 1. Authentication & Authorization
#### `auth_group`
Stores user groups. The system currently defines three primary groups:

1. **ServiceProvider** - refers to the Registered Employee role in the Coltivate mobile app
2. **Operator**
3. **Farmer** - refers to the Cooling User role in the Coldtivate mobile app

**Key Columns:**

- `id` (Primary Key, auto-incremented via `auth_group_id_seq`)
- `name` (varchar(150), unique)

---

#### `auth_permission`
Defines individual permissions.

**Key Columns:**

- `id` (Primary Key, auto-incremented via `auth_permission_id_seq`)
- `name` (varchar(255))
- `content_type_id` (FK → `django_content_type.id`)
- `codename` (varchar(100))

---

#### `auth_group_permissions`
Associates groups with permissions.
**Key Columns:**

- `id` (Primary Key, auto-incremented via `auth_group_permissions_id_seq`)
- `group_id` (FK → `auth_group.id`)
- `permission_id` (FK → `auth_permission.id`)

---

### 2. Metrics & Reporting
#### `company_metrics`
This table stores aggregated performance metrics for each company. It includes key performance indicators (KPIs) related to the company’s capacity, operations, user engagement, and financial performance, all of which are used to monitor and analyze the performance of cooling facilities and associated activities.

**Key Columns:**

- `report_date` (date): The date the metrics report corresponds to.
- `company_id` (int4, Primary Key): Unique identifier for the company.
- `comp_name` (varchar(255)): Name of the company.
- `comp_country` (bpchar(2)): Country code (e.g., _'NG'_, _'IN'_) indicating the company’s location.
- `comp_cap_tons` (numeric): Facility capacity measured in metric tons.
- `comp_cap_num_crates` (int4): The number of crates that can be handled.
- `cooling_unit_types` (jsonb): JSON data specifying the types of cooling units supported by the company.
- `comp_op` (int4): Total number of operators employed by the company.
- `comp_op_fem` (int4): Number of female operators.
- `comp_op_ma` (int4): Number of male operators.
- `comp_op_ot` (int4): Number of operators of other genders.
- `currency` (bpchar(3)): Currency code used for financial metrics (e.g., _'USD'_, _'NGN'_).
- `comp_reg_users` (int4): Total count of registered users.
- `comp_reg_users_ma` (int4): Count of male registered users.
- `comp_reg_users_fem` (int4): Count of female registered users.
- `comp_reg_users_ot` (int4): Count of registered users of other genders.
- `comp_beneficiaries` (numeric(8,2)): Total number of beneficiaries served.
- `comp_beneficiaries_fem` (numeric(8,2)): Number of female beneficiaries.
- `comp_beneficiaries_ma` (numeric(8,2)): Number of male beneficiaries.
- `comp_cool_users` (int4): Total number of cooling users.
- `comp_cool_users_fem` (int4): Number of female cooling users.
- `comp_cool_users_ma` (int4): Number of male cooling users.
- `comp_cool_users_ot` (int4): Number of cooling users of other genders.
- `comp_farmers` (int4): Number of farmers associated with the company.
- `comp_traders` (int4): Number of traders associated with the company.
- `comp_unspec_user_type` (int4): Count of users with unspecified types.
- `comp_crates_in` (int4): Total number of crates checked in.
- `comp_ops_in` (int4): Total number of check-in operations performed.
- `comp_kg_in` (int4): Total weight (in kilograms) of produce checked in.
- `comp_crates_out` (int4): Total number of crates checked out.
- `comp_ops_out` (int4): Total number of check-out operations performed.
- `comp_kg_out` (int4): Total weight (in kilograms) of produce checked out.
- `comp_average_room_occupancy` (numeric(8,2)): Average occupancy rate of storage rooms.
- `comp_revenue` (numeric(16,2)): Total revenue generated (in local currency).
- `comp_revenue_usd` (numeric(16,2)): Revenue converted to USD.

---

#### `cooling_unit_metrics`
This table records performance metrics for each cooling unit. It aggregates various operational, financial, and environmental data—such as capacity usage, operator activity, revenue, and CO2 metrics—to provide insights into the efficiency and usage of cooling facilities.

**Key Columns:**

- `id` (Primary Key, auto-incremented via `cooling_unit_metrics_id_seq`)
- `date` (date, NOT NULL): The date when the metrics were recorded.
- `report_date` (date, NOT NULL): The date associated with the report.
- `cooling_unit_id` (int4, NOT NULL): Identifier for the cooling unit.
- `unit_name` (text, NOT NULL): The name or label of the cooling unit.
- `is_unit_deleted` (bool, NOT NULL): Indicates if the cooling unit has been marked as deleted.
- `state` (text): The State where the cooling unit is located, if available (e.g., _'Lagos'_).
- `cool_unit_type` (text, NOT NULL): The type/category of the cooling unit (e.g., _'MARKET_STORAGE_ROOM'_, _'MOVABLE_UNIT'_, _'FARM_GATE_STORAGE_ROOM'_).
- `cap_tons` (int4, NOT NULL): Capacity of the unit in metric tons.
- `cap_num_crates` (int4, NOT NULL): Number of crates the unit can accommodate.
- `company_id` (int4, NOT NULL): Identifier for the company owning the unit.
- `comp_name` (text, NOT NULL): Name of the company.
- `comp_pricing` (text, NOT NULL): Pricing model or details related to the company.
- `currency` (text, NOT NULL): Currency code used (e.g.,  _'NGN'_, _'EUR'_) for financial figures.
- `room_op` (int4, NOT NULL): Total number of operators assigned to the unit.
- `room_op_fem` (int4, NOT NULL): Number of female operators.
- `room_op_ma` (int4, NOT NULL): Number of male operators.
- `room_op_ot` (int4, NOT NULL): Number of operators of other genders.
- `room_beneficiaries` (numeric, NOT NULL): Total beneficiaries served.
- `room_beneficiaries_fem` (numeric, NOT NULL): Female beneficiaries count.
- `room_beneficiaries_ma` (numeric, NOT NULL): Male beneficiaries count.
- `room_active_users` (int4, NOT NULL): Number of currently active users.
- `room_active_user_ids` (_int4, NOT NULL): Array of active user IDs.
- `room_active_fem` (_int4, NOT NULL): Array of active female user IDs.
- `room_active_ma` (_int4, NOT NULL): Array of active male user IDs.
- `room_active_ot` (_int4, NOT NULL): Array of active user IDs for other genders.
- `room_crates_in` (int4, NOT NULL): Count of crates checked in.
- `room_ops_in` (int4, NOT NULL): Number of check-in operations.
- `room_kg_in` (int4, NOT NULL): Total weight (in kg) of produce checked in.
- `room_crates_out` (int4, NOT NULL): Count of crates checked out.
- `room_ops_out` (int4, NOT NULL): Number of check-out operations.
- `room_kg_out` (int4, NOT NULL): Total weight (in kg) of produce checked out.
- `average_room_occupancy` (numeric, NOT NULL): Average occupancy rate of the unit's storage area.
- `room_revenue` (numeric, NOT NULL): Revenue generated, in local currency.
- `room_revenue_usd` (numeric, NOT NULL): Revenue generated, converted to USD.
- `check_in_crates_crop` (jsonb): JSON data detailing crop types and crate counts during check-in.
- `check_in_kg_crop` (jsonb): JSON data for crop weights during check-in.
- `check_out_crates_crop` (jsonb): JSON data detailing crop types and crate counts during check-out.
- `check_out_kg_crop` (jsonb): JSON data for crop weights during check-out.
- `tot_co2` (float8): Total CO2 emissions or related environmental metric.
- `co2_crops` (jsonb): JSON data providing CO2 metrics broken down by crop.

___

#### `farmer_metrics`
This table tracks the storage and movement of agricultural produce for each farmer, recording check-in and check-out metrics for cooling units. It provides insights into how farmers utilize storage facilities, including the types and quantities of stored crops.

**Key Columns:**

- `id` (Primary Key, auto-incremented via `farmer_metrics_id_seq`)
- `date` (date, NOT NULL): The date when the metrics were recorded.
- `report_date` (date, NOT NULL): The date associated with the report.
- `farmer_id` (int4, NOT NULL): Identifier for the farmer.
- `cooling_unit_id` (int4, NOT NULL): Identifier for the cooling unit used.
- `gender` (text, NOT NULL): Gender of the farmer.
- `room_crates_in` (int4, NOT NULL): Number of crates checked in by the farmer.
- `room_ops_in` (int4, NOT NULL): Number of check-in operations.
- `room_kg_in` (int4, NOT NULL): Total weight (in kg) of produce checked in.
- `room_crates_out` (int4, NOT NULL): Number of crates checked out by the farmer.
- `room_ops_out` (int4, NOT NULL): Number of check-out operations.
- `room_kg_out` (int4, NOT NULL): Total weight (in kg) of produce checked out.
- `check_in_crates_crop` (jsonb): JSON data detailing crop types and crate counts during check-in.
- `check_in_kg_crop` (jsonb): JSON data for crop weights during check-in.
- `check_out_crates_crop` (jsonb): JSON data detailing crop types and crate counts during check-out.
- `check_out_kg_crop` (jsonb): JSON data for crop weights during check-out.

---

#### `impact_metrics`
This table tracks key performance indicators related to farmer storage usage, post-storage sales, and financial outcomes. It helps analyze how cold storage impacts farmer revenue, reduces food loss, and improves market prices for stored produce. This table provides insights into the **economic impact** of cold storage, measuring revenue changes, food loss reduction, and price evolution.

**Key Columns:**

- `report_date` (date): The date associated with the impact report.
- `cooling_unit_id` (int8): Identifier for the cooling unit used.
- `unit_name` (text): Name of the cooling unit.
- `company_id` (int8): Identifier for the company associated with the cooling unit.
- `farmer_id` (int8): Identifier for the farmer using the storage.
- `crop_id` (int8): Identifier for the stored crop.
- `first_name` (varchar(255)): Farmer's first name.
- `last_name` (varchar(255)): Farmer's last name.
- `crop_name` (varchar(255)): Name of the crop stored.
- `currency` (text): Currency used for financial metrics.
- **Baseline Metrics:**

    - `baseline_quantity_total_month` (float8): Total quantity of crop available per month before storage.
    - `baseline_kg_selling_price_month` (numeric): Selling price per kg before using the storage.
    - `baseline_kg_loss_month` (float8): Estimated kg of crop lost before using the storage.
    - `baseline_perc_loss_month` (float8): Percentage of crop loss before storage.
    - `baseline_kg_sold_month` (float8): Quantity sold per month before storage.
    - `baseline_farmer_revenue_month` (float8): Revenue generated by the farmer before using the storage.

- **Monthly Storage Impact Metrics:**

    - `monthly_kg_selling_price` (float8): Selling price per kg after using the storage.
    - `monthly_kg_checkin` (float8): Total quantity of produce checked into storage.
    - `monthly_kg_loss` (int8): Total weight (kg) lost after storage.
    - `monthly_farmer_revenue` (float8): Revenue generated by the farmer after using storage.
    - `monthly_kg_selling_price_evolution` (float8): Change in price per kg after using the storage.
    - `monthly_perc_unit_selling_price_evolution` (float8): Percentage increase in unit selling price after storage.
    - `monthly_farmer_revenue_evolution` (float8): Change in revenue after using the storage.
    - `monthly_perc_farmer_revenue_evolution` (float8): Percentage increase in farmer revenue.
    - `monthly_perc_loss` (float8): Percentage of crop loss after storage.
    - `monthly_perc_foodloss_diff` (float8): Difference in food loss percentage before and after storage.
    - `monthly_perc_foodloss_evolution` (float8): Percentage change in food loss due to storage.

- **Survey & Data Collection:**

    - `latest_survey_date` (timestamptz): Timestamp of the latest farmer survey.
    - `baseline_completed_surveys_room` (int8): Number of surveys completed before storage.
    - `possible_post_checkout_survey_room` (int8): Number of surveys completed after storage.
    - `total_post_checkout_survey_unit` (int8): Total number of post-checkout surveys collected.

___

### 3. Marketplace
#### `marketplace_companydeliverycontact`
Stores contact details for company delivery of produce bought in the Marketplace.

**Key Columns:**

- `id` (Primary Key, auto-incremented via `marketplace_companydeliverycontact_id_seq`)
- `contact_name` varchar(255): The name of the contact.
- `phone` varchar(128): The phone number for the contact.
- `delivey_company_name` varchar(255): The name of the delivery company.
- `company_id` (FK → `user_company.id`)

---

#### `marketplace_coupon`
Stores information about discount coupons that can be applied to marketplace transactions. These coupons provide percentage-based discounts and can be owned by individual users or companies.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the coupon.
- `created_at` (timestamptz): Timestamp indicating when the coupon was created.
- `revoked_at` (timestamptz, Nullable): Timestamp indicating when the coupon was revoked (if applicable).
- `code` (varchar(25), Unique when active): The unique code used to redeem the coupon.
- `discount_percentage` (float8, Constraint: Must be between 0 and 1): The percentage discount applied when using the coupon.
- `created_by_user_id` (FK → `user_user.id`)
- `owned_on_behalf_of_company_id` (FK → `user_company.id`)
- `owned_by_user_id` (FK → `user_user.id`)

---

#### `marketplace_marketlistedcrate`
Tracks crates that are listed for sale in the marketplace. It records key attributes such as availability, pricing, and listing status, ensuring efficient tracking of produce inventory in the system.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the listed crate.
- `created_at` (timestamptz, Not Null): Timestamp indicating when the crate was listed in the marketplace.
- `delisted_at` (timestamptz, Nullable): Timestamp indicating when the crate was removed from the marketplace.
- `currency` (varchar(3), Not Null): Currency used for transactions related to this crate.
- `cmp_last_updated_at` (timestamptz, Nullable): Timestamp of the last update to the listed crate's data.
- `cmp_pending_in_cooling_fees` (float8, Not Null): Cooling fees that are pending for the listed crate.
- `cmp_pending_in_cooling_fees_price_per_kg` (float8, Not Null): The per kilogram cooling fee associated with the crate.
- `cmp_weight_locked_in_payment_pending_orders_in_kg` (float8, Not Null): The weight of the produce in kilograms that is reserved due to pending payment.
- `cmp_available_weight_in_kg` (float8, Not Null): The total available weight in kilograms for sale.
- `crate_id` (FK → `storage_crate.id`)

---

#### `marketplace_marketlistedcrateprice`
Stores pricing information for crates listed in the marketplace. It tracks price changes over time, allowing dynamic pricing updates.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each price entry.
- `created_at` (timestamptz, Not Null): Timestamp when the price entry was created.
- `produce_price_per_kg` (float8, Not Null): The price per kilogram for the produce in the listed crate.
- `market_listed_crate_id` (FK → `marketplace_marketlistedcrate.id`)
- `created_by_user_id` (FK → `user_user.id`)

---

#### `marketplace_order`
Stores records of orders placed within the marketplace. It tracks order details, payment status, and financial breakdowns.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each order.
- `status` (varchar(20), Not Null): The current status of the order (e.g., "pending", "completed").
- `created_at` (timestamptz, Not Null): Timestamp when the order was created.
- `currency` (varchar(3), Not Null): The currency used in the order (e.g., "USD").
- `paystack_split_code` (varchar(16)): Paystack-specific split code for payment distribution.
- `paid_at` (timestamptz): Timestamp of when the order was paid.
- `amount_paid` (float8, Not Null): Total amount paid for the order.
- `cmp_last_updated_at` (timestamptz): Timestamp of the last update to the order.
- **Financial Breakdown:**

    - `cmp_total_produce_amount` (float8, Not Null): Total value of produce in the order.
    - `cmp_total_cooling_fees_amount` (float8, Not Null): Cooling storage fees applied to the order.
    - `cmp_total_coldtivate_amount` (float8, Not Null): Fees collected by the marketplace platform.
    - `cmp_total_discount_amount` (float8, Not Null): Discounts applied to the order.
    - `cmp_total_payment_fees_amount` (float8, Not Null): Payment processing fees.
    - `cmp_total_amount` (float8, Not Null): Final order total after fees and discounts.

- `payment_references` (_varchar, Not Null): Array of payment references linked to this order.
- `status_changed_at` (timestamptz, Not Null): Timestamp when the order status last changed.
- `created_by_user_id` (FK → `user_user.id`)
- `owned_on_behalf_of_company_id` (FK → `user_company.id`)

---

#### `marketplace_ordercrateitem`
Stores information about individual crate items in a marketplace order. It tracks details of the ordered produce, including pricing, discounts, and storage-related fees.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each ordered crate item.
- `ordered_entire_crate` (bool, Not Null): Indicates whether the user ordered the entire crate.
- `ordered_produce_weight` (float8, Not Null): The weight of produce ordered (if not the entire crate).
- `frozen_crate_available_weight` (float8, Not Null): The weight of produce available at the time of order placement.
- `frozen_produce_price_per_kg` (float8, Not Null): The price per kg of produce at the time of order placement.
- `cmp_last_updated_at` (timestamptz): Timestamp of the last update to this order item.
- **Financial Breakdown:**

    - `cmp_produce_amount` (float8, Not Null): The total price of the ordered produce.
    - `cmp_cooling_fees_amount` (float8, Not Null): The cooling/storage fees for this item.
    - `cmp_discount_amount` (float8, Not Null): Discounts applied to this specific order item.
    - `cmp_total_amount` (float8, Not Null): The final total price for this order item, including fees and discounts.

- `coupon_id` (FK → `marketplace_coupon.id`)
- `market_listed_crate_id` (FK → `marketplace_marketlistedcrate.id`)
- `order_id` (FK → `marketplace_order.id`)

---

#### `marketplace_ordercrateitem_resulting_crates`
Records the resulting crates generated from an order crate item.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each resulting crate record.
- `ordercrateitem_id` (FK → `marketplace_ordercrateitem.id`)
- `crate_id` (FK → `storage_crate.id`)

---

#### `marketplace_orderpickupdetails`
Stores pickup details for orders placed in the marketplace.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each order pickup detail.
- `pickup_method` (varchar(16), Not Null): The method chosen for picking up the order (e.g., _"self-pickup"_, _"delivery"_).
- `cooling_unit_id` (FK → `storage_coolingunit.id`)
- `order_id` (FK → `marketplace_order.id`)

___

#### `marketplace_paystackaccount`

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each Paystack account.
- `created_at` (timestamptz, Not Null): Timestamp when the account was created.
- `is_default_account` (bool, Not Null): Indicates whether this is the default account for the user or company.
- `account_type` (int2, Not Null): Type of account (e.g., business, personal).
- `bank_code` (varchar(9), Not Null): The bank's unique identifier code.
- `country_code` (varchar(2), Not Null): Country of the account (e.g., _"NG"_ for Nigeria).
- `account_number` (varchar(30), Not Null): The bank account number.
- `account_name` (varchar(100), Not Null): Name associated with the bank account.
- `paystack_subaccount_code` (varchar(20), Not Null): Unique identifier assigned by Paystack for subaccounts.
- `owned_on_behalf_of_company_id` (FK → `user_company.id`)
- `created_by_user_id` (FK → `user_user.id`)
- `owned_by_user_id` (FK → `user_user.id`)

___

### 4. Operations
#### `operation_checkin`
Tracks check-in operations, recording the movement and ownership details of items entering storage.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each check-in operation.
- `movement_id` (FK → `operation_movement.id`)
- `owned_by_user_id` (FK → `user_user.id`)
- `owned_on_behalf_of_company_id` (FK → `user_company.id`)

---

#### `operation_checkout`
Records details of check-out operations, including total amounts, payments, and discounts applied.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each checkout operation.
- `cmp_total_cooling_fees_amount` (float8, Not Null): Total cooling fees applied.
- `paid` (bool, Not Null): Indicates whether the checkout has been paid.
- `cmp_total_amount` (float8, Not Null): Total amount of the checkout.
- `discount_amount` (float8, Not Null): Discount applied.
- `currency` (varchar(3)): The currency used.
- `cmp_last_updated_at` (timestamptz): Timestamp of last update.
- `payment_gateway`, `payment_method`, `payment_through` (varchar(20)): Payment details.
- `movement_id` (FK → `operation_movement.id`)

---

#### `operation_marketsurvey`
Tracks market survey data for agricultural products, including sales price, unit, and losses.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the market survey.
- `selling_place` (varchar(255), Not Null): The location where the product was sold.
- `price` (float8, Not Null): The selling price of the product.
- `currency` (varchar(3)): Currency used for the transaction.
- `selling_unit` (varchar(32)): Measurement unit of the product.
- `loss` (int4, Check `loss >= 0`): Amount of product lost before sale.
- `selling_date` (timestamptz):  Date of sale.
- `date_filled_in` (timestamptz): Date the survey was recorded.
- `kg_in_unit` (int4, Check `kg_in_unit >= 0`): Kilograms per unit.
- `reason_for_loss` (varchar(255)): Reason for any recorded loss.
- `checkout_id` (FK → `operation_checkout.id`)
- `crop_id` (FK → `storage_crop.id`)
- `market_id` (FK → `prediction_market.id`)

---

#### `operation_marketsurvey_checkout`
Links market surveys to checkout operations.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the record.
- `checkout_id` (FK → `operation_checkout.id`)
- `marketsurvey_id` (FK → `operation_marketsurvey.id`)

---

#### `operation_marketsurveypreprocessing`
Tracks pre-processing activities for market survey data before final checkout.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each preprocessing entry.
- `checkout_at` (timestamptz, Not Null): Timestamp when the checkout occurred.
- `modified_at` (timestamptz, Not Null): Timestamp of last modification.
- `is_active` (bool, Not Null): Indicates whether the entry is currently active.
- `checkout_id` (FK → `operation_checkout.id`)
- `crop_id` (FK → `storage_crop.id`)
- `farmer_id` (FK → `user_farmer.id`)
- `operator_id` (FK → `user_operator.id`)

---

#### `operation_movement`
Records the movement of agricultural products between different locations, including check-ins and checkouts.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each movement.
- `date` (timestamptz, Not Null): Timestamp when the movement occurred.
- `code` (varchar(255), Not Null): Unique movement code.
- `used_for_checkin` (bool, Not Null): Indicates if the movement was for a check-in operation.
- `initiated_for` (varchar(2), Not Null): Entity for which the movement was initiated.
- `order_id` (FK → `marketplace_order.id`)
- `operator_id` (FK → `user_operator.id`)

---

### 5. Prediction & Analytics
#### `prediction_market`
Stores market locations used for price prediction analysis.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each market.
- `name` (varchar(255), Not Null): Name of the market.
- `district` (varchar(255), Not Null): District where the market is located.
- `used_for_predictions` (bool, Not Null): Whether the market is used for predictions.
- `added_by_user` (bool, Not Null): Indicates if the market was manually added.
- `state_id` (FK → `prediction_state.id`)

---

#### `prediction_mlmarketdataindia`
Contains market data from India used for machine learning-based price predictions.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the market data entry.
- `date` (date, Not Null): Date of the recorded market data.
- `state_label`, `district_label`, `market_label`, `commodity_label` (int4, Not Null): Labels identifying market parameters.
- `arrivals_metric_tons` (float8, Not Null): Quantity of the commodity arriving at the market.
- `modal_price_rs_per_quintal` (float8, Not Null): Price of the commodity per quintal.
- `last_price_1d` to `last_price_7d` (float8, Not Null): Historical price data.
- `usd_to_inr` (float8, Not Null): USD to INR exchange rate.
- `brent_oil_price` (float8, Not Null): Price of Brent crude oil.
- `crop_id` (FK → `storage_crop.id`)
- `market_id` (FK → `prediction_market.id`)

---

#### `prediction_mlmarketdatanigeria`
Contains market data from Nigeria used for price predictions.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the market data entry.
- `date` (date, Not Null): Date of the recorded market data.
- `state_label` (int4, Not Null): Label identifying the state.
- `commodity_label` (int4, Not Null): Label identifying the commodity.
- `price` (float8, Not Null): Current price of the commodity.
- `last_price_1m` to `last_price_5m` (float8, Not Null): Historical price data for past months.
- `usd_to_ngn` (float8, Not Null): USD to Nigerian Naira exchange rate.
- `cpi` (float8, Not Null): Consumer Price Index.
- `crop_id` (FK → `storage_crop.id`)
- `state_id` (FK → `prediction_stateng.id`)

---

#### `prediction_mlpredictiondata`
Stores machine learning-based price predictions.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the prediction entry.
- `fetched_at` (timestamptz, Not Null): Timestamp when the prediction was fetched.
- `reference_date` (date, Not Null) – The reference date for the prediction.
- `price_forecast_1` to `price_forecast_14` (float8): Forecasted prices for the next 14 days.
- `only_interpolated_data` (varchar(255), Not Null): Data type indication.
- `crop_id` (FK → `storage_crop.id`)
- `market_id` (FK → `prediction_market.id`)

---

#### `prediction_mlpredictiondatang`
Stores price forecasts for Nigerian markets.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the prediction entry.
- `fetched_at` (timestamptz, Not Null): Timestamp when the prediction was fetched.
- `reference_date` (date, Not Null): The reference date for the prediction.
- `price_forecast_1` to `price_forecast_8` (float8): Forecasted prices for the next 8 days.
- `only_interpolated_data` (varchar(255), Not Null): Data type indication.
- `crop_id` (FK → `storage_crop.id`)
- `state_id` (FK → `prediction_stateng.id`)

---

#### `prediction_state`
Stores state-level data for price predictions.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each state.
- `name` (varchar(255), Not Null): Name of the state.
- `added_by_user` (bool, Not Null): Indicates if the state was manually added.
- `country_id` (FK → `user_country.id`)

---

#### `prediction_stateng`
Stores Nigerian state-level data for price predictions.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each state.
- `name` (varchar(255), Not Null): Name of the state.
- `added_by_user` (bool, Not Null): Indicates if the state was manually added.
- `country_id` (FK → `user_country.id`)

---

### 6. Storage & Infrastructure
#### `storage_coolingunit`
Stores details about cold storage units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for each cooling unit.
- `name` (varchar(255), Not Null): Name of the cooling unit.
- `capacity_in_metric_tons` (float8): Storage capacity in metric tons.
- `capacity_in_number_crates` (int4): Storage capacity in number of crates.
- `metric` (varchar(32), Not Null): Storage metric type.
- `sensor` (bool, Not Null): Indicates whether a sensor is installed.
- `cooling_unit_type` (varchar(32)): Type of cooling unit.
- `location_id` (FK → `storage_location.id`)

---

#### `storage_coolingunit_date_operator_assigned`
Tracks operators assigned to a cooling unit on specific dates.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `coolingunit_id` (FK → `storage_coolingunit.id`)
- `operatorassignedcoolingunit_id` (FK → `storage_operatorassignedcoolingunit.id`)

---

#### `storage_coolingunit_operators`
Links users (operators) to cooling units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `coolingunit_id` (FK → `storage_coolingunit.id`)
- `user_id` (FK → `user_user.id`)

---

#### `storage_coolingunitcrop`
Tracks which crops are stored in each cooling unit.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `active` (bool, Not Null): Indicates if the crop is actively stored.
- `cooling_unit_id` (FK → `storage_coolingunit.id`)
- `crop_id` (FK → `storage_crop.id`)
- `pricing_id` (FK → `storage_pricing.id`)

---

#### `storage_coolingunitpower`
Tracks power consumption and energy sources of cooling units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `power_consumption_in_mt` (float8): Power consumption in metric tons.
- `power_source_diesel_percent` (float8): Percentage of power from diesel.
- `power_source_grid_percent` (float8): Percentage of power from the grid.
- `power_source_pv_percent` (float8): Percentage of power from solar PV.
- `cooling_unit_id` (FK → `storage_coolingunit.id`)

---

#### `storage_coolingunitspecifications`
Stores specifications and sensor readings for cooling units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `value` (varchar(32), Not Null): Specification value.
- `specification_type` (varchar(32), Not Null): Type of specification.
- `datetime_stamp` (timestamptz, Not Null): Timestamp of the reading.
- `cooling_unit_id` (FK → `storage_coolingunit.id`)

---

#### `storage_crate`
Stores details of crates used for storing produce in cooling units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `weight` (float8, Not Null): Weight of the crate.
- `cooling_unit_id` (FK → `storage_coolingunit.id`)
- `produce_id` (FK → `storage_produce.id`)

---

#### `storage_cratepartialcheckout`
Tracks partial checkouts of crates from storage units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `percentage` (float8, Not Null): The percentage of the crate that was checked out.
- `weight_in_kg` (int4, Not Null): The weight (in kg) of the produce checked out.
- `cooling_fees` (float8, Not Null): Cooling fees associated with the checkout.
- `checkout_id` (FK → `operation_checkout.id`)
- `crate_id` (FK → `storage_crate.id`)

---

#### `storage_crop`
Contains information about different crops that can be stored in cooling units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `name` (varchar(255), Not Null): Name of the crop.
- `image` (varchar(100)): Image URL for the crop.
- `optimal_storage_temperature` (varchar(255)): Recommended storage temperature.
- `approximate_shelf_life` (varchar(255)): Expected shelf life duration.
- `harvested_today` (int2): Quantity harvested today.
- `harvested_yesterday` (int2): Quantity harvested yesterday.
- `harvested_day_before_yesterday` (int2): Quantity harvested two days ago.
- `harvested_before` (int2): Quantity harvested before that period.
- `size_selection_1`, `size_selection_2`, `size_selection_3` (varchar(255)): Different size classifications for the crop.
- `digital_twin_identifier` (varchar(255)): Identifier for digital tracking of the crop.
- `activation_energy_constant` (float8): Constant used in predictive models for crop quality.
- `dependent_constant` (float8): Another model-related constant.
- `crop_type_id` (FK → `storage_croptype.id`)

---

#### `storage_croptype`
Categorizes different types of crops.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `name` (varchar(255), Not Null): Name of the crop type.

---

#### `storage_location`
Stores details about different storage locations where cooling units or other assets are situated.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `name` (varchar(255)): Name of the location.
- `state` (varchar(255), Not Null): State where the location is situated.
- `city` (varchar(255), Not Null): City where the location is situated.
- `street` (varchar(255), Not Null): Street name.
- `street_number` (int4): Street number of the location.
- `zip_code` (varchar(255), Not Null): Zip code.
- `latitude` (float8, Not Null): Geographical latitude of the location.
- `longitude` (float8, Not Null): Geographical longitude of the location.
- `deleted` (bool, Not Null): Indicates if the location is deleted.
- `date_creation` (timestamptz): Date the location was created.
- `date_last_modified` (timestamptz): Date of the last modification.
- `company_id` (FK → `user_company.id`)

---

#### `storage_operatorassignedcoolingunit`
Keeps track of operators assigned to specific cooling units on a given date.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `date` (timestamptz, Not Null): Date of assignment.
- `operator_id` (FK → `user_user.id`)

---

#### `storage_pricing`
Defines different pricing structures for storage services.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier.
- `pricing_type` (varchar(32), Not Null): Type of pricing (e.g., fixed, daily, variable).
- `fixed_rate` (float8, Not Null): Fixed storage rate.
- `daily_rate` (float8, Not Null): Daily storage rate.

---

#### `storage_produce`
Stores details about produce items that have been checked into storage.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the produce entry.
- `harvest_date` (int4): Date of harvest (stored as an integer).
- `initial_grade` (int4): The quality grade assigned to the produce at check-in.
- `size` (int4): Size category of the produce.
- `cmp_checkout_completed` (bool, Not Null): Indicates if the produce has been completely checked out.
- `picture` (varchar(100)): URL or reference to an image of the produce.
- `additional_info` (varchar(255)): Additional descriptive details.
- `cmp_last_updated_at` (timestamptz): Timestamp of the last update.
- `checkin_id` (FK → `operation_checkin.id`)
- `crop_id` (FK → `storage_crop.id`)

---

#### `storage_sensorusermodel`
Stores authentication and connection details for sensors linked to cooling units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the sensor.
- `machine_id` (varchar(32)): Identifier for the sensor device.
- `username` (varchar(150)): Username used for authentication.
- `access_token` (varchar(800)): API access token for authentication.
- `cooling_unit_id` (int8): Reference to the cooling unit the sensor is linked to.
- `date_sensor_first_linked` (timestamptz): Timestamp when the sensor was first linked.
- `date_sensor_modified` (timestamptz): Timestamp when sensor details were last modified.
- `password` (bytea, Not Null): Encrypted password for the sensor.
- `type` (varchar(32)): Type of sensor device.
- `account_key` (varchar(150)): Key associated with the sensor account.
- `channel_id` (varchar(150)): Channel identifier for sensor data.
- `field` (varchar(150)): Data field name.

---

### 7. User & Company Management
#### `user_bankaccount`
Stores bank account details associated with users and companies.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the bank account.
- `account_name` (varchar(64), Not Null): Name associated with the bank account.
- `account_number` (varchar(64), Not Null): Bank account number.
- `bank_name` (varchar(64), Not Null): Name of the bank.

---

#### `user_company`
Contains details of registered companies, including financial and operational information.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the company.
- `name` (varchar(255), Not Null): Name of the company.
- `country` (varchar(2)): Country code of the company's location.
- `logo` (varchar(100)): URL or reference to the company logo.
- `currency` (varchar(3)): Currency code used by the company.
- `digital_twin` (bool, Not Null): Indicates whether the company has a digital twin model.
- `ML4_market` (bool, Not Null): Indicates participation in ML4 market predictions.
- `ML4_quality` (bool, Not Null): Indicates participation in ML4 quality assessments.
- `ML4_farmers` (bool, Not Null): Indicates participation in ML4 farmer analytics.
- `date_joined` (timestamptz): Timestamp of when the company joined.
- `flag_opt_out_from_marketplace_filter` (bool, Not Null): Indicates if the company opts out of marketplace filters.
- `bank_account_id` (FK → `user_bankaccount.id`)

---

#### `user_company_crop`
Links companies to the crops they are associated with.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the record.
- `company_id` (FK → `user_company.id`, Not Null)
- `crop_id` (FK → `storage_crop.id`, Not Null)

---

#### `user_country`
Stores country information, primarily referenced by other tables to associate data with specific countries.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the country.
- `country` (varchar(2)): Two-letter country code.

---

#### `user_country_crop`
Maps crops to specific countries, representing where each crop is cultivated.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the record.
- `country_id` (FK → `user_country.id`, Not Null)
- `crop_id` (FK → `storage_crop.id`, Not Null)

---

#### `user_farmer`
Stores information about farmers, including personal details and farming-related attributes.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the farmer.
- `birthday` (timestamptz): Farmer's date of birth.
- `parent_name` (varchar(255), Not Null): Name of the farmer's parent.
- `isUnknown` (bool, Not Null): Indicates whether the farmer's identity is unknown.
- `smartphone` (bool, Not Null): Indicates whether the farmer owns a smartphone.
- `country` (varchar(150)): Country of residence.
- `user_code` (varchar(8)): Unique code assigned to the farmer.
- `created_by_id` (FK → `user_operator.id`)
- `user_id` (FK → `user_user.id`, Not Null)

---

#### `user_farmer_companies`
Maps farmers to the companies they are associated with.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the record.
- `farmer_id` (FK → `user_farmer.id`, Not Null)
- `company_id` (FK → `user_company.id`, Not Null)

---

#### `user_farmer_cooling_units`
Tracks which cooling units are used by specific farmers.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the record.
- `farmer_id` (FK → `user_farmer.id`, Not Null)
- `coolingunit_id` (FK → `storage_coolingunit.id`, Not Null)

---

#### `user_farmersurvey`
Collects survey data from farmers about their experience and farming activities.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the survey.
- `user_type` (varchar(32)): The role or category of the farmer.
- `experience` (bool): Indicates whether the farmer has experience in agriculture.
- `experience_duration` (int2, CHECK experience_duration ≥ 0): Duration of farming experience in years.
- `date_filled_in` (timestamptz): Date when the survey was completed.
- `date_last_modified` (timestamptz): Date when the survey was last modified.
- `farmer_id` (FK → `user_farmer.id`)

---

#### `user_farmersurveycommodity`
Records detailed information about the crops farmers produce, including pricing and quantities.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the survey commodity record.
- `average_price` (int2, CHECK average_price ≥ 0): Average price per unit of the commodity.
- `unit` (varchar(32)): Unit of measurement (e.g., kg, ton).
- `average_season_in_months` (int4, CHECK average_season_in_months ≥ 0): Average length of the growing season.
- `quantity_below_market_price` (float8): Quantity sold below market price.
- `quantity_self_consumed` (float8): Quantity consumed by the farmer's household.
- `quantity_sold` (float8): Quantity sold in the market.
- `quantity_total` (float8): Total quantity harvested.
- `currency` (varchar(3)): Currency used for transactions.
- `date_filled_in` (timestamptz): Date when the survey was completed.
- `date_last_modified` (timestamptz): Date when the survey was last modified.
- `kg_in_unit` (int4, CHECK kg_in_unit ≥ 0): Weight of the commodity per unit.
- `reason_for_loss` (varchar(255)): Explanation for crop loss.
- `crop_id` (FK → `storage_crop.id`)
- `farmer_survey_id` (FK → `user_farmersurvey.id`)

---

#### `user_genericusercode`
Stores temporary user codes for various authentication and verification processes.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the code entry.
- `type` (varchar(32)): Type of code (e.g., _verification_, _reset password_).
- `code` (varchar(64), Not Null): The generated user code.
- `expiration_date` (timestamptz): Expiry date for the code.
- `user_id` (FK → `user_user.id`, Not Null)

---

#### `user_invitationuser`
Stores invitations sent to potential users for registration.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the invitation.
- `user_type` (int2, Not Null, CHECK user_type ≥ 0): The type of user being invited.
- `phone` (varchar(128), Not Null): Phone number of the invitee.
- `expiration_date` (timestamptz, Not Null): Expiry date for the invitation code.
- `code` (varchar(64), Not Null): Unique invitation code.
- `date_invitation_sent` (timestamptz): Timestamp of when the invitation was sent.
- `sender_id` (FK → `user_user.id`)

---

#### `user_invitationuser_cooling_units`
Links invited users to specific cooling units.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the record.
- `invitationuser_id` (FK → `user_invitationuser.id`, Not Null)
- `coolingunit_id` (FK → `storage_coolingunit.id`, Not Null)

---

#### `user_notification`
Tracks notifications sent to users for various events.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the notification.
- `seen` (bool, Not Null): Indicates whether the user has seen the notification.
- `date` (timestamptz, Not Null): Timestamp when the notification was created.
- `specific_id` (int4): Optional reference to a related event or entity.
- `event_type` (varchar(32), Not Null): The type of event triggering the notification.
- `user_id` (FK → `user_user.id`, Not Null)

---

#### `user_operator`
Links operators to companies.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the operator.
- `company_id` (FK → `user_company.id`, Not Null)
- `user_id` (FK → `user_user.id`, Not Null)

---

#### `user_serviceprovider`
Links service providers to companies.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the service provider.
- `company_id` (FK → `user_company.id`, Not Null)
- `user_id` (FK → `user_user.id`, Not Null)

---

#### `user_user`
Stores details of system users.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the user.
- `password` (varchar(128), Not Null): User's hashed password.
- `is_superuser` (bool, Not Null): Whether the user has superuser privileges.
- `is_staff` (bool, Not Null): Whether the user is part of the staff.
- `is_active` (bool, Not Null): Whether the user account is active.
- `date_joined` (timestamptz, Not Null): Timestamp of account creation.
- `username` (varchar(255), Not Null): Unique username.
- `first_name` (varchar(255), Not Null): User’s first name.
- `last_name` (varchar(255), Not Null): User’s last name.
- `email` (varchar(254)): Email address of the user.
- `phone` (varchar(128)): User's phone number.
- `gender` (varchar(2)): User’s gender.
- `last_login` (timestamptz): Timestamp of the last login.
- `language` (varchar(2)): Preferred language.
- `is_email_public` (bool, Not Null): Whether the user’s email is public.
- `is_phone_public` (bool, Not Null): Whether the user’s phone is public.

---

#### `user_user_groups`
Links users to groups.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the record.
- `user_id` (FK → `user_user.id`, Not Null)
- `group_id` (FK → `auth_group.id`, Not Null)

---

#### `user_user_user_permissions`
Assigns permissions to users.

**Key Columns:**

- `id` (int8, Primary Key): Unique identifier for the permission assignment.
- `user_id` (FK → `user_user.id`, Not Null)
- `permission_id` (FK → `auth_permission.id`, Not Null)

---
