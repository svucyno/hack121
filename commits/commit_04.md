# Commit #4: User Onboarding & Profile Intake

**Title:** `feat: implement multi-step onboarding flow and profile persistence`

**Description:**
Captures essential user safety data and emergency contacts to personalize the experience.
- Implemented a 3-step onboarding process:
  - **Step 1: Personal Profile** - Name, Age, and Contact Number.
  - **Step 2: Emergency Hub** - Intake of up to 5 emergency contacts with phone and relationship details.
  - **Step 3: AI Safety settings** - Scream detection and shake-to-trigger sensitivity.
- Developed `userProfile.js` utility for Firestore `setDoc`/`getDoc` operations.
- Added smart routing in `Dashboard.jsx` to intercept users with incomplete profiles.
- Integrated `framer-motion` for smooth UI transitions between onboarding steps.
