import { useState, useEffect, useContext } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useAuth } from "./useAuth"; // Assuming useAuth is your auth hook that provides user info
import { app } from "../../utils/firebaseConfig";

//fetch collections for logged in user
export const useUserCollections = () => {
  const { user } = useAuth();
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    if (!user) return;

    const fetchCollections = async () => {
      try {
        const collectionsRef = collection(db, `users/${user.uid}/collections`);
        const collectionsSnapshot = await getDocs(collectionsRef);
        const collectionsData = collectionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched collections:", collectionsData);
        setCollections(collectionsData);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError(err);
      }
    };

    fetchCollections();
  }, [user, db]);

  return { collections, error };
};

//Fetch vinyls for logged in user
const useUserVinyls = () => {
  const { user } = useAuth();
  const [vinyls, setVinyls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    if (!user) return;

    const fetchUserVinyls = async () => {
      setLoading(true);
      try {
        const collectionsRef = collection(db, `users/${user.uid}/collections`);
        const collectionsSnapshot = await getDocs(collectionsRef);
        const collectionIds = collectionsSnapshot.docs.map((doc) => doc.id);

        const vinylPromises = collectionIds.map(async (collectionId) => {
          const vinylsRef = collection(
            db,
            `users/${user.uid}/collections/${collectionId}/vinyls`
          );
          const vinylsSnapshot = await getDocs(vinylsRef);
          return vinylsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        });

        const vinylsArray = await Promise.all(vinylPromises);
        const userVinyls = vinylsArray.flat();
        setVinyls(userVinyls);
      } catch (err) {
        console.error("Error fetching user vinyls:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserVinyls();
  }, [user, db]);

  return { vinyls, loading, error };
};

export { useUserVinyls };
