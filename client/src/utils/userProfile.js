import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Saves or updates a user profile in Firestore.
 * @param {string} userId - The Firebase Auth UID of the user.
 * @param {object} profileData - The data to be saved.
 */
export const saveUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...profileData,
      updatedAt: new Date().toISOString(),
      onboardingComplete: true
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

/**
 * Retrieves a user profile from Firestore.
 * @param {string} userId - The Firebase Auth UID of the user.
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
