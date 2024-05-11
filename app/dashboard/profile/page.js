"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/app/components/profile/profileHeader";
import ProfileTabs from "@/app/components/profile/profileTabs";
import ProtectedLayout from "./protected-layout";
import { useAuth } from "../../hooks/useAuth";
import AlbumCard from "@/app/ui/vinyls/vinylcard";
import CollectionCard from "../../ui/collections/collectionscard";
// import useUserCollectionsAndVinyls from "../../hooks/useUserCollectionsAndVinyls";
import {
  useUserCollections,
  useUserVinyls,
} from "../../hooks/useUserCollectionsAndVinyls.js";

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
              <h2>Collections content for {user.username}</h2>
              <ul>
                {collections.map((col) => (
                  <AlbumCard
                    id={col.id} // It's better to use unique IDs than index for keys
                    title={col.name}
                    image={col.cover_image}
                  />
                ))}
              </ul>
            </div>
          )}
          {activeTab === "Vinyls" && (
            <div>
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
          )}
          {activeTab === "Likes" && <div>Likes content...</div>}
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default UserProfilePage;
