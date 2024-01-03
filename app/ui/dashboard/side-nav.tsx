'use client';
import Link from 'next/link';
import {useState} from 'react';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '../acme-logo';
import { useRouter } from 'next/navigation';
import { PowerIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { FiHome, FiHeart, FiRadio, FiMenu, FiSettings } from 'react-icons/fi';
export default function SideNav() {
   const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const navigation = [
    { name: 'Discover', icon: FiHome },
    { name: 'Browse', icon: FiRadio },
    { name: 'My Collection', icon: FiHeart },
    // ... other navigation items
  ];

  return (
    // <div className="flex h-full flex-col px-3 py-4 md:px-2">
    //   <Link
    //     className="mb-2 flex h-20 items-end justify-start rounded-md bg-green p-4 md:h-40"
    //     href="/"
    //   >
    //     <div className="w-32 text-white md:w-40">
    //       <Logo />
    //     </div>
    //   </Link>
    //   <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
    //     <NavLinks />
    //     <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
    //     <form>
    //       <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-green md:flex-none md:justify-start md:p-2 md:px-3">
    //         <PowerIcon className="w-6" />
    //         <div className="hidden md:block">Sign Out</div>
    //       </button>
    //     </form>
    //   </div>
    // </div>
     <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <FiMenu className="hamburger-icon" onClick={toggleSidebar} />
        <h1>MusicOn</h1>
      </div>
      <div className="nav-links">
        {navigation.map((item, index) => (
          <Link key={index} href={`/${item.name.toLowerCase()}`}>
            <a className={`nav-item ${router.pathname === `/${item.name.toLowerCase()}` ? 'active' : ''}`}>
              <item.icon className="icon" />
              {!collapsed && <span className="link-text">{item.name}</span>}
            </a>
          </Link>
        ))}
      </div>
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="settings">
            <FiSettings className="icon" />
            <span className="link-text">Settings</span>
          </div>
        )}
      </div>
    </div>
  );
}
