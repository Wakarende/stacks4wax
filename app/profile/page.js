"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "@/app/components/profile/profileHeader";
import ProfileTabs from "@/app/components/profile/profileTabs";
import { AuthContext } from "../page";

//debugging
const UserProfilePage = () => {
  const user = useContext(AuthContext);
  console.log("Context Value:", user);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Collections"); // Default active tab
  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    // Redirect to login if there is no user
    if (!user) {
      console.log("No user found, redirecting to /login");
      router.push("/dashboard/login");
    }
  }, [user, router]);

  return (
    <div className="container mx-auto my-8">
      <ProfileHeader />
      <ProfileTabs onSelectTab={handleSelectTab} activeTab={activeTab} />
      <div className="py-4">
        {activeTab === "Collections" && <div>Collections content for...</div>}
        {activeTab === "Vinyls" && <div>Vinyls content...</div>}
        {activeTab === "Likes" && <div>Likes content...</div>}
        {activeTab === "Followers" && <div>Followers content...</div>}
        {activeTab === "Following" && <div>Following content...</div>}
      </div>
    </div>
  );
};

export default UserProfilePage;
