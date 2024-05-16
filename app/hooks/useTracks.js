import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../utils/firebaseConfig";

export const useTracks = (vinylId) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    if (!vinylId) return;

    const fetchTracks = async () => {
      try {
        const q = query(
          collection(db, "tracks"),
          where("vinylId", "==", vinylId)
        );
        const querySnapshot = await getDocs(q);
        const fetchedTracks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTracks(fetchedTracks);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchTracks();
  }, [vinylId]);

  return { tracks, loading, error };
};
