# CI/CD Pipelines
This section outlines the automated deployment workflows that power Coldtivate’s backend services, mobile applications, and web platforms. These pipelines ensure consistent, secure, and reliable releases—whether deploying code to production or testing new features in staging environments.

Each pipeline is tailored to the specific requirements of its system component, but all share common goals:

- **Automation**: Reduce manual work and human error
- **Speed**: Accelerate the delivery of features and fixes
- **Security**: Handle secrets and credentials with care
- **Environment Control**: Keep staging and production isolated and predictable

## [Backend Monorepo](./backend.md)
- Covers the CI/CD pipeline for the core backend services. Includes:
    - Docker image builds for all backend services
    - Staging and production deployment via SSH
    - Docker registry, submodule management, and secrets handling

## [Mobile App](./frontend.md)
- Explains how the React Native app is built, signed, and deployed:
    - Uses Fastlane for building and publishing Android & iOS releases
    - Pushes builds to Google Play Store and TestFlight
    - Manages encrypted secrets and custom CI images

## [Knowledge Hub](./pwa.md)
- Describes the GitLab CI/CD flow for the Knowledge Hub:
    - Builds and deploys static web app using Yarn and Wrangler
    - Deploys to Cloudflare Pages
    - Uses branch and tag triggers for staging and production

---

These CI/CD workflows are maintained to support rapid iteration, safe deployment, and developer productivity. Each system component is designed to build, test, and ship independently—while fitting into a larger release strategy.