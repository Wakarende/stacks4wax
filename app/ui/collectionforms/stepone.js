// components/StepOne.js
export default function StepOne({ formData, setFormData, nextStep }) {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Name of the Collection"
        value={formData.collectionName}
        onChange={(e) =>
          setFormData({ ...formData, collectionName: e.target.value })
        }
        className="input input-bordered w-full mb-4"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="textarea textarea-bordered w-full mb-4"
      />
      <select
        value={formData.genre}
        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        className="select select-bordered w-full mb-4"
      >
        {/* Map your genres here */}
        <option value="rock">Rock</option>
        <option value="jazz">Jazz</option>
        {/* other genres */}
      </select>
      <button onClick={nextStep} className="btn btn-primary">
        Next Step
      </button>
    </div>
  );
}
