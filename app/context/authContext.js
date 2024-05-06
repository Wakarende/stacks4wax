// import { createContext, useContext, useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "../../utils/firebaseConfig";

// export const AuthContext = createContext({
//   user: null,
//   loading: true,
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const auth = getAuth(app);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log("Auth state changed:", currentUser);

//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [auth]);

//   console.log("current user:", user, "Loading:", loading);
//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
