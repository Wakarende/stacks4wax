import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../utils/firebaseConfig";

export const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "genres"));
        const fetchedGenres = querySnapshot.docs.map((doc) => doc.data().name);
        setGenres(fetchedGenres);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchGenres();
  }, []);
  return { genres, loading, error };
};
