# Backend Monorepo Structure Overview
This document provides an overview of the Coldtivate backend monorepo, outlining the core directories and services that make up the system. The backend is organized as a modular, service-oriented architecture, with separate folders for APIs, dashboards, machine learning components, and simulation tools. This structure enables clear separation of concerns, easier scalability, and improved maintainability.


```
backend-monorepo/
├── App-Impact-Reporting/          # Handles application-level impact reporting features
├── base/                          # Main Django app with all core logic and internal modules
│   ├── apps/                      # Modular Django sub-apps grouped by feature
│   │   ├── marketplace/           # Handles marketplace listings, orders, etc.
│   │   ├── operation/             # Manages check-ins, check-outs, and crate movements
│   │   ├── prediction/            # Handles forecast integration (e.g., ML4MarketIndia, ML4MarketNigeria)
│   │   ├── security/              # Security features
│   │   ├── storage/               # Manages cold storage and shelf-life data
│   │   └── user/                  # User models, roles, registration, and auth logic
│   ├── locale/                    # Translation files for internationalization (i18n)
│   ├── utils/                     # Shared utility functions and helpers
│   ├── asgi.py                    # ASGI entry point for async deployments
│   ├── celery.py                  # Celery task loader and config
│   ├── settings.py                # Django project settings
│   ├── urls.py                    # Root URL routing
│   └── wsgi.py    
├── Comsol-Digital-Twins/          # Microservice for managing COMSOL-based simulations via FUSE
│   ├── app/
│   │   ├── api/                   # HTTP API and routing for triggering or querying jobs
│   │   ├── common/                # Shared constants and utility logic
│   │   ├── fuse_integrations/     # FUSE-based COMSOL control/input/output management
│   │   └── job_queue/             # Queue system for handling and dispatching simulation jobs
│   ├── comsol/                    # COMSOL runtime files, scripts, and model binaries
│   └── supervisor/                # Supervisord configuration for runtime orchestration
├── Farmers-Dashboard-Backend/     # Backend service focused on farmer-related metrics and data access
├── gateway/                       # Caddy-based reverse proxy and gateway config
├── Impact-Dashboard-Backend/      # Service powering the visual Impact Dashboard with analytics endpoints
├── ml4-india/                     # ML service for India-based price/demand predictions
├── ml4-nigeria/                   # ML service for Nigeria-based price/demand predictions
├── scripts/                       # Utility scripts for development, deployment, or automation
│
├── .dockerignore                  # Docker ignore rules
├── .editorconfig                  # Code style consistency settings across editors
│
├── .gitattributes                 # Git attributes for handling line endings and file behaviors
├── .gitignore                     # Ignore list for git tracking
├── .gitlab-ci.yml                 # GitLab CI pipeline configuration
├── .gitmodules                    # Submodule references (if any)
│
├── docker-compose.yml                        # Base docker-compose file
├── docker-compose.development.yml            # Dev-specific service overrides
├── docker-compose.production.yml             # Production deployment configuration
├── docker-compose.staging.yml                # Staging deployment configuration
├── Dockerfile                                # Main Dockerfile used for building the base app image
│
├── exclude-list.txt               # List of files to exclude from deployment or synchronization processes
├── LICENSE                        # License file
├── manage.py                      # Entry point for Django commands (project root)
├── Pipfile                        # Pipenv dependency definition
├── Pipfile.lock                   # Pipenv dependency lockfile
└── README.md                      # Project overview and setup instructions
```

---

### Dedicated pages
- [BASE API](./main-api.md) - Overview of the BASE API, including its API endpoints, relevant implementation details, and scheduled jobs.
- [Impact Dashboard](./impact-dashboard.md) - Overview of the Impact Dashboard backend service, including its API endpoints, scheduled data aggregation via cron jobs, database dependencies, local setup instructions, and deployment debugging tools.
- [Farmers Dashboard](./farmers-dashboard.md) - Overview of the Impact Dashboard backend service, including its API endpoints, scheduled data aggregation via cron jobs, database dependencies, local setup instructions, and deployment debugging tools.
- [ML4market Nigeria](./ml4market-nigeria.md) - Overview of the ML4market Nigeria backend service, including its API endpoints, scheduled data aggregation via cron jobs, database dependencies, local setup instructions, and deployment debugging tools.
- [ML4market India](./ml4market-india.md) - Overview of the ML4market India backend service, including its API endpoints, scheduled data aggregation via cron jobs, database dependencies, local setup instructions, and deployment debugging tools.
- [App Impact Reporting](./app-impact-reporting.md) - Overview of the App Impact Reporting backend service, including its API endpoints, database dependencies, local setup instructions, and deployment debugging tools.