import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabaseClient';
// Define the structure of your vinyl record data

export interface Artist{
  id:number;
  name: string;
}
export interface Vinyl {
  id: number;
  title: string;
  artist: Artist;
  image: string;
}

export const useVinyls = (): { vinyls: Vinyl[], loading: boolean, error: PostgrestError | null } => {
  const [vinyls, setVinyls] = useState<Vinyl[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchVinyls = async () => {
      const { data, error } = await supabase.from('vinyls').select(`id, title,image,artist_id!inner(id,name)`);
    //Debugging
    console.log("Vinyl data: ",data);
      if (error) setError(error);
      
      else{
        // Map over the data to conform to the Vinyl interface
        const vinylsData: Vinyl[] = data?.map(vinyl => ({
          id: vinyl.id,
          title: vinyl.title,
          image: vinyl.image,
          artist: vinyl.artist_id? {
            id: vinyl.artist_id.id, // Assuming the id is part of the artist data
            name: vinyl.artist_id.name
          } : { id: 0, name: 'Unknown Artist' }
        })) || [];

        setVinyls(vinylsData);
      } 

      setLoading(false);
    };

    fetchVinyls();
  }, []);

  return { vinyls, loading, error };
};
