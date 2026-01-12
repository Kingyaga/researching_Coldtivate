Our application enforces **Role-Based Access Control (RBAC)** on both the frontend and backend to ensure that users can only access the features and perform actions that are permitted for their role. This unified RBAC strategy enhances security by preventing unauthorized access and providing granular control over user interactions.

---

### Frontend RBAC Implementation

- **Technologies Used:**
  The frontend leverages **CASL** (`@casl/ability`).

- **Key Components:**
  1. **RBAC Context (`RBACContext`):**
     Provides a `guard` function to dynamically check permissions. This is used throughout the app to determine if a user can perform a specific action.

  2. **User Roles in Mobile Application:**
     The RBAC system divides users into three distinct types:
     - **Registered Employee (EMPLOYEE)**
     - **Operator (OPERATOR)**
     - **Cooling User (COOLING_USER)**

     Using `@casl/ability`, we define specific rule sets for each user type that determine their access to features within the application.

  3. **Authorization Strategy:**
     - **UI Level:** Elements may be visible or hidden based on user role.
     - **Logic Level:** Actions and side-effects execute conditionally based on permissions.
     - **Shared Functionality:** In some cases, features are accessible to multiple roles but with role-specific restrictions.

- **How It Works:**
    - The authorization system operates at both presentation and business logic layers.
    - Rules define which features users can access based on their assigned role.
    - Beyond RBAC, the system incorporates attribute-based access control.
    - Location-based restrictions are implemented by defining rules based on the user's country of origin, limiting certain functionalities accordingly.

---

### Backend RBAC Implementation
Although initially planned to leverage Django's built-in roles and permissions system, the current backend RBAC implementation remains an open effort to be tackled. The goal is to:

**Implement Django Roles:**
  Utilize Django's authentication framework to define granular role-based permissions that align with the frontend RBAC structure.

**Planned Features:**

  1. **Role Definitions:**
    Implement a flexible mapping between frontend roles and Django permissions, accommodating cases where user types may overlap or share functionality.

  2. **Permission Decorators:**
    Create permission checks that protect different areas of the system based on user roles.

  3. **Middleware Integration:**
    Add an automated safeguard layer to ensure all user actions are properly checked for permission.

*Note: This implementation is currently tracked as a technical debt item and will be addressed in future sprints to ensure complete end-to-end RBAC enforcement.*
