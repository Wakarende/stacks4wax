// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ProfileHeader from "@/app/components/profile/profileHeader";
// import ProfileTabs from "@/app/components/profile/profileTabs";
// import { useAuth } from "../page";

// const UserProfilePage = () => {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Collections"); // Default active tab
//   const user = useAuth();
//   const handleSelectTab = (tabName) => {
//     setActiveTab(tabName);
//   };

//   useEffect(() => {
//     // If no user is logged in, redirect to the login page
//     if (user === null) {
//       router.push("/login"); // Adjust the path to your login route as necessary
//     }
//   }, [user, router]);

//   return (
//     <div className="container mx-auto my-8">
//       <ProfileHeader />
//       <ProfileTabs onSelectTab={handleSelectTab} activeTab={activeTab} />
//       <div className="py-4">
//         {activeTab === "Collections" && <div>Collections content for...</div>}
//         {activeTab === "Vinyls" && <div>Vinyls content...</div>}
//         {activeTab === "Likes" && <div>Likes content...</div>}
//         {activeTab === "Followers" && <div>Followers content...</div>}
//         {activeTab === "Following" && <div>Following content...</div>}
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;
