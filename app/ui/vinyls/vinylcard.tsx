'use client';
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';

interface AlbumCardProps {
  title: string;
  artist: string;
  image: any;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, image }) => {
  return (
    <div className="relative m-4 w-[224px] h-[224px] rounded-lg overflow-hidden hover:cursor-pointer">
      <img src={image} alt={title} className="w-full h-full" />
      <Link href="/dashboard/vinyls" className="absolute inset-0 flex justify-center items-center opacity-0 hover:bg-gradient-to-t hover:from-black hover:to-transparent hover:opacity-100 transition-opacity duration-300">
        <FaPlay className="text-white text-3xl" />
      </Link>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white text-lg">{title}</h3>
        <p className="text-gray-300">{artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;