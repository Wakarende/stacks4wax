"use client";

const ProfileTabs = ({ onSelectTab, activeTab }) => {
  const tabs = [
    { name: "Collections", count: 76 },
    { name: "Vinyls", count: 4 },
    { name: "Likes", count: 5 },
    { name: "Followers", count: 5 },
    { name: "Following", count: 5 },
  ];

  return (
    <div className="flex justify-center space-x-4 border-b ">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`px-4 py-2 text-sm ${
            activeTab === tab.name ? "border-b-2 border-green" : ""
          }`}
          onClick={() => onSelectTab(tab.name)}
        >
          {tab.name} <span>({tab.count})</span>
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
