
"use client";
import GenreList from "../ui/genre/genreList";
import AlbumCard from "../ui/vinyls/vinylcard";
import { useVinyls, Vinyl } from "../hooks/fetchVinyls";

export default function Page(){
    const { vinyls, loading, error } = useVinyls();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
    return(
    <div>
    <h1>Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {vinyls.map((vinyl: Vinyl) => (
        <AlbumCard
          key={vinyl.id} // It's better to use unique IDs than index for keys
          title={vinyl.title}
          artist={vinyl.artist}
          image={vinyl.image}
        />
      ))}
    </div>
    <GenreList/>
    </div>
    
    )
}