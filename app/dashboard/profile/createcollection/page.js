"use client";
import { useState } from "react";
import Genre from "@/app/ui/genre/genre";

export default function CreateCollectionForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    genre: "",
  });

  // State for selected vinyls
  const [selectedVinyls, setSelectedVinyls] = useState([]);

  // Dummy vinyl data
  const vinyls = [
    { id: 1, name: "Vinyl 1", imageUrl: "/public/welcome.png" },
    { id: 2, name: "Vinyl 2", imageUrl: "/public/welcome.png" },
    { id: 3, name: "Vinyl 3", imageUrl: "/public/welcome.png" },
  ];

  // Handling form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handling genre dropdown change
  const handleGenreChange = (e) => {
    setFormData((prevState) => ({ ...prevState, genre: e.target.value }));
  };

  // Handling vinyl selection
  const toggleVinylSelection = (vinylId) => {
    setSelectedVinyls((prev) => {
      if (prev.includes(vinylId)) {
        return prev.filter((id) => id !== vinylId);
      } else {
        return [...prev, vinylId];
      }
    });
  };

  // Dummy genres
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

  // Function to handle genre selection
  const selectGenre = (genre) => {
    setFormData({ ...formData, genre });
  };

  return (
    <div className="p-4">
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xl text-gray-500 font-bold"
          >
            Collection Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:outline-none sm:text-sm"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mt-1 block text-xl text-gray-500 font-bold"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:outline-none sm:text-sm"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <p className="mt-1 text-xl font-bold mb-4 text-gray-500">Genre</p>
          <div className="flex flex-wrap justify-start">
            {genres.map((genre, index) => (
              <div key={index} className="m-2">
                <button
                  type="button"
                  className={`flex justify-center items-center text-sm font-small rounded-lg border px-4 py-2.5 w-full ${
                    formData.genre === genre
                      ? "bg-green text-white"
                      : "bg-sidebar hover:bg-gray-200"
                  }`}
                  onClick={() => selectGenre(genre)}
                >
                  {genre}
                </button>
              </div>
            ))}
          </div>
        </div>
        <fieldset>
          <legend className="mt-1 font-bold text-gray-500 text-xl ">
            Choose Vinyls
          </legend>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vinyls.map((vinyl) => (
              <div
                key={vinyl.id}
                className={`p-4 border rounded-lg ${
                  selectedVinyls.includes(vinyl.id)
                    ? "border-green"
                    : "border-gray-300"
                }`}
                onClick={() => toggleVinylSelection(vinyl.id)}
              >
                <img
                  src={vinyl.imageUrl}
                  alt={vinyl.name}
                  className="h-40 w-full object-cover"
                />
                <p className="mt-2 text-center text-sm font-medium text-gray-700">
                  {vinyl.name}
                </p>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green text-white rounded hover:underline"
        >
          Create Collection
        </button>
      </form>
    </div>
  );
}
