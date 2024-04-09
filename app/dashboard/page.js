"use client";
import { useState, useContext } from "react";
import GenreList from "../ui/genre/genreList";
import AlbumCard from "../ui/vinyls/vinylcard";
import { useVinyls } from "../hooks/fetchVinyls";
import { AuthContext } from "../page";

export default function Page() {
  const user = useContext(AuthContext);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { vinyls, loading, error } = useVinyls(selectedGenre);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <p className="text-xl font-bold mb-4">Vinyls</p>
      {user && <div>Welcome, {user.email}! Explore our vinyl collection.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {vinyls.map((vinyl) => (
          <AlbumCard
            id={vinyl.id}
            key={vinyl.id} // It's better to use unique IDs than index for keys
            title={vinyl.title}
            artist={vinyl.artist.name}
            image={vinyl.image}
          />
        ))}
      </div>
      <GenreList onGenreSelect={setSelectedGenre} />
      {!user && <div>Sign in for a personalized experience.</div>}
    </div>
  );
}
