"use client";
import { useState } from "react";
import ProfileHeader from "@/app/components/profile/profileHeader";
import ProfileTabs from "@/app/components/profile/profileTabs";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Collections"); // Default active tab

  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container mx-auto my-8">
      <ProfileHeader />
      <ProfileTabs onSelectTab={handleSelectTab} activeTab={activeTab} />
      <div className="py-4">
        {/* Content for the active tab goes here, render based on activeTab state */}
        {activeTab === "Collections" && <div>Collections content...</div>}
        {activeTab === "Vinyls" && <div>Vinyls content...</div>}
        {activeTab === "Likes" && <div>Likes content...</div>}
        {activeTab === "Followers" && <div>Followers content...</div>}
        {activeTab === "Following" && <div>Following content...</div>}
      </div>
    </div>
  );
};

export default UserProfilePage;
