import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';
// Define the structure of your vinyl record data
export interface Vinyl {
  id: number;
  title: string;
  artist: string;
  image: string;
}

export const useVinyls = (): { vinyls: Vinyl[], loading: boolean, error: PostgrestError | null } => {
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchVinyls = async () => {
      const { data, error } = await supabase.from('vinyls').select('*');
    //Debugging
    console.log("Vinyl data: ",data);
      if (error) setError(error);
      else setVinyls(data || []);

      setLoading(false);
    };

    fetchVinyls();
  }, []);

  return { vinyls, loading, error };
};
