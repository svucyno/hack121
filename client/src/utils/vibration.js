/**
 * Utility function to handle device vibration (Haptic Feedback) for SOS alerts.
 * Note: Only supported on mobile devices (Android).
 */

export const vibrateSOS = () => {
  if (navigator.vibrate) {
    // SOS Pattern: Intense and repeated
    navigator.vibrate([300, 100, 300, 100, 600]);
  }
};

export const vibrateCancel = () => {
  if (navigator.vibrate) {
    // Short double-tap for cancellation confirmation
    navigator.vibrate([100, 50, 100]);
  }
};

export const vibrateTap = () => {
  if (navigator.vibrate) {
    // Single subtle haptic feedback for UI interactions
    navigator.vibrate(20);
  }
};
