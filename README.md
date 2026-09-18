# WaterServe Web Portal

WaterServe is a static front-end prototype for Calbayog City Water District (CCWD). It provides a focused customer portal for read-only meter and billing inquiry plus incident reporting.

## Included

- Account-number validation through a sign-in/create-account modal.
- Dashboard overview with latest reading, statement balance, active reports, and synchronization status.
- Read-only meter and billing history table.
- Incident form with optional photo evidence and client-side tracking code generation.
- Responsive sidebar navigation with mobile menu behavior.

## Scope boundary

This project intentionally has no payment processing, transaction creation, e-wallet integration, or payment gateway. Billing values are display-only synchronized records. The authentication and report submission flows are front-end demonstrations and should be connected to CCWD services before production deployment.

## Run locally

Open `index.html` in a browser or serve the folder with any static web server. The demo account number is `12-3456-789`; any password is accepted by the prototype.