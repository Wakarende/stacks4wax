'use client';

interface AlbumCardProps {
  title: string;
  artist: string;
  image: any;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, image }) => {
  return (
    <div className="m-4">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-auto rounded-lg shadow-md" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-lg">{title}</h3>
          <p className="text-gray-300">{artist}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;