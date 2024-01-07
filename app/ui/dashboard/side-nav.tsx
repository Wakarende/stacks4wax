'use client';
import Link from 'next/link';
import {useState} from 'react';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useRouter } from 'next/navigation';
import { PowerIcon} from '@heroicons/react/24/outline';
import Logo from '../logo';
import { GiHamburgerMenu } from "react-icons/gi";
import { PiSquaresFourLight, PiVinylRecordLight, PiHeartStraight, PiPlaylistFill, PiVinylRecordDuotone } from "react-icons/pi";
import { Button, Card, CardBody } from "@nextui-org/react";

interface SideNavProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function SideNav({collapsed, setCollapsed} : SideNavProps) {
  // const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const router = useRouter();
  return (
    <Sidebar collapsed={collapsed} className="bg-sidebar h-screen p-3">
      <div className="sidebar-header flex items-center justify-between h-18 mb-4">
        {/* Logo */}
        {!collapsed && (
          <div className="flex items-center mb-4">
            <Link href="/">
              <Logo/>
            </Link>
            <p className="font-bold"></p>
          </div>
        )}
        {/* Burger Icon for collapsing */}
        <span onClick={toggleCollapsed} className=" flex items-center">
          <GiHamburgerMenu className="text-hamburger text-lg" />
        </span>
      </div>

      {/* Sign Up Card */}
      {!collapsed && (
        <div className="signup-card mb-4">
          <Card className="bg-white rounded-md">
            <CardBody>
              <p className="font-bold mb-4">Sign Up Now</p>
              <p className="text-hamburger text-sm">
                Follow your favorite artists and create unlimited playlists.
              </p>
              <Link href="/signup" className='border border-green text-green text-center hover:bg-green hover:text-white rounded-md mt-4 px-3 py-1'>
                  Sign Up
              </Link>
            </CardBody>
          </Card>
        </div>
      )}
      <Menu className="bg-sidebar">
        {/* Main items */}
        <MenuItem icon={<PiSquaresFourLight className="text-green" />}>
          <Link href="/dashboard" className=" text-sm">
            {!collapsed && "Dashboard"}
          </Link>
        </MenuItem>
        <MenuItem icon={<PiVinylRecordLight className="text-green" />}>
          <Link href="/dashboard" className="text-sm">
            {!collapsed && "Browse"}
          </Link>
        </MenuItem>
        {/* My Collection */}
        {!collapsed && (
          <p className="text-xs text-hamburger mt-4">My Collection</p>
        )}
        <MenuItem icon={<PiHeartStraight className="text-green" />}>
          <Link href="/dashboard/liked" className="text-sm">
            {/* Updated usage */}
           {!collapsed && "Liked Tracks"}
          </Link>
        </MenuItem>
        <MenuItem icon={<PiVinylRecordLight className="text-green" />}>
          <Link href="/dashboard/vinyls" className="text-sm" >
            {/* Updated usage */}
           {!collapsed && "Vinyls"}
          </Link>
        </MenuItem>
        <MenuItem icon={<PiPlaylistFill className="text-green" />}>
          <Link href="/dashboard/collections" className="text-sm" >
            {!collapsed && "Collections"}
          </Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
