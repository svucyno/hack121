import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gracefully handle missing Firebase configurations for UI development
    if (!auth || Object.keys(auth).length === 0) {
      console.warn("Firebase Auth bypassed due to missing config.");
      setLoading(false);
      return () => {};
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        if (user) {
          try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserData(docSnap.data());
            }
          } catch (err) {
            console.error("Firestore error:", err);
          }
        } else {
          setUserData(null);
        }
        setLoading(false);
      }, (error) => {
        console.error("Auth Exception:", error);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Failed to bind Auth State:", error);
      setLoading(false);
      return () => {};
    }
  }, []);

  const loginWithGoogle = async () => {
    if (!auth || Object.keys(auth).length === 0) return alert("Firebase not configured yet.");
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    if (!auth || Object.keys(auth).length === 0) return;
    return auth.signOut();
  };

  const value = {
    currentUser,
    userData,
    loading,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
