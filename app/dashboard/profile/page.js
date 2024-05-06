"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/app/components/profile/profileHeader";
import ProfileTabs from "@/app/components/profile/profileTabs";
import ProtectedLayout from "./protected-layout";
import { useAuth } from "../../hooks/useAuth";

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

  if (loading) {
    return <div>Is this shit working...</div>;
  }

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
        <p>Welcome, {user.displayName || user.email}</p>
        <ProfileHeader />
        <ProfileTabs onSelectTab={handleSelectTab} activeTab={activeTab} />
        <div className="py-4">
          {activeTab === "Collections" && (
            <div>Collections content for {user.email}</div>
          )}
          {activeTab === "Vinyls" && <div>Vinyls content...</div>}
          {activeTab === "Likes" && <div>Likes content...</div>}
          {activeTab === "Followers" && <div>Followers content...</div>}
          {activeTab === "Following" && <div>Following content...</div>}
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default UserProfilePage;
