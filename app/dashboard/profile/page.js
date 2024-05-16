"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/app/components/profile/profileHeader";
import ProfileTabs from "@/app/components/profile/profileTabs";
import ProtectedLayout from "./protected-layout";
import { useAuth } from "../../hooks/useAuth";
import AlbumCard from "@/app/ui/vinyls/vinylcard";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  useUserCollections,
  useUserVinyls,
} from "../../hooks/useUserCollectionsAndVinyls.js";
import Link from "next/link";

const UserProfilePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/dashboard/login");
    }
  }, [user, loading, router]);

  const { collections, error: collectionsError } = useUserCollections();
  const [activeCollectionId, setActiveCollectionId] = useState(null);
  const { vinyls, error: vinylsError } = useUserVinyls(activeCollectionId);

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  const [activeTab, setActiveTab] = useState("Collections");
  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <ProtectedLayout>
      <div className="container mx-auto my-8">
        <ProfileHeader />
        <ProfileTabs onSelectTab={handleSelectTab} activeTab={activeTab} />
        <div className="py-4">
          {activeTab === "Collections" && (
            <div>
              <div className="flex items-center mb-2">
                <IoIosAddCircleOutline />
                <Link
                  href={"/dashboard/profile/createcollection"}
                  className="mx-1"
                >
                  Create new collection
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {collections.map((col) => (
                  <AlbumCard
                    key={col.id}
                    id={col.id}
                    title={col.name}
                    image={col.cover_image}
                    link={`/dashboard/profile/singlecollection/${col.id}`}
                    onClick={() => setActiveCollectionId(col.id)}
                  />
                ))}
              </div>
            </div>
          )}
          {activeTab === "Vinyls" && (
            <div>
              <div className="flex items-center mb-2">
                <IoIosAddCircleOutline />
                <Link href={"/dashboard/profile/addvinyl"} className="mx-1">
                  Add Vinyl
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {vinyls.map((vinyl) => (
                  <AlbumCard
                    key={vinyl.id}
                    id={vinyl.id}
                    title={vinyl.title}
                    artist={vinyl.artist}
                    image={vinyl.cover_image}
                    link={`/dashboard/singlevinyl/${vinyl.id}`}
                  />
                ))}
              </div>
            </div>
          )}
          {activeTab === "Likes" && <div>Likes content...</div>}
        </div>
      </div>
    </ProtectedLayout>
  );
};
export default UserProfilePage;
