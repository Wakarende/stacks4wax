import { useState, useEffect } from "react";
import { supabase} from '../../utils/supabaseClient';

export const useVinyls = (genre, searchTerm) => {
  const [vinyls, setVinyls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchVinyls = async () => {
      let selectQuery = `id, title, image, artist_id!inner(id, name)`;

      let query = supabase.from("vinyls").select(selectQuery);

      // Apply the genre filter if a genre is provided.
      if (genre) {
        query = query.ilike("genre", `%${genre}%`);
      }

      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`); // Assumes searching by title. Adjust the field as necessary.
      }
      const { data, error } = await query;

      if (error) {
        setError(error);
      } else {
        const formattedData = data.map((vinyl) => ({
          id: vinyl.id,
          title: vinyl.title,
          image: vinyl.image,
          artist: {
            id: vinyl.artist_id.id,
            name: vinyl.artist_id.name,
          },
        }));
        setVinyls(formattedData);
      }
      setLoading(false);
    };

    fetchVinyls();
  }, [genre]); // Dependency on genre to refetch when it changes

  return { vinyls, loading, error };
};
