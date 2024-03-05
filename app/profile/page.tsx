'use client';
import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaEnvelope, FaSoundcloud, FaInstagram, FaEllipsisH } from 'react-icons/fa';

const UserProfilePage = () => {
  // Replace with actual data fetched from your backend or state management
  const userProfile = {
    name: 'Jack Orion',
    bio: 'Download & license original tracks directly from independent artists for your content. Support indie artists using our artist-first platform. Royalty Free',
    profilePicUrl: 'https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjB3b21hbiUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D', // Replace with actual image URL
    socialLinks: {
      facebook: 'https://facebook.com/',
      twitter: 'https://twitter.com/',
      email: 'mailto:email@example.com',
      soundcloud: 'https://soundcloud.com/',
      instagram: 'https://instagram.com/',
    },
    stats: {
      collections:1,
      albums:2
    },
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 relative">
          <Image src={userProfile.profilePicUrl} alt={userProfile.name} layout="fill" objectFit="cover" className="rounded-full" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{userProfile.name}</h1>
          <p className='text-gray-500 w-[512px] mb-4' >{userProfile.bio}</p>
          <div className="flex space-x-4 mt-2">
            <a href={userProfile.socialLinks.facebook}><FaFacebookF /></a>
            <a href={userProfile.socialLinks.twitter}><FaTwitter /></a>
            <a href={userProfile.socialLinks.email}><FaEnvelope /></a>
            <a href={userProfile.socialLinks.soundcloud}><FaSoundcloud /></a>
            <a href={userProfile.socialLinks.instagram}><FaInstagram /></a>
            <FaEllipsisH />
          </div>
        </div>
      </div>

      <div className="flex mt-6 space-x-8">
        <p>Collections: {userProfile.stats.collections}</p>
        <p>Albums: {userProfile.stats.albums}</p>
      </div>
    </div>
  );
};

export default UserProfilePage;