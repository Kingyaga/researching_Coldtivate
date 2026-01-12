# Scheduled Tasks in Backend API

In our backend API, we rely on scheduled tasks (commonly referred to as cron jobs) to automate recurring operations. These tasks are executed by **Celery**, a distributed task queue, and are often scheduled via periodic triggers (e.g. every minute, hour, or day) to keep the system clean, updated, and responsive to user interactions.

Below is a list of the key cron jobs, along with brief descriptions of what each one does.

---

## List of Scheduled Tasks

### `recompute_computed_fields` (Marketplace)
**Purpose**: Recomputes marketplace listing data (like available weight or pricing) when the listing hasn't been updated today. Ensures fresh computed values for buyers and sellers.

**Frequency**: Daily at 1 AM (only processes stale or uncomputed records)


---

### `expire_unpaid_orders`
**Purpose**: Identifies orders in `PAYMENT_PENDING` status older than 1 hour and marks them as `PAYMENT_EXPIRED`. It also triggers recomputation of the affected order data, releasing the locked inventory (weight) in the market.

**Frequency**: Every minute


---

### `recompute_computed_fields` (Storage)
**Purpose**: Recomputes crate- and produce-level computed fields if they have not been updated since the beginning of the current day.

**Frequency**: Daily at 1 AM (only processes stale or uncomputed records)


---

### `recompute_digital_twin`
**Purpose**: Recalculates the digital twin shelf-life prediction for crates under active monitoring. Skips crates that were already updated in the past 5.5 hours. Sends an email alert in case of processing failures.

**Frequency**: Every 12 hours


---

### `update_temperature`
**Purpose**: Fetches temperature data from third-party sensors (e.g., Ubibot, Figorr, Victron, Ecozen) for cold rooms and stores the updates.

**Frequency**: Every 4 hours


---

### `time_to_pick_up_notifications`
**Purpose**: Sends notifications (and SMS for non-smartphone users) when crates in storage have less than 2 days of shelf life remaining. Also removes the notifications if crates are no longer checked in.

**Frequency**: Every 12 hours


---

### `market_survey_checks`
**Purpose**: 
- Marks outdated `MarketsurveyPreprocessing` entries as inactive
- Creates new entries for recent checkouts
- Sends notifications to farmers and operators
- Deletes market survey notifications older than 14 days

**Frequency**: Weekly on Mondays at 1 AM


---

### `prediction_calls`
**Purpose**: Calls the ML prediction API for supported commodities in India. Stores 14-day forecast results in the database for each market-commodity combination.

**Frequency**: Daily at 3:30 AM

---

### `prediction_calls_ng`
**Purpose**: Calls the Nigerian prediction API for selected commodities across supported states. Stores 8-week forecasts and flags interpolated data if real data is unavailable.

**Frequency**: Daily at 2:30 AM

---

## Timezone Notes
> **Important**: Celery is currently not configured with an explicit timezone (`CELERY_TIMEZONE` is not set). As a result, all scheduled tasks run according to the local system timezone of the environment where the Celery worker and beat are running.

This means task timing (e.g., “Daily at 1 AM”) may vary depending on the server’s configured timezone. If you’re deploying across multiple environments or regions, be aware that scheduled times could shift unexpectedly.

### How to Set a Timezone (Optional Configuration)
To enforce a consistent timezone for all scheduled tasks, you can configure the following in your Celery settings:

```python
CELERY_ENABLE_UTC = True
CELERY_TIMEZONE = "UTC"  # Or your preferred timezone, e.g. "Africa/Lagos"
```

- With `CELERY_ENABLE_UTC = True`, Celery uses UTC internally but interprets crontab schedules in the timezone you specify.

- You can use any valid timezone string supported by Python’s pytz library.