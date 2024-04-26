import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  join,
} from "firebase/firestore";
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
        let q = query(collection(db, "vinyls"));

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
          q = query(q, ...conditions);
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
