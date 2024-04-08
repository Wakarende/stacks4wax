import Genre from "./genre";

const genres = ["rap", "R&B", "Pop"];

function GenreList({ onGenreSelect }) {
  return (
    <div className="p-8">
      <p className="text-xl font-bold mb-4">Genres</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {genres.map((genre, index) => (
          <Genre
            key={index}
            genreName={genre}
            onClick={() => {
              console.log(`Genre clicked: ${genre}`);
              onGenreSelect(genre);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default GenreList;
