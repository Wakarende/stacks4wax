export const VinylInfoForm = ({ vinylInfo, onChange, formErrors }) => (
  <div>
    {/* Vinyl Information Fields */}
    <input
      name="title"
      value={vinylInfo.title}
      onChange={onChange}
      placeholder="Title"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:border-indigo-300"
    />
    {formErrors.title && (
      <p className="text-red-500 text-xs italic">{formErrors.title}</p>
    )}

    <input
      name="artist"
      value={vinylInfo.artist}
      onChange={onChange}
      placeholder="Artist"
      className="shadow appearance-none border rounded w-full mt-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-300"
    />
    {formErrors.artist && (
      <p className="text-red-500 text-xs italic">{formErrors.artist}</p>
    )}
    <input
      name="releaseYear"
      value={vinylInfo.releaseYear}
      onChange={onChange}
      placeholder="Release Year"
      className="shadow appearance-none border rounded w-full mt-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-300"
    />
    {formErrors.releaseYear && (
      <p className="text-red-500 text-xs italic">{formErrors.releaseYear}</p>
    )}
    <input
      name="image"
      value={vinylInfo.image}
      onChange={onChange}
      placeholder="Image URL"
      className="shadow appearance-none border rounded w-full mt-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-300"
    />
    {formErrors.image && (
      <p className="text-red-500 text-xs italic">{formErrors.image}</p>
    )}
    <input
      name="genre"
      value={vinylInfo.genre}
      onChange={onChange}
      placeholder="Genre"
      className="shadow appearance-none border rounded w-full mt-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-300"
    />
    {formErrors.genre && (
      <p className="text-red-500 text-xs italic">{formErrors.genre}</p>
    )}
  </div>
);
