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

export const useTracks = (vinylId: number) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    if (vinylId === undefined) {
      setLoading(false);
      return;
    }
    const fetchTracks = async () => {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .eq('vinyl_id', vinylId); 

      if (error) setError(error);
      else setTracks(data || []);

      setLoading(false);
    };

    fetchTracks();
  }, [vinylId]);

  return { tracks, loading, error };
};
