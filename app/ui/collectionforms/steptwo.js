// components/StepTwo.js
export default function StepTwo({
  formData,
  setFormData,
  previousStep,
  submitForm,
}) {
  return (
    <div className="p-4">
      {/* Here, you would map over the user's library and allow them to add vinyls to the collection */}
      {/* This is a placeholder for demonstration */}
      <button
        onClick={() =>
          setFormData({
            ...formData,
            vinyls: [...formData.vinyls, "New Vinyl"],
          })
        }
      >
        Add Vinyl
      </button>

      <div>
        {/* List the vinyls */}
        {formData.vinyls.map((vinyl, index) => (
          <div key={index}>{vinyl}</div>
        ))}
      </div>

      <button onClick={previousStep} className="btn btn-secondary">
        Previous Step
      </button>
      <button onClick={submitForm} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
}
