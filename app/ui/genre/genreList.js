import Genre from "./genre";

const genres = [
  "Alternative Rap",
  "Ambient",
  "Dance",
  "Downtempo",
  "Easy Listening",
  "Electronic",
  "Electronica",
  "Hip-Hop",
  "Hip-Hop/Rap",
  "Instrumental",
  "Lounge",
  "MTV",
  "New Age",
  "Old School Rap",
  "Pop",
];

function GenreList() {
  return (
    <div className="p-8">
      <p className="text-xl font-bold mb-4">Genres</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {genres.map((genre, index) => (
          <Genre key={index} genreName={genre} />
        ))}
      </div>
    </div>
  );
}

export default GenreList;
