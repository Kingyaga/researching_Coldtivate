# BASE Backend APIs Setup Guide

## Introduction

This documentation provides a comprehensive guide to setting up a local development environment for the BASE Main API. It includes instructions for repository setup, environment configuration, running the application, troubleshooting, and additional utilities.

---

## Getting Started

### Prerequisites
Before deploying, ensure that you have the following installed on your system:

-   **Git** – to clone the repository.
-   **Docker** and **Docker Compose** – for containerized development.
-   **Pipenv** – to manage your Python virtual environment and dependencies.

**Pipenv and Dependency Management**

Pipenv is used for managing project dependencies, ensuring consistent environments across development, testing, and production. It combines the functionality of `pip` and `virtualenv`, streamlining the process of dependency management.

* **`Pipfile` and `Pipfile.lock`:**
    * The `Pipfile` lists the project's dependencies.
    * The `Pipfile.lock` file contains the exact versions of each dependency, including sub-dependencies, creating a deterministic build. This lock file is crucial for reproducible builds, preventing issues caused by version mismatches.
* **Installation:**
    * After installing Pipenv, use `pipenv install` to create a virtual environment and install the dependencies specified in the `Pipfile.lock`.
    * If `Pipfile.lock` is absent, Pipenv will resolve the dependencies from `Pipfile` and create the lock file.

**IDE Setup and Python Language Server Protocol (LSP)**

For optimal development, it is recommended to use an Integrated Development Environment (IDE) that supports the Python Language Server Protocol (LSP).

* **Python LSP:**
    * The Python LSP provides features like code completion, error checking, go-to-definition, and refactoring, enhancing developer productivity.
    * It enables real-time analysis of Python code, providing instant feedback and improving code quality.
* **Recommended IDEs:**
    * Visual Studio Code (VS Code) with the Python extension.
    * PyCharm.
    * Sublime Text with LSP plugins.
    * Any IDE supporting LSP and having a good python language server implementation.

### Cloning the Repository
Clone the repository along with its submodules:

```sh
git clone --recurse-submodules https://gitlab.com/b1866/coldtivate/backend-monorepo
cd backend-monorepo
```

---

## Configuring the Docker Environment

Several Docker Compose files define different environment configurations:

- **`docker-compose.yml`**: Base configuration shared across all environments.
- **`docker-compose.dev.yml`**: Development-specific settings.
- **`docker-compose.prod.yml`**: Production-specific settings.
- **`docker-compose.override.yml`**: Custom override configuration that supplements or modifies the base settings.

To inspect the final configuration after merging, use:

```sh
docker-compose config
```

For more details, refer to the [Docker Compose documentation](https://docs.docker.com/compose/extends/){:target="_blank"}.

### Choosing an Environment
To set up an environment, copy the contents of the desired configuration file into `docker-compose.override.yml`.

---

## Setting Up the Application Environment

### Environment Variables
The Django application requires environment files to manage settings:

- `.env.dev` for development
- `.env.prod` for production

These files are not included in the repository. To obtain them, contact a project team member. Alternatively, use `.env.dev_example` as a template and modify it as needed.

---

## Running the Application with Docker

### Building and Starting the Application
Ensure Docker and Docker Compose are installed, then run:

```sh
docker-compose up --build
```

### Applying Database Migrations
Execute database migrations with:

```sh
docker-compose run web pipenv run python manage.py migrate
```

### Setting Up Initial Data
Create system roles:

```sh
docker-compose run web pipenv run python manage.py load_roles
```

Load initial fixture data:

```sh
docker-compose run web pipenv run python manage.py loaddata countries user crops storage operation markets
```

Create a superuser account:

```sh
docker-compose run web pipenv run python manage.py createsuperuser
```

---

## Troubleshooting

### Common Issues

- **Cloning errors**: Ensure you have the correct repository and submodule access.
- **Build failures**: Try running `docker system prune` before rebuilding. If issues persist, rebuild without using the cache:

  ```sh
  docker-compose build --no-cache
  ```
- **Runtime errors**: Ensure you are using the latest version of the repository and restart the setup process if necessary.

### Resetting the Database

**Caution:** This action will permanently delete all database data.

Stop all running containers:

```sh
docker-compose down
```

Identify the database volume:

```sh
docker volume list
```

Remove the corresponding database volume:

```sh
docker volume rm main-api_base_postgres_data
```

Follow the setup steps in the "Running the Application with Docker" section to recreate the database.

---

## Additional Utilities

### Running Tests
Execute tests inside the container:

```sh
docker-compose run -e ENV=test web pipenv run py.test --capture=no --nomigrations base
```

### Accessing the Django Shell
To open an interactive Django shell:

```sh
docker-compose run web pipenv run python manage.py shell
```

### Running Celery Tasks Manually
Execute Celery tasks inside the container:

```sh
docker-compose run celery pipenv run python manage.py shell --command="from base.apps.prediction.tasks.ml4 import prediction_calls, india_markets_data_db_insert; india_markets_data_db_insert(); prediction_calls();"
```

### Running Python Scripts in Containers
Execute a Python script inside a running container:

```sh
docker exec -it <container_id> bash
python3 <filename>
```

---

## Accessing the Application
Once the application is running, it will be available at:

- **API Base URL**: [http://localhost:8000](http://localhost:8000){:target="_blank"}
- **Django Admin Panel**: [http://localhost:8000/admin](http://localhost:8000/admin){:target="_blank"}

---

## Notes & Best Practices

- Regularly update dependencies and rebuild containers when necessary.
- Monitor container logs using:

  ```sh
  docker-compose logs -f
  ```

- Ensure `.env` files remain secure and are never committed to the repository.
- Consider setting up automated backups for database persistence.

For further assistance, refer to the official [Django](https://docs.djangoproject.com/en/stable/){:target="_blank"} and [Docker](https://docs.docker.com/){:target="_blank"} documentation.

---

## Alternative Setup for Local Debugging

The following scripts facilitate deployment and local testing of the monorepo services, independent of the platform and without requiring extensive local setup.

* `./scripts/environment-deployment-management.sh deploy`: It's typically used to set up a complete working instance.

* `./scripts/environment-deployment-management.sh compose up --build -d web celery`: This command builds and starts the `web` and `celery` services using Docker Compose. It is used for testing changes in the base application or core application components.

These scripts enable comprehensive testing of the entire monorepo service set, regardless of the target platform, and without the need for complex local configuration.
