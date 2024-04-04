// components/AddVinylForm.js
import { useState } from "react";
import { VinylInfoForm } from "./vinlyInfoForm";
import { TrackForm } from "./trackForm";
import Router, { useRouter } from "next/navigation";
const AddVinylForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [vinylInfo, setVinylInfo] = useState({
    title: "",
    artist: "",
    releaseYear: "",
    image: "",
    genre: "",
  });
  const [tracks, setTracks] = useState([
    { title: "", artist: "", duration: "", trackNumber: 1 },
  ]);
  const [formErrors, setFormErrors] = useState({});

  const handleVinylInfoChange = (e) => {
    const { name, value } = e.target;
    setVinylInfo({ ...vinylInfo, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateStep = (step) => {
    let errors = {};
    let isValid = true;

    if (step === 1) {
      // Validate vinyl info fields
      if (!vinylInfo.title) errors.title = "Title is required";
      if (!vinylInfo.artist) errors.artist = "Artist is required";
      if (!vinylInfo.releaseYear)
        errors.releaseYear = "Release Year is required";
      if (!vinylInfo.image) errors.image = "Image URL is required";
      if (!vinylInfo.genre) errors.genre = "Genre is required";
    } else if (step === 2) {
      // Ensure at least one track is added
      if (tracks.length === 0) {
        errors.tracks = "At least one track must be added.";
        isValid = false;
      } else {
        // Validate each track
        tracks.forEach((track, index) => {
          if (!track.title)
            errors[`trackTitle${index}`] = "Track title is required";
          if (!track.artist)
            errors[`trackArtist${index}`] = "Track artist is required";
          if (!track.duration)
            errors[`trackDuration${index}`] = "Track duration is required";
        });
      }
    }
    setFormErrors(errors);
    isValid = Object.keys(errors).length === 0;
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log("Vinyl and Tracks data", { vinylInfo, tracks });
      // Proceed with API submission or state update here
    }
    router.push("/dashboard/profile");
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <VinylInfoForm
            vinylInfo={vinylInfo}
            onChange={handleVinylInfoChange}
            formErrors={formErrors}
          />
        )}
        {currentStep === 2 && (
          <TrackForm
            tracks={tracks}
            setTracks={setTracks}
            formErrors={formErrors}
          />
        )}
        {formErrors.tracks && (
          <p className="text-red-500 text-sm mt-2">{formErrors.tracks}</p>
        )}
        <div>
          {currentStep < 2 && (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-4 py-2 bg-green text-white rounded hover:underline"
            >
              Next
            </button>
          )}
          {currentStep === 2 && (
            <button
              type="submit"
              className="px-4 py-2 bg-green text-white rounded hover:underline"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddVinylForm;
