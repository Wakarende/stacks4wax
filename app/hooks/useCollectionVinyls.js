import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useAuth } from "./useAuth";
import { app } from "../../utils/firebaseConfig";

const useCollectionVinyls = (collectionId) => {
  const { user } = useAuth();
  const [vinyls, setVinyls] = useState([]);
  const [error, setError] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    if (!user || !collectionId) return;

    const fetchVinyls = async () => {
      try {
        const vinylsRef = collection(
          db,
          `users/${user.uid}/collections/${collectionId}/vinyls`
        );
        const vinylsSnapshot = await getDocs(vinylsRef);
        const vinylsData = vinylsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched vinyls:", vinylsData);
        setVinyls(vinylsData);
      } catch (err) {
        console.error("Error fetching vinyls:", err);
        setError(err);
      }
    };

    fetchVinyls();
  }, [user, collectionId, db]);

  return { vinyls, error };
};

export { useCollectionVinyls };
