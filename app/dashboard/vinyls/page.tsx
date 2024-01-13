'use client'
import React, { useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { BsHeart, BsHeartFill, BsDownload, BsThreeDotsVertical } from 'react-icons/bs';
import Image from 'next/image';
import { useTracks } from '@/app/hooks/useTracks';
import { useSearchParams } from 'next/navigation';
import { useVinyls } from '@/app/hooks/fetchVinyls';
export default function Page(){
const [vinylId, setVinylId] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    console.log("ID:",id);
    setVinylId(id ? Number(id) : null);


  }, [searchParams]);

 
  // Fetch all vinyls and find the specific one
  const { vinyls } = useVinyls();
  const vinyl = vinyls.find(v => v.id === Number(vinylId));

  // Fetch tracks for the specific vinyl
  const { tracks, loading, error } = useTracks(Number(vinylId));

  if (!vinyl || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

    return(
     <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <Image src={vinyl.image} alt={vinyl.title} className="rounded-xl shadow-xl" width={400} height={400} />
            </div>
            <div className="w-full lg:w-2/3 lg:pl-10">
            <h2 className="text-4xl font-bold text-gray-800">{vinyl.title}</h2>
            <p className="text-lg text-gray-600 my-2">{vinyl.artist.name}</p>
            <p className="text-gray-500 text-sm mb-4"></p>
            </div>
        </div>
         <div className='mt-6'>
            <div className="flex items-center mb-6">
                <button className="flex items-center justify-center bg-green text-white rounded-md p-3 pr-7 pl-7 mr-4">
                <FaPlay className="mr-2" />
                Play
                </button>
                <span className="text-gray-600 mr-4">
                <BsHeart />
                </span>
            </div>
                {/*Tracks*/}
                <div className="space-y-2 mt-2 ">
                {tracks.map(track => (
                    <div key={track.id} className="flex items-center justify-between p-2 hover:bg-gray-100 hover:rounded-md pl-5 pr-5 pt-4 pb-4">
                    <div className="flex items-center">
                        <span className="text-gray-800 text-md mr-2">{track.track_number}</span>
                        <span className="text-gray-800 text-md mr-2 ">{track.title}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-600 mr-4">
                         <BsHeart className="inline" />
                        </span>
                        <span className="text-gray-600">{track.duration}</span>
                    </div>
                    </div>
                ))}
                </div>
            </div>
    </div>
    )
}