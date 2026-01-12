# Configuration
This document provides an overview of the key dependencies and external services used in the platform.

## Dependencies
Setup for external services:

- [Twilio](https://www.twilio.com/en-us?utm_source=google&utm_medium=cpc&utm_term=twilio&utm_campaign=G_S_EMEA_Brand_T2&cq_plac=&cq_net=g&cq_pos=&cq_med=&cq_plt=gp&gad_source=1&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkWvOqIbZOsOjpkbYkPvJhZOBPBZCGbY8_5ANuVbbtp7SPbhPginNK4aAtQmEALw_wcB) - Used to send SMS messages containing important notifications. These include alerts when produce is nearing the end of its shelf life, when a product is sold on the marketplace, or when inviting users to join the app.
- [Sentry](https://sentry.io/welcome/) - Used for real-time error tracking and performance monitoring across both frontend and backend. Sentry helps developers quickly identify, triage, and resolve issues in production.
- [Paystack](https://paystack.com/) - Integrated as the payment gateway for handling financial transactions. It enables secure payment processing for marketplace sales and other financial operations within the platform.
- [Sendgrid](https://sendgrid.com/en-us) - Used for sending transactional emails, such as operator notifications and invitations to join the app. It ensures reliable email delivery and provides analytics for engagement tracking.
