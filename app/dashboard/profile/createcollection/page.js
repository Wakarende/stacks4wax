"use client";
import { useState } from "react";
import Genre from "@/app/ui/genre/genre";
import { useRouter } from "next/navigation";

export default function CreateCollectionForm() {
  const router = useRouter();
  //Success Pop up
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    genre: "",
  });

  // State for selected vinyls
  const [selectedVinyls, setSelectedVinyls] = useState([]);

  // Form validation
  const [formErrors, setFormErrors] = useState({
    name: "",
    genre: "",
    vinyls: "",
  });

  // Dummy vinyl data
  const vinyls = [
    { id: 1, name: "Vinyl 1", imageUrl: "/public/logo.png" },
    { id: 2, name: "Vinyl 2", imageUrl: "/public/welcome.png" },
    { id: 3, name: "Vinyl 3", imageUrl: "/public/welcome.png" },
  ];

  // Handling form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    // Reset the error message for the field being corrected.
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const toggleVinylSelection = (vinylId) => {
    setSelectedVinyls((prev) => {
      const updatedSelection = prev.includes(vinylId)
        ? prev.filter((id) => id !== vinylId)
        : [...prev, vinylId];
      setFormErrors({
        ...formErrors,
        vinyls:
          updatedSelection.length > 0
            ? ""
            : "Please select at least one vinyl.",
      });
      return updatedSelection;
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.genre) errors.genre = "Please select a genre.";
    if (selectedVinyls.length === 0)
      errors.vinyls = "Please select at least one vinyl.";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
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
    setFormErrors((prevErrors) => ({ ...prevErrors, genre: "" }));
  };

  //submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission logic, such as calling an API
      console.log("Form is valid, proceed with submission...");
      console.log({ ...formData, selectedVinyls });

      // Show success message.
      setShowSuccessPopup(true);
      // Hide the popup after 3 seconds.
      setTimeout(() => {
        setShowSuccessPopup(false);
        router.push("/dashboard/profile");
      }, 3000);

      // Reset form
      setFormData({
        name: "",
        description: "",
        genre: "",
      });
      setSelectedVinyls([]);
      setFormErrors({
        name: "",
        genre: "",
        vinyls: "",
      });
    } else {
      console.log("Form is invalid, check errors.");

      setFormData({
        name: "",
        description: "",
        genre: "",
      });
      setSelectedVinyls([]);
    }
  };
  return (
    <div className="p-4 max-w-xl mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-xl font-bold">
            Collection Name*
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:outline-none sm:text-sm"
            value={formData.name}
            onChange={handleInputChange}
          />
          {/* Form Errors */}
          {formErrors.name && (
            <p className="text-red-500 text-sm">{formErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="mt-1 block text-xl font-bold">
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
          <p className="mt-1 text-xl font-bold mb-4">Genre*</p>
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
          {formErrors.genre && (
            <p className="text-red-500 text-sm">{formErrors.genre}</p>
          )}
        </div>
        <fieldset>
          <legend className="mt-1 font-bold text-xl ">Choose Vinyls*</legend>
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
                  className="h-auto w-40 object-cover object-center"
                />
                <p className="mt-2 text-center text-sm font-medium text-gray-700">
                  {vinyl.name}
                </p>
              </div>
            ))}
          </div>
          {formErrors.vinyls && (
            <p className="text-red-500 text-sm">{formErrors.vinyls}</p>
          )}
        </fieldset>
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green text-white rounded hover:underline"
        >
          Create Collection
        </button>
      </form>
      {/* Conditional rendering of the success message */}
      {showSuccessPopup && (
        <div className="absolute top-0 right-0 m-4 bg-green-500 text-white p-2 rounded">
          Collection created successfully!
        </div>
      )}
    </div>
  );
}
