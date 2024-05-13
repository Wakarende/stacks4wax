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

  //debugging
  console.log("User in UserProfilePage:", user);
  console.log("Loading state in UserProfilePage:", loading);

  useEffect(() => {
    if (!loading && !user) {
      console.log("User is not authenticated, redirecting...");
      router.push("/dashboard/login"); // Make sure this path is correct
    }
  }, [user, loading, router]);

  const { collections, error } = useUserCollections();
  const { vinyls } = useUserVinyls();

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  //Profile tabs
  const [activeTab, setActiveTab] = useState("Collections"); // Default active tab
  //   const user = useAuth();
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
                    id={col.id} // It's better to use unique IDs than index for keys
                    title={col.name}
                    image={col.cover_image}
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
                    id={vinyl.id}
                    key={vinyl.id} // It's better to use unique IDs than index for keys
                    title={vinyl.title}
                    artist={vinyl.artist.name}
                    image={vinyl.image}
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
