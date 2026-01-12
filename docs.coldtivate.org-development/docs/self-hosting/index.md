---
hide:
  - toc
---
# Self-Hosting Documentation

Welcome to the self-hosting documentation for Coldtivate. This guide will help you set up and configure your own self-hosted instance of Coldtivate, whether using Docker or building from source. You'll also find information on dependencies, licensing, and common troubleshooting questions.

---

## Quick Start

### [Self-Host with Docker](./quick-start/backend)
Instructions on how to launch Coldtivate backend using Docker.

### [Building a Coldtivate App Release](./quick-start/frontend)
Guide for building the Coldtivate mobile application.

--- 

## CI/CD Pipelines

### [CI/CD Overview](./ci-pipelines/index.md)
Describes how GitLab CI/CD pipelines handle automated builds and deployments for the backend, mobile app, and web platform.

--- 


## Cloud Infrastructure

### [Infrastructure Overview](./cloud-infrastructure.md)
Outlines the current cloud setup, its limitations, and recommendations for migrating to a managed PostgreSQL database and improving security practices.

--- 

## QA Automation
### [End-to-End (E2E) GitLab CI pipeline](./qa-strategy.md)
Instructions and overview of the GitLab CI pipeline responsible for automated end-to-end (E2E) testing of the Android app using Maestro. The pipeline builds the APK, runs it on an emulator, sets up backend services, seeds test data, and validates critical UI flows.

--- 

## Configuration
### [Dependencies](./config.md)
See Configuration & Setup for details on external services and project dependencies.

--- 

## Licenses
### [Project License](./licenses.md)
Learn about Coldtivate’s open source license and COMSOL integration requirements.

---

For additional support, check the official repository or contact the maintainers.
