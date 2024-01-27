// hooks/useTracks.js (create this file)
import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';

export interface Track {
  id: number;
  title: string;
  duration: string;
  track_number: number;
  artist: string; 
}

export const useTracks = (vinylId: number | undefined) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    if (!vinylId) {
      setLoading(false);
      return;
    }
    const fetchTracks = async () => {
      
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .eq('vinyl_id', vinylId); 
      console.log("Single Vinyl data: ",data);
      //Debugging
      console.error("Error fetching tracks:", error);
      if (error) 
      setError(error);
      else 
      //Debugging
      console.log("Track data: " + data);
      setTracks(data || []);
      setLoading(false);
    };

    
    fetchTracks();
  }, [vinylId]);

  return { tracks, loading, error };
};
