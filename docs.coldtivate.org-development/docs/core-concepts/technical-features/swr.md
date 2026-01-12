# Data Fetching with SWR

The React Native Frontend app leverages **SWR** (`stale-while-revalidate`) for efficient **data fetching, caching, and revalidation**. SWR ensures that API requests return fresh data while keeping the UI responsive and minimizing network calls.

---

## Core Concepts & Implementation

### 1. Global SWR Configuration (`StaleWhileRevalidate` Component)

This component sets up global defaults for SWR, ensuring consistent behavior across the app.

**Key Features:**

* **Automatic Revalidation:** Revalidates data on app focus and network reconnection.
* **Polling:** Uses `refreshInterval: 30s` to keep data up-to-date.
* **Deduplication:** Employs `dedupingInterval: 2s` to prevent redundant requests.
* **Error Handling & Retry Strategies:** Implements robust error handling and retry mechanisms.
* **Network Status:** Uses React Native's `NetInfo` to detect and display online/offline status.
* **In-Memory Caching:** Stores cached responses in memory for improved performance.

### 2. Fetching API Data (`useApiCall` Hook)

This custom hook provides a standardized wrapper around SWR for making API calls.

**Key Features:**

* **Configurable Options:** Supports options like `refreshInterval`, `revalidateOnFocus`, `errorRetryCount`, etc.
* **Internal Fetcher Function:** Handles API requests and errors gracefully.
* **Return Values:**
    * `data`: The latest API response.
    * `isLoading`: Indicates if the request is in progress.
    * `hasError`: Flags errors if any occur.
    * `refetch()`: Allows manual revalidation of the request.

### 3. Lazy API Calls (`useLazyApiCall` Hook)

This hook is designed for on-demand API requests, triggered by user actions.

**Key Features:**

* **`useSWRMutation`:** Executes API calls only when needed.
* **`execute` Function:** Triggers the API request.

### 4. API Cache Management (`useApiCache` Hook)

This hook provides direct access to cached API responses.

**Key Features:**

* **Cache Access:** Allows reuse of already-fetched data, preventing unnecessary API calls.

---

## Benefits of Using SWR

* **Optimized Performance:** Reduces redundant API calls with caching and deduplication.
* **Seamless User Experience:** Keeps data fresh while ensuring UI remains responsive.
* **Resilient Error Handling:** Automatically retries failed requests with configurable intervals.
* **Offline Support:** Detects network changes and gracefully manages data fetching.

---

This **SWR-based data-fetching solution** ensures a **scalable, efficient, and user-friendly** experience across the app.
