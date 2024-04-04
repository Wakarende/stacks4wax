export const TrackForm = ({ tracks, setTracks, formErrors }) => {
  const addTrack = () => {
    const newTrack = {
      title: "",
      artist: "",
      duration: "",
      trackNumber: tracks.length + 1,
    };
    setTracks([...tracks, newTrack]);
  };

  const handleTrackChange = (index, e) => {
    const updatedTracks = [...tracks];
    updatedTracks[index][e.target.name] = e.target.value;
    setTracks(updatedTracks);
  };

  return (
    <div className="max-w-4xl mx-auto p-5 ">
      {tracks.map((track, index) => (
        <div key={index}>
          <input
            name="title"
            value={track.title}
            onChange={(e) => handleTrackChange(index, e)}
            placeholder="Track Title"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-5 text-gray-500 leading-tight focus:outline-none focus:border-indigo-300"
          />
          <input
            name="artist"
            value={track.artist}
            onChange={(e) => handleTrackChange(index, e)}
            placeholder="Artist"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-5 text-gray-500 leading-tight focus:outline-none focus:border-indigo-300"
          />
          <input
            name="duration"
            value={track.duration}
            onChange={(e) => handleTrackChange(index, e)}
            placeholder="Duration"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-5  text-gray-500 leading-tight focus:outline-none focus:border-indigo-300"
          />
          <input
            name="trackNumber"
            value={track.trackNumber}
            onChange={(e) => handleTrackChange(index, e)}
            placeholder="Track Number"
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-5 text-gray-500 leading-tight focus:outline-none focus:border-indigo-300"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addTrack}
        className="px-4 py-2 bg-green text-white mt-5 rounded hover:underline"
      >
        Add Another Track
      </button>
    </div>
  );
};
