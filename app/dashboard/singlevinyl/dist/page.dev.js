// "use client";
// import React, { useState, useEffect } from "react";
// import { FaPlay } from "react-icons/fa";
// import {
//   BsHeart,
//   BsHeartFill,
//   BsDownload,
//   BsThreeDotsVertical,
// } from "react-icons/bs";
// import Image from "next/image";
// import { useTracks } from "@/app/hooks/useTracks";
// import { useSearchParams } from "next/navigation";
// import { useVinyls } from "@/app/hooks/fetchVinyls";
// import { supabase } from "@/utils/supabaseClient";
// import { PostgrestError } from "@supabase/supabase-js";
// import { Vinyl } from "@/app/hooks/fetchVinyls";
// export default function Page() {
//   const searchParams = useSearchParams();
//   const rawVinylId = searchParams.get("vinylId"); // Get 'vinylId' from the URL's query string
//   console.log("Raw vinylID fom URL: ", rawVinylId);
//   const [vinyl, setVinyl] = useState(null);
//   const [loadingVinyl, setLoadingVinyl] = useState(true);
//   const [errorVinyl, setErrorVinyl] = useState(null);
//   const parsedVinylId = rawVinylId ? parseInt(rawVinylId, 10) : undefined;
//   console.log("Parsed vinylId: ", parsedVinylId);
//   // Use your existing hooks to fetch tracks
//   const {
//     tracks,
//     loading: loadingTracks,
//     error: errorTracks,
//   } = useTracks(parsedVinylId);
//   useEffect(() => {
//     if (parsedVinylId && !isNaN(parsedVinylId)) {
//       setLoadingVinyl(true);
//       const fetchVinyl = async () => {
//         const { data, error } = await supabase
//           .from("vinyls")
//           .select(`id, title, image, artist_id!inner(id, name)`)
//           .eq("id", parsedVinylId)
//           .single(); // Fetch single record
//         console.log("Fetched vinyl data: ", data);
//         if (error) {
//           console.error("Error fetching vinyl: ", error);
//           setErrorVinyl(error);
//         } else {
//           // Transform the data to match the Vinyl type
//           const transformedData = data
//             ? {
//                 ...data,
//                 artist: data.artist_id
//                   ? {
//                       id: data.artist_id.id,
//                       name: data.artist_id.name,
//                     }
//                   : { id: 0, name: "Unknown Artist" },
//               }
//             : null;
//           setVinyl(transformedData);
//         }
//         setLoadingVinyl(false);
//       };
//       fetchVinyl();
//     }
//   }, [parsedVinylId]);
//   // Handle loading and error states
//   // if (loadingVinyl || tracksLoading) return <div>Loading...</div>;
//   if (errorVinyl) return <div>Error: {errorVinyl.message}</div>;
//   // if (tracksError) return <div>Error: {tracksError.message}</div>;
//   if (!vinyl) return <div>Vinyl not found</div>;
//   return (
//     <div className="container mx-auto p-6">
//       {vinyl && (
//         <div>
//           {/* Vinyl details */}
//           <div className="flex flex-col lg:flex-row">
//             <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
//               <Image
//                 src={vinyl.image}
//                 alt={vinyl.title}
//                 className="rounded-xl shadow-xl"
//                 width={400}
//                 height={400}
//               />
//             </div>
//             <div className="w-full lg:w-2/3 lg:pl-10">
//               <h2 className="text-4xl font-bold text-gray-800">
//                 {vinyl.title}
//               </h2>
//               <p className="text-lg text-gray-600 my-2">{vinyl.artist.name}</p>
//               <p className="text-gray-500 text-sm mb-4">
//                 Number of Tracks: {tracks.length}
//               </p>
//             </div>
//           </div>
//           {/* Tracks listing */}
//           <div className="mt-6">
//             <div className="flex items-center mb-6">
//               <button className="flex items-center justify-center bg-green text-white rounded-md p-3 pr-7 pl-7 mr-4">
//                 <FaPlay className="mr-2" />
//                 Play
//               </button>
//               <span className="text-gray-600 mr-4">
//                 <BsHeart />
//               </span>
//             </div>
//             <div className="space-y-2 mt-2 ">
//               {tracks.map((track) => (
//                 <div
//                   key={track.id}
//                   className="flex items-center justify-between p-2 hover:bg-gray-100 hover:rounded-md pl-5 pr-5 pt-4 pb-4"
//                 >
//                   <div className="flex items-center">
//                     <span className="text-gray-800 text-md mr-2">
//                       {track.track_number}
//                     </span>
//                     <span className="text-gray-800 text-md mr-2 ">
//                       {track.title}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="text-gray-600 mr-4">
//                       <BsHeart className="inline" />
//                     </span>
//                     <span className="text-gray-600">{track.duration}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//       {!vinyl && !loadingVinyl && <div>Vinyl not found.</div>}
//     </div>
//   );
// }
"use strict";