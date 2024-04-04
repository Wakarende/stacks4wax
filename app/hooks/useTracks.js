// hooks/useTracks.js (create this file)
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export const useTracks = (vinylId) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vinylId) {
      setLoading(false);
      return;
    }
    const fetchTracks = async () => {
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .eq("vinyl_id", vinylId);
      console.log("Single Vinyl data: ", data);
      // Debugging
      console.error("Error fetching tracks:", error);

      if (error) {
        console.error("Error fetching tracks:", error);
        setError(error);
      } else {
        // Sort the tracks by track number
        const sortedTracks = data
          ? [...data].sort((a, b) => a.track_number - b.track_number)
          : [];
        console.log("Sorted track data: ", sortedTracks);
        setTracks(sortedTracks);
      }
      setLoading(false);
    };

    fetchTracks();
  }, [vinylId]);

  return { tracks, loading, error };
};
