"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { app } from "../../../utils/firebaseConfig";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";

const SingleVinylPage = () => {
  const router = useRouter();
  const [vinyl, setVinyl] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore(app);

    // This checks if the router parameters are ready to be read
    if (!router.isReady) {
      console.log("Router is not ready.");
      return;
    }

    // Getting the vinyl ID from the URL query parameters
    const fetchedVinylId = router.query.vinylId;
    console.log("Router is ready, vinylId:", fetchedVinylId);

    // If no vinyl ID is provided in the URL, we stop here and set an error
    if (!fetchedVinylId) {
      console.log("No vinylId provided, exiting fetch.");
      setLoading(false);
      setError("No vinyl ID provided.");
      return;
    }

    // Function to fetch vinyl details and tracks from Firestore
    const fetchVinylDetails = async (vinylId) => {
      setLoading(true);

      try {
        console.log("Fetching vinyl details for ID:", vinylId);
        const vinylDocRef = doc(db, "vinyls", vinylId);
        const vinylDoc = await getDoc(vinylDocRef);

        if (!vinylDoc.exists()) {
          throw new Error("Vinyl not found.");
        }

        setVinyl({ id: vinylDoc.id, ...vinylDoc.data() });

        const tracksQuery = query(collection(vinylDocRef, "tracks"));
        const tracksSnapshot = await getDocs(tracksQuery);
        const fetchedTracks = tracksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTracks(fetchedTracks);
      } catch (err) {
        console.error("Error fetching vinyl details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Calling the fetch function with the fetched vinyl ID
    fetchVinylDetails(fetchedVinylId);
  }, [router.isReady, router.query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!vinyl) return <div>Vinyl not found.</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
          <Image
            src={vinyl.image}
            alt={vinyl.title}
            width={400}
            height={400}
            className="rounded-xl shadow-xl"
          />
        </div>
        <div className="w-full lg:w-2/3 lg:pl-10">
          <h2 className="text-4xl font-bold text-gray-800">{vinyl.title}</h2>
          <p className="text-lg text-gray-600 my-2">{vinyl.artist}</p>
          <div className="mt-4">
            <button className="flex items-center justify-center bg-green-500 text-white rounded-md p-3">
              <FaPlay className="mr-2" /> Play All
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
          >
            <span className="text-gray-800">{track.title}</span>
            <span>
              <BsHeart />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleVinylPage;
