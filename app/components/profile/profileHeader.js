"use client";

import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";

const ProfileHeader = () => {
  const { user } = useAuth();
  // Dummy data for the profile
  const profileData = {
    avatarUrl: "/Damn.jpg",
    name: user.username,
  };
  return (
    <div className="flex flex-row items-center mb-4">
      <Image
        className="rounded-full"
        src={profileData.avatarUrl}
        alt="Avatar"
        width={124}
        height={124}
      />
      <div className="mx-5">
        <h1 className="text-xl font-semibold mb-2">{profileData.name}</h1>
        <p className="text-sm text-gray-600">{profileData.description}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
