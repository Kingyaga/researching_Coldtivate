# ML4Market India 

## 1. Introduction

The ML4Market India service is a standalone application designed to forecast the daily prices of various food commodities across numerous markets in India, based on a Machine Learning (ML) model which is regularly retrained. It operates independently of the main Coldtivate backend but provides a prediction API that is consumed by other services. Historical and predicted data are shown on Coldtivate Crop Prices tab when the user's country is India. 

The system is architecturally divided into two modules:

* **Scraping Module**: This container runs a Flask web server that exposes the prediction API. It also contains a scheduled task (cron job) that scrapes the latest commodity price data from online sources like `agmarknet.gov.in` and Yahoo Finance.
* **Retraining Module**: This container runs a scheduled task that retrains the machine learning model using the fresh data acquired by the Scraping Module. This ensures the model's predictions remain accurate and relevant.

Both the Scraping and Retraining containers are mounted to a shared data volume on the host machine to allow seamless data access between them.

## 2. Setup and Local Deployment

These instructions guide you through deploying the service on a local machine for development or testing.


### Step 1: Clone the Repository

Open your terminal, navigate to your development directory, and clone the repository:

```sh
git clone https://gitlab.com/b1866/coldtivate/backend-monorepo.git
cd backend-monorepo/ML4-Nigeria
```

### Step 2: Build the Docker Image

To build the Docker image make sure to have [Docker Desktop](https://www.docker.com/get-started) installed and running, and run: 

  ```bash
  docker build -t scraping-module-india .
  ```

**Note for contributors**: The retraining pipeline is currently not run in the main Dockerfile. Inside the Retraining module, there is a separate Dockerfile, whose image can be run with: 

  ```sh
  cd Retraining-module
  docker build -t retraining-module-india .
  cd ..
  ```
We welcome contributions to merge the two services to ensure the Retraining module is correctly integrated in the main Dockerfile.


### Step 3: Run the Docker Containers

Start the containers, ensuring they are connected to the same local directory, which will serve as the shared data volume. The project's `data` directory is used for this purpose.

  * **Start the Scraping Module Container:**
    This command starts the prediction API server, mapping port 5000 of the container to port 5000 on your machine.

    ```sh
    docker run -d -p 5000:5000 \
      --name scraping_container_india \
      -v "$(pwd)/data":/app/data \
      scraping-module-india
    ```

  * **Start the Retraining Module Container:**
    This command starts the retraining service in the background.

    ```sh
    docker run -d \
      --name retraining_container_india \
      -v "$(pwd)/data":/app/data \
      retraining-module-india
    ```

### Step 4: Verify the Installation

You can verify that the prediction API is running by sending a `curl` request from your terminal:

```sh
curl -v -X POST -H "Content-Type: application/json" \
-d '{"state":"Himachal Pradesh","district":"Bilaspur","market":"Bilaspur","commodity":"Tomato","Available_values":"1"}' \
http://localhost:5000/prediction
```

If successful, you should receive a JSON response with the price forecast.

## 3\. Maintenance and Troubleshooting

### Docker Port Conflicts

If port 5000 is already in use on the host machine, the scraping container will fail to start. To fix this, map the container to a different host port (e.g., `8080`) by modifying the `-p` flag in the `docker run` command: `-p 8080:5000`.

### Chromedriver Versioning

The Selenium scraper depends on a specific version of `chromedriver` that must match the version of the Chrome browser installed in the Docker image. If the scraper fails after an update, you will need to download the correct `chromedriver` version, replace the old one in the `Scraping-module` directory, and rebuild the image. 

## 4\. Additional Resources

  * **Research Paper**: A draft of the research paper explaining the details of the ML model is currently under review.

  * **ML4Market Nigeria Documentation**: The documentation for the parallel Nigeria project can be found here: [ML4market Nigeria](./ml4market-nigeria.md).