Our React Native Frontend app supports **deep linking**, enabling users to navigate to specific parts of the application via external links. This enhances the user experience by allowing **seamless transitions** between web, email, and mobile app interactions.

---

### **Deep Link Schemes**
The app listens for deep links using the following URL formats:

- **App Scheme:** `coldtivate://app`
- **Web-Based Deep Links:** `https://${DEEP_LINK_DOMAIN}`

### **Supported Deep Link Routes**
The application recognizes and processes the following deep link paths:

- **User Invitations:**
  `/invite/:inviteCode/:userType/:phoneNumber`
  Redirects users to accept an invitation and complete their account setup.

- **Password Reset:**
  `/password-reset/:resetCode/:phoneNumber`
  Guides users through the password reset process.

### **Deep Link Handling & Processing**
Deep links are managed efficiently within the app using a structured event-driven approach:

1. **Initial Launch Handling:**
    - `getInitialURL()`: Retrieves the deep link if the app was opened via an external link.

2. **Real-Time Deep Link Subscription:**
    - `subscribe()`: Listens for deep link events while the app is running, ensuring users are redirected correctly.

3. **Deep Link Parsing & Processing (`DeepLinkProcessor`)**:
    - Extracts query parameters from incoming URLs.
    - Converts web-based deep links (e.g., password reset, signup invitations) into native app-compatible formats.
    - Ensures users land on the appropriate screen with the correct context.

---

### **Device-Level Challenges & Fallback Strategy**
Deep linking comes with several device-specific challenges:

- Many smartphones ask for permission when opening deep links, creating friction.
- Some mobile devices completely block links between browsers and apps.
- Permissions and deep linking behaviors vary significantly across device manufacturers and operating systems.

The app overcomes these obstacles with a smart fallback system:

- When deep links can't reach the mobile app, users automatically land on the web version.
- This seamless dual-approach (supporting both React Native navigation and web functionality) guarantees users can complete important tasks regardless of their device's limitations.

---

This implementation ensures **a smooth and reliable navigation experience** across multiple platforms, improving both **onboarding** and **account recovery** processes even when device-level restrictions are present.
