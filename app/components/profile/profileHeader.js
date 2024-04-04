"use client";

import Image from "next/image";

const ProfileHeader = () => {
  // Dummy data for the profile
  const profileData = {
    avatarUrl: "/Damn.jpg", // Replace with your actual image path
    name: "Jack Orion",
    description: "Follow your favorite artists and create unlimited playlists.",
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
