"use client";
import { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../../hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { app } from "../../../../../utils/firebaseConfig";

export default function EditCollectionForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { collectionId } = useParams(); // Use useParams to get the collectionId from the URL

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    genre: "",
    cover_image: "", // Store the URL of the uploaded image
  });

  const [imageFile, setImageFile] = useState(null); // State for storing the selected image file
  const [formErrors, setFormErrors] = useState({
    name: "",
    genre: "",
    description: "",
    cover_image: "",
  });

  useEffect(() => {
    if (!user || !collectionId) return;

    const fetchCollectionDetails = async () => {
      try {
        const db = getFirestore(app);
        const collectionRef = doc(
          db,
          `users/${user.uid}/collections/${collectionId}`
        );
        const collectionDoc = await getDoc(collectionRef);
        if (collectionDoc.exists()) {
          setFormData(collectionDoc.data());
        }
      } catch (err) {
        console.error("Error fetching collection details:", err);
      }
    };

    fetchCollectionDetails();
  }, [user, collectionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setFormErrors((prevErrors) => ({ ...prevErrors, cover_image: "" }));
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.genre) errors.genre = "Please select a genre.";
    if (!formData.description.trim())
      errors.description = "Description is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const db = getFirestore(app);
        const storage = getStorage(app);
        let coverImageUrl = formData.cover_image;

        // Upload image to Firebase Storage if a new file is selected
        if (imageFile) {
          const imageRef = ref(
            storage,
            `cover_images/${user.uid}/${imageFile.name}`
          );
          const snapshot = await uploadBytes(imageRef, imageFile);
          coverImageUrl = await getDownloadURL(snapshot.ref);
        }

        const updatedData = {
          ...formData,
          cover_image: coverImageUrl,
        };

        const collectionRef = doc(
          db,
          `users/${user.uid}/collections/${collectionId}`
        );
        await updateDoc(collectionRef, updatedData);
        router.push("/dashboard/profile");
      } catch (err) {
        console.error("Error updating collection:", err);
      }
    }
  };

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
    "Other",
  ];

  const selectGenre = (genre) => {
    setFormData({ ...formData, genre });
    setFormErrors((prevErrors) => ({ ...prevErrors, genre: "" }));
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
          {formErrors.description && (
            <p className="text-red-500 text-sm">{formErrors.description}</p>
          )}
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
        <div>
          <label htmlFor="cover_image" className="mt-1 block text-xl font-bold">
            Cover Image
          </label>
          <input
            type="file"
            name="cover_image"
            id="cover_image"
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            onChange={handleImageChange}
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green text-white rounded hover:underline"
        >
          Update Collection
        </button>
      </form>
    </div>
  );
}
