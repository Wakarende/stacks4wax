"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCollectionVinyls } from "../../../../hooks/useCollectionVinyls";
import AlbumCard from "../../../../ui/vinyls/vinylcard.js";
import ProtectedLayout from "../../protected-layout";
import { useAuth } from "../../../../hooks/useAuth";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";

const SingleCollectionPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const collectionId = pathSegments[pathSegments.length - 1];
  const { vinyls, error } = useCollectionVinyls(collectionId);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/dashboard/login");
    }
  }, [user, loading, router]);

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
        <div className="flex item-center">
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
