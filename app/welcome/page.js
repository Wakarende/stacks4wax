import Image from "next/legacy/image";
import welcome from "../../public/welcome.png";
import Link from "next/link";
import { ForwardIcon } from "@heroicons/react/24/outline";
export default function Page() {
  return (
    <div className="relative">
      {/* The image container */}
      <div className="relative h-[800px] w-full">
        {/* background image */}
        <Image src={welcome} alt="welcome" className="fill" objectFit="cover" />
      </div>

      {/* Button Container */}
      <div className="absolute bottom-0 w-full flex justify-center pb-6">
        {/* Explore Collections Button */}
        <Link href="/dashboard">
          <ForwardIcon className=" text-black font-extrabold  text-lg hover:text-green hover:underline w-10" />
        </Link>
      </div>
    </div>
  );
}
