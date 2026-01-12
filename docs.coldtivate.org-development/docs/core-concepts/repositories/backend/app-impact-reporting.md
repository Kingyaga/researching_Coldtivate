# App Impact Reporting

## 1. Introduction

The App Impact Reporting (AIR) service is a module designed to generate and provide utilization and impact reports for Coldtivate companies. It connects to the primary Coldtivate database, fetches operational data, and processes it into downloadable Excel reports. The Excel reports can be downloaded from the Usage Analysis, Revenue Analysis, and Cooling Users pages in the Management menu of the Coldtivate app (these options are available to users logged in as Registered Employees and Operators).

The service is built with Python and Flask, and it is containerized using Docker for consistent deployment and execution. It exposes several API endpoints that allow users to request specific reports based on company ID and other filtering criteria.

## 2. Setup and Local Deployment

These instructions guide you through deploying the service on a local machine for development or testing.

### Step 1: Clone the Repository

```sh
git clone https://gitlab.com/b1866/coldtivate/backend-monorepo.git
cd backend-monorepo/App-Impact-Reporting
```

### Step 2: Set Up Environment Variables

The application requires database credentials to connect a database (in case of Coldtivate production DB, a PostgreSQL database on Azure). You will need to get these credentials and place them in a `.env` file in the root of the project directory.

Create a file named `.env` with the following content:

```
DB_HOST=XXX.postgres.database.azure.com
DB_PORT=5432
DB_NAME=XXX
DB_USER=XXX
DB_PASSWORD=XXX
```

### Step 3: Run with Docker Compose

The simplest way to run the service is with Docker Compose, which uses the `compose.yaml` and `Dockerfile` to build and run the container (make sure to have [Docker Desktop](https://www.docker.com/get-started) installed and running).

From the root of the project directory, run:

```sh
docker-compose up
```

This will build the Docker image, start the container, and the service will be accessible on `http://localhost:5000`.

### Alternative Method: Local Flask Execution

You can also run the application directly with Flask without Docker.

1.  **Create a virtual environment and install dependencies:**

    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

2.  **Set the Flask app environment variable:**

    ```sh
    export FLASK_APP='./air/main.py' # On Windows use `set FLASK_APP=./air/main.py`
    ```

3.  **Run the Flask development server:**

    ```sh
    flask run --debug
    ```

## 3\. API Documentation

The service provides three main endpoints for generating reports. All reports are returned as `.xlsx` files.

### Endpoint: `/company/<company_id>/cusers`

  * **Method**: `GET`
  * **Purpose**: Fetches a list of cooling users for a specific company, along with their check-in statistics.
  * **Path Parameter**:
      * `company_id` (integer): The ID of the company.
  * **Query Parameter**:
      * `only_active` (boolean, optional): If `false`, includes deleted users. Defaults to `true`.
  * **Example**: `http://localhost:5000/company/123/cusers?only_active=false`

### Endpoint: `/company/<company_id>/usage_analysis`

  * **Method**: `GET`
  * **Purpose**: Generates a detailed report of all crates checked in for a company.
  * **Path Parameter**:
      * `company_id` (integer): The ID of the company.
  * **Query Parameters**:
      * `cooling_unit_ids` (string, optional): Comma-separated list of cooling unit IDs to filter by (e.g., `1,5,12`).
      * `start_date` (string, optional): Filters for check-ins on or after this date (format: `YYYY-MM-DD`).
      * `end_date` (string, optional): Filters for check-ins on or before this date (format: `YYYY-MM-DD`).
  * **Example**: `http://localhost:5000/company/123/usage_analysis?start_date=2023-01-01`

### Endpoint: `/company/<company_id>/revenue_analysis`

  * **Method**: `GET`
  * **Purpose**: Generates a report on revenue from all checked-out crates.
  * **Path Parameter**:
      * `company_id` (integer): The ID of the company.
  * **Query Parameters**:
      * `cooling_unit_ids` (string, optional): Comma-separated list of cooling unit IDs to filter by.
      * `start_date` (string, optional): Filters for check-outs on or after this date (format: `YYYY-MM-DD`).
      * `end_date` (string, optional): Filters for check-outs on or before this date (format: `YYYY-MM-DD`).
  * **Example**: `http://localhost:5000/company/123/revenue_analysis?cooling_unit_ids=4,8`

## 4\. Running Tests

Unit tests are located in the `tests/` directory. To run them, execute the following command from the root of the project:

```sh
python -m unittest discover tests
```