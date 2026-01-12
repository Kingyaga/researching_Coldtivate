# Self-Host with Docker

This guide explains how to self-host and develop locally for the backend (BE) using our Docker-based environment deployment management scripts. Follow these steps to deploy and run your backend environment either for development purposes on your local machine or for self-hosting in a production environment.

---

### Prerequisites
Before deploying, ensure that you have the following installed on your system:

-   **Git** – to clone the repository.
-   **Docker** and **Docker Compose** – for containerized development.
-   **Pipenv** – to manage your Python virtual environment and dependencies.

---

### Project Setup
#### 1. **Clone the Repository**
```bash
git clone https://<insert-tbd-monorepo-clone-url>
cd monorepo
```

---

#### 2. **Set Up Environment Files**
Ensure you have the necessary environment configuration by creating the appropriate environment file:

- For development, use: `.env.development`.

- For production/self-hosting, use: `.env.production`.

##### Example `.env.development` (Development Only)
```env
# Environment
ENVIRONMENT=development

##
# DJANGO
##
DEBUG=True
# Use a dummy secret key for staging.
SECRET_KEY=<dummy-secret-key>
DATA_UPLOAD_MAX_NUMBER_FIELDS=500000

##
# PostgreSQL
##
# Use your staging database credentials. Do not mix with production values.
DB_NAME=base
DB_USERNAME=base
DB_PASSWORD=base
DB_HOST=db
DB_PORT=5432

##
# Redis
##
# Use staging settings. If authentication is not required, you can leave REDIS_PASSWORD empty.
REDIS_HOST=valkey
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DATABASE=1

##
# Twilio (Test Credentials)
##
TWILIO_SID=<twilio-sid>
SERVICE_SID=<service-sid>
TWILIO_AUTH=<twilio-auth>
TWILIO_NUMBER=+00000000000

##
# Email (SendGrid)
##
# For staging, use a dummy API key if you are not sending real emails.
SENDGRID_API_KEY=<dummy-api-key>

##
# Paystack
##
PAYSTACK_SECRET_KEY=<paystack-secret>
PAYSTACK_PUBLIC_KEY=<paystack-public>

##
# COMSOL
##
COMSOL_CALLBACK_KEY=<comsol-callback-key>

##
# reCAPTCHA
##
RECAPTCHA_ENABLED=true
RECAPTCHA_SECRET_KEY=<recaptcha-secret-key>
RECAPTCHA_SITE_KEY=<recaptcha-site-key>
```

##### Example `.env.production` (Self-Hosting)

```env
# Environment
ENVIRONMENT=production

##
# DJANGO
##
DEBUG=False
SECRET_KEY=<secure-secret-key>
DATA_UPLOAD_MAX_NUMBER_FIELDS=500000

##
# PostgreSQL (Production)
##
# IMPORTANT: The database container does not start automatically in production.
DB_NAME=base
DB_USERNAME=base
DB_PASSWORD=<strong-password>
DB_HOST=<external-db-host>
DB_PORT=5432

##
# Redis (Production)
##
REDIS_HOST=valkey
REDIS_PORT=6379
REDIS_PASSWORD=<redis-password>
REDIS_DATABASE=1

##
# Twilio (Production Credentials)
##
TWILIO_SID=<twilio-sid>
SERVICE_SID=<service-sid>
TWILIO_AUTH=<twilio-auth>
TWILIO_NUMBER=<twilio-number>

##
# Email (SendGrid)
##
SENDGRID_API_KEY=<sendgrid-api-key>

##
# Paystack
##
PAYSTACK_SECRET_KEY=<paystack-secret>
PAYSTACK_PUBLIC_KEY=<paystack-public>

##
# COMSOL
##
COMSOL_CALLBACK_KEY=<comsol-callback-key>

##
# reCAPTCHA
##
RECAPTCHA_ENABLED=true
RECAPTCHA_SECRET_KEY=<recaptcha-secret-key>
RECAPTCHA_SITE_KEY=<recaptcha-site-key>
```

---

#### 3. Configure Pyright
> _**Note**: Pyright is a static type checker for development environments only and is not required in production._

If you want to use [Pyright](https://github.com/microsoft/pyright) for type checking, you can run the provided script to set up your `pyrightconfig.json`:

```bash
./scripts/setup-pyright.sh
```

---

#### 4. **Deploy**

Our deployment management scripts streamline the process of building and running the backend in a Docker environment. Depending on your environment and needs, you can choose between the following options:

##### Development Deployment (with or without seed data)

```bash
./scripts/environment-deployment-management.sh deploy
```

This will:

- Build and pull all necessary images.
- Start the PostgreSQL container.
- Wait for the database to be ready.
- Create a separate seed database if it doesn’t exist, using `seed_development_db.sql`.
- Check whether the main database (`base`) is empty:
    - If empty, it suggests commands to recreate it using the seed database.
    - If not empty, it leaves it untouched.
- Run all necessary migrations.
- Load roles and other required configurations.
- Generate analytical views on both the Farmer and Impact dashboards.
- Start the remaining services.

##### Production (Self-Hosting) Deployment
> _**Important**: In production, the database container will not be started automatically. Ensure your production database is pre-configured and accessible._

```bash
ENVIRONMENT=production ./scripts/environment-deployment-management.sh deploy
```

This will:

- Build and pull Docker images.
- Run migrations and necessary configuration tasks.
- Start services except the database (which must already be running externally).
---

#### Summarizing, what does running these scripts do?
##### In Development:
- Starts all containers, including PostgreSQL.
- Seeds a separate seed database if it doesn't exist.
- Provides clear instructions if you want to recreate the main database from the seed:

```sql
DROP DATABASE IF EXISTS "base";
CREATE DATABASE "base" TEMPLATE seed;
```
##### In Production

- Assumes your external DB is running.
- Runs migrations, roles setup, and creates necessary views.
- Starts backend services only.


---

#### Post-Deployment

After a successful deployment, you should see a confirmation message:

```bash
The environment was _coldtivated_ with great success! 👀
```

---

### Troubleshooting

#### Missing Environment Files
If the script exits with an error about missing dotenv files, verify that the corresponding file exist in the project root and is correctly named (e.g., `.env.development` or `.env.production`).

#### Container Issues
Use `docker ps` and `docker logs <container_id>` to inspect running containers for troubleshooting.

#### Permission Issues
If you encounter permission issues when trying to run scripts, ensure they have execute permissions.
```bash
chmod +x <filename>
```

> _Windows Users: Use Git Bash or WSL. For PowerShell:_
> ```bash
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
> ```

#### Re-deploying
If you make changes to your `Dockerfiles` or configuration, re-run the chosen deployment script to rebuild and redeploy your environment.

---

### Key Considerations
- **Development**: All services run locally, including the database.

- **Production (Self-Hosting)**: External database management required.

- **Security**: Implement SSL and secure credentials in production.

- **Monitoring**: Use monitoring tools for uptime and performance.

- **Backups**: Regularly back up production databases.

- **Updates**: Keep Docker images and dependencies up-to-date.

---

With these steps, you now have a comprehensive environment setup for both local development and self-hosting in production, fully customizable and under your control.
