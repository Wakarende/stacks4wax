import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  join,
} from "firebase/firestore";
import { getDoc } from "firebase/firestore";

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
        let q;
        if (genre) {
          // Apply genre filter if a genre is provided
          q = query(collection(db, "vinyls"), where("genre", "==", genre));
          //debugging
        } else {
          // Otherwise, fetch all vinyls without filtering
          q = query(collection(db, "vinyls"));
        }
        const querySnapshot = await getDocs(q);
        const vinylsData = querySnapshot.docs.map((doc) => {
          const vinylData = doc.data();
          return {
            id: doc.id,
            title: vinylData.title,
            image: vinylData.image,
            artist: vinylData.artist, // Assuming 'artist' is a simple field in your vinyls documents
          };
        });
        setVinyls(vinylsData);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchVinyls();
  }, [db, genre]);

  return { vinyls, loading, error };
};
