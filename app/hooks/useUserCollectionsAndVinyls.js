import { useState, useEffect, useContext } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "./useAuth"; // Assuming useAuth is your auth hook that provides user info
import { app } from "../../utils/firebaseConfig";

export const useUserCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const db = getFirestore(app);

  useEffect(() => {
    if (user) {
      console.log("Fetching collections for user:", user.uid);
      setLoading(true);
      const collectionsRef = collection(db, "collections");
      const userRef = doc(db, "users", user.uid);
      const q = query(collectionsRef, where("user_id", "==", userRef));

      getDocs(q)
        .then((querySnapshot) => {
          console.log("Documents fetched:", querySnapshot.docs.length);
          const userCollections = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCollections(userCollections);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user collections:", err);
          setError(err);
          setLoading(false);
        });
    } else {
      console.log("No user logged in or user data not available yet.");
    }
  }, [user, db]);

  return { collections, loading, error };
};

//Fetch vinyls for user
export const useUserVinyls = () => {
  const [vinyls, setVinyls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const db = getFirestore(app);

  useEffect(() => {
    if (user) {
      console.log("Fetching vinyls for user:", user.uid);
      setLoading(true);
      const vinylsRef = collection(db, "vinyls");
      const userRef = doc(db, "users", user.uid);
      const q = query(vinylsRef, where("user_id", "==", userRef));

      getDocs(q)
        .then((querySnapshot) => {
          console.log("Vinyls fetched:", querySnapshot.docs.length);
          const userVinyls = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setVinyls(userVinyls);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user vinyls:", err);
          setError(err);
          setLoading(false);
        });
    } else {
      console.log("No user logged in or user data not available yet.");
    }
  }, [user, db]);

  return { vinyls, loading, error };
};
