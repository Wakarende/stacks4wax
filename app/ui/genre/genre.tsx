
interface GenreProps{
    genreName: string;
}
const Genre: React.FC<GenreProps> = ({ genreName }) => {
    return (
        <div className="flex justify-center items-center m-2 text-sm font-small bg-sidebar rounded-lg border hover:bg-gray-200">
            <button type="button" className="py-2.5 px-4 focus:outline-none w-full">
                {genreName}
            </button>
        </div>
    );
};

export default Genre;