import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export const useVinyls = () => {
  const [vinyls, setVinyls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVinyls = async () => {
      const { data, error } = await supabase
        .from("vinyls")
        .select(`id, title, image, artist_id!inner(id, name)`);
      console.log("Vinyl data: ", data);
      if (error) setError(error);
      else {
        // Map over the data to conform to the expected structure
        const vinylsData =
          data?.map((vinyl) => ({
            id: vinyl.id,
            title: vinyl.title,
            image: vinyl.image,
            artist: vinyl.artist_id
              ? {
                  id: vinyl.artist_id.id,
                  name: vinyl.artist_id.name,
                }
              : { id: 0, name: "Unknown Artist" },
          })) || [];

        setVinyls(vinylsData);
      }

      setLoading(false);
    };

    fetchVinyls();
  }, []);

  return { vinyls, loading, error };
};
