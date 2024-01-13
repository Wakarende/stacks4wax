
"use client";
import GenreList from "../ui/genre/genreList";
import AlbumCard from "../ui/vinyls/vinylcard";
import { useVinyls, Vinyl } from "../hooks/fetchVinyls";

export default function Page(){
  const { vinyls, loading, error } = useVinyls();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
    return(
    <div className="">
    <p className="text-xl font-bold mb-4">Vinyls</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {vinyls.map((vinyl: Vinyl) => (
        <AlbumCard
          id={vinyl.id}
          key={vinyl.id} // It's better to use unique IDs than index for keys
          title={vinyl.title}
          artist={vinyl.artist.name}
          image={vinyl.image}
        />
      ))}
    </div>
    <GenreList/>
    </div>
    )
}