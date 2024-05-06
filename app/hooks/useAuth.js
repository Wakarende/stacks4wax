import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { app } from "../../utils/firebaseConfig"; // ensure this path is correct

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    // Set persistence to session-based
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Listener for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            // User is signed in
            setUser(firebaseUser);
          } else {
            // User is signed out
            setUser(null);
          }
          setLoading(false);
        });

        // Cleanup function
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Failed to set session persistence:", error);
      });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
