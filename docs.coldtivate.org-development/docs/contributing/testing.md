# Testing

## Overview

The Coldtivate mobile application uses [Maestro](https://maestro.mobile.dev/){:target="_blank"} as a test runner to perform end-to-end testing on both Android and iOS platforms. Maestro allows us to define and execute automated tests to ensure the stability and functionality of the app across different use cases. This process is a crucial part of our [**Automated QA**](../self-hosting/qa-strategy.md) strategy.

This document outlines our testing strategy, including the folder structure, test execution commands, and specific flows.

---

## Testing Framework: Maestro

Maestro is used to run end-to-end tests across Coldtivate's Android and iOS builds. The tests are defined in YAML files that outline the different flows within the application. These flows are executed through Maestro's command-line interface.

### Folder Structure

All test flows are organized under the `.maestro` folder located in the root of the project. Here's a breakdown of the folder structure:

```
.maestro
├── auth
├── management
├── common
│   ├── subflows
│   └── utils
└── scripts
```

- **auth**: contains test flows related to authentication, such as sign-up, log-in, and password reset.
- **management**: includes tests for app management features like comapny details, cooling units or account invitations.
- **common**:
    - **subflows**: reusable test steps that can be included in other flows.
    - **utils**: utility files for testing (e.g., test suite teardown, app launch arguments).
- **scripts**: contains any helper scripts that automate test executions or support the testing infrastructure.

### Test Execution

To run all the tests defined in `.maestro`, use the following command:
```sh
maestro test .maestro
```
This command will execute all the test flows across both Android and/or iOS devices, ensuring the application behaves correctly in different environments.

### Running a Specific Test Flow

To run a specific test flow, navigate to the appropriate YAML file and execute the following command:
```sh
maestro test .maestro/auth/re-sign-up.yml
```
This will run the **re-sign-up** test flow from the **auth** folder.

### Using Maestro Studio

Maestro Studio is a powerful GUI tool that simplifies test flow creation and maintenance. Instead of writing test flows directly in YAML, you can:

1. Record test flows by interacting with your app directly.
2. Edit recorded flows through the visual interface.
3. Export flows as YAML files for version control.

To launch Maestro Studio, use:
```sh
maestro studio
```
Maestro Studio provides a user-friendly visual editor for test flows. You can create and modify tests by clicking through the interface without writing code, making it accessible for new users while helping all team members work more efficiently.

## Best Practices

1. **Modularize tests**: use the `common/subflows` and `common/utils` directories to store reusable steps or helper functions to avoid duplicating logic.
2. **Use descriptive names**: give each test flow a clear and concise name that describes its purpose.
3. **Test on both platforms**: always ensure that your test flows are compatible with both Android and iOS to guarantee cross-platform stability.
4. **Version control**: since this is an open-source project, make sure to regularly commit test flow changes to the repository for version tracking and collaboration.

---

## Contributing

We welcome contributions to the end-to-end testing suite. To contribute, please fork the repository and follow these steps:

1. Add your test flow to the appropriate folder (e.g., `auth`, `management`).
2. Ensure that your flow is clearly named and contains proper assertions.
3. Submit a pull request with a description of your changes and the tests you've added.

---

## Test Coverage Status

### Password Recovery Flows

| Flow Name | Status |
|---|---|
| Request password recovery | ❌ Missing |
| Reset password  | ❌ Missing |

### Registered Employee (RE) Flows

| Flow Name | Status |
|---|---|
| RE sign up | ✅ Added |
| RE sign in | ✅ Added |
| RE add new location | ✅ Added |
| RE invite operator | ✅ Added |
| RE add new cooling unit | ✅ Added |
| RE Seller Settings - add payout options | ❌ Missing |
| RE Seller Settings - add discount coupons | ❌ Missing |
| RE Management - update company details | ❌ Missing |
| RE Management - invite registered employee | ❌ Missing |
| RE Management - add company payout options | ❌ Missing |
| RE Management - add company delivery contacts | ❌ Missing |
| RE Management - add company discount coupons | ❌ Missing |
| RE Marketplace - buy crate for himself | ❌ Missing |
| RE Marketplace - buy crate on behalf of company | ❌ Missing |
| RE History - check marketplace movement | ❌ Missing |

### Operator (OP) Flows

| Flow Name | Status |
|---|---|
| OP login | ✅ Added |
| OP check in produces | ✅ Added |
| OP check out produces | ✅ Added |
| OP Seller Settings - update contact sharing settings | ❌ Missing |
| OP Management - invite cooling user | ❌ Missing |
| OP Dashboard - set crate for sale | ❌ Missing |
| OP Marketplace - buy crate for himself | ❌ Missing |
| OP Marketplace - buy crate on behalf of company | ❌ Missing |
| OP History - check marketplace movement | ❌ Missing |

### Cooling User (CU) Flows

| Flow Name | Status |
|---|---|
| Cooling user sign up | ✅ Added |
| Cooling user sign in | ✅ Added |
| Cooling user Details - update personal details | ❌ Missing |
| Cooling user Details - update localization preferences | ❌ Missing |
| Cooling user Details - fill in a cooling user survey | ❌ Missing |
| Cooling user Seller Settings - revoke discount coupons | ❌ Missing |
| Cooling user Dashboard - set crate for sale | ❌ Missing |
| Cooling user Marketplace - buy crate | ❌ Missing |
| Cooling user History - check marketplace movement | ❌ Missing |
