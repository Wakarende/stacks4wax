"use client";
import Link from "next/link";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useRouter } from "next/navigation";

import Logo from "../logo/logo";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  PiSquaresFourLight,
  PiVinylRecordLight,
  PiHeartStraight,
  PiPlaylistFill,
} from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { Button, Card, CardBody } from "@nextui-org/react";

export default function SideNav({ collapsed, setCollapsed }) {
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
            <Link legacyBehavior href="/">
              <a>
                <Logo />
              </a>
            </Link>
            <p className="font-bold"></p>
          </div>
        )}
        {/* Burger Icon for collapsing */}
        <span onClick={toggleCollapsed} className="flex items-center">
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
              <Link legacyBehavior href="dashboard/signup">
                <a className="border border-green text-green text-center hover:bg-green hover:text-white rounded-md mt-4 px-3 py-1">
                  Sign Up
                </a>
              </Link>
            </CardBody>
          </Card>
        </div>
      )}
      <Menu className="bg-sidebar">
        {/* Main items */}
        <MenuItem icon={<PiSquaresFourLight className="text-green" />}>
          <Link legacyBehavior href="/dashboard">
            <a className="text-sm">{!collapsed && "Dashboard"}</a>
          </Link>
        </MenuItem>
        <MenuItem icon={<PiVinylRecordLight className="text-green" />}>
          <Link legacyBehavior href="/dashboard">
            <a className="text-sm">{!collapsed && "Browse"}</a>
          </Link>
        </MenuItem>
        {/* My Collection */}
        {!collapsed && (
          <p className="text-xs text-hamburger mt-4">My Collection</p>
        )}
        <MenuItem icon={<PiHeartStraight className="text-green" />}>
          <Link legacyBehavior href="/dashboard/liked">
            <a className="text-sm">
              {/* Updated usage */}
              {!collapsed && "Liked Tracks"}
            </a>
          </Link>
        </MenuItem>
        <MenuItem icon={<PiVinylRecordLight className="text-green" />}>
          <Link legacyBehavior href="/dashboard/vinyls">
            <a className="text-sm">
              {/* Updated usage */}
              {!collapsed && "Vinyls"}
            </a>
          </Link>
        </MenuItem>
        <MenuItem icon={<PiPlaylistFill className="text-green" />}>
          <Link legacyBehavior href="/dashboard/collections">
            <a className="text-sm">{!collapsed && "Collections"}</a>
          </Link>
        </MenuItem>
        <MenuItem icon={<GoPerson className="text-green" />}>
          <Link legacyBehavior href="/dashboard/profile">
            <a className="text-sm">{!collapsed && "Profile"}</a>
          </Link>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
