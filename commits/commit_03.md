# Commit #3: Auth Architecture & Session Security

**Title:** `feat: implement Firebase Authentication architecture and Protected Routes`

**Description:**
Established a robust security layer for the application:
- Integrated Firebase Google Authentication with the `AuthContext` provider.
- Developed a `ProtectedRoute` component to intercept unauthenticated access to sensitive views.
- Redesigned the `Login` page with a premium, mobile-first interface featuring `framer-motion` entrance animations.
- Refactored `App.jsx` to enforce session-based routing across all 12+ emergency and data-sensitive routes.
- Scaffolded the environment variable structure (`.env`) for seamless Firebase multi-environment configuration.
