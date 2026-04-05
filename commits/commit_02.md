# Commit #2: Core UI Layout & Design System

**Title:** `feat: implement global design system, mobile-first navigation, and layout transitions`

**Description:**
Elevated the interface to a premium, polished application standard:
- Configured a comprehensive Tailwind CSS design system with custom brand colors (Rose, Indigo, Slate) and glassmorphism utilities.
- Integrated `lucide-react` for consistent, crisp iconography across all views.
- Built a mobile-first `BottomNav` featuring a prominent SOS action and active state indicators using `framer-motion`.
- Implemented a global `AppLayout` wrapper that conditionally manages Top Navigation and Bottom Tab Bar visibility based on the active route.
- Integrated seamless page transitions (`framer-motion` AnimatePresence) between all 16 routing states.
- Replaced skeleton implementations of Dashboard, MapPage, and FakeCall with high-fidelity, interactive placeholders.
