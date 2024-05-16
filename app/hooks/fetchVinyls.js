import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../utils/firebaseConfig";

export const useVinyls = (genre, searchTerm) => {
  const [vinyls, setVinyls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    console.log(`Fetching vinyls for genre: ${genre}`);
    setLoading(true);

    const fetchVinyls = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const userIds = usersSnapshot.docs.map((doc) => doc.id);

        const vinylPromises = userIds.map(async (userId) => {
          const collectionsRef = collection(db, `users/${userId}/collections`);
          const collectionsSnapshot = await getDocs(collectionsRef);
          const collectionIds = collectionsSnapshot.docs.map((doc) => doc.id);

          const vinylCollectionPromises = collectionIds.map(
            async (collectionId) => {
              const vinylsRef = collection(
                db,
                `users/${userId}/collections/${collectionId}/vinyls`
              );
              let q = vinylsRef;

              const conditions = [];
              if (genre) {
                conditions.push(where("genre", "==", genre));
              }
              if (searchTerm && searchTerm.trim() !== "") {
                // Assuming the search is case insensitive and partial matches are allowed
                conditions.push(where("title", ">=", searchTerm));
                conditions.push(where("title", "<=", searchTerm + "\uf8ff"));
              }

              if (conditions.length > 0) {
                q = query(vinylsRef, ...conditions);
              }

              const vinylsSnapshot = await getDocs(q);
              return vinylsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
            }
          );

          const vinylsArray = await Promise.all(vinylCollectionPromises);
          return vinylsArray.flat();
        });

        const allVinylsArray = await Promise.all(vinylPromises);
        const allVinyls = allVinylsArray.flat();
        setVinyls(allVinyls);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchVinyls();
  }, [db, genre, searchTerm]);

  return { vinyls, loading, error };
};
