"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCollectionVinyls } from "../../../../hooks/useCollectionVinyls";
import { useUserCollections } from "@/app/hooks/useUserCollectionsAndVinyls";
import AlbumCard from "../../../../ui/vinyls/vinylcard.js";
import ProtectedLayout from "../../protected-layout";
import { useAuth } from "../../../../hooks/useAuth";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";

const SingleCollectionPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const collectionId = pathSegments[pathSegments.length - 1];
  const { vinyls, error } = useCollectionVinyls(collectionId);
  const { fetchCollectionDetails } = useUserCollections();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/dashboard/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const getCollectionDetails = async () => {
      const details = await fetchCollectionDetails(collectionId);
      if (details) {
        setCollection(details);
      }
    };

    getCollectionDetails();
  }, [collectionId, fetchCollectionDetails]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  if (error) {
    return <div>Error loading vinyls: {error.message}</div>;
  }

  return (
    <ProtectedLayout>
      <div className="container mx-auto my-8">
        {collection && (
          <div className="flex items-center mb-8">
            <img
              src={collection.cover_image}
              alt={collection.name}
              className="w-40 h-40 object-cover rounded-lg shadow-lg"
            />
            <div className="ml-6 flex flex-col justify-between h-40">
              <div>
                <h1 className="text-lg font-bold">{collection.name}</h1>
                <p className="text-sm text-gray-600">
                  {collection.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">{user.username}</p>
              </div>
              <div className="self-start">
                <Link
                  href={`/dashboard/profile/editcollection/${collectionId}`}
                  className="text-blue-500 hover:underline mt-2"
                >
                  <FaRegEdit className="hover:text-green hover:underline text-lg text-gray-500" />
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center mb-4">
          <IoIosAddCircleOutline />
          <Link href={"#"} className="mx-1">
            Add Vinyls
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {vinyls.map((vinyl) => (
            <AlbumCard
              key={vinyl.id}
              id={vinyl.id}
              title={vinyl.title}
              image={vinyl.cover_image}
              link={`/dashboard/singlevinyl/${vinyl.id}`}
            />
          ))}
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default SingleCollectionPage;
