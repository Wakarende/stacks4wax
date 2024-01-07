"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";

interface HeaderProps {
  isCollapsed: boolean;
}
export default function Header({isCollapsed}: HeaderProps){
    return(
    <header className="flex justify-between items-center py-4 px-8 bg-white border sticky top-0">
      <div className="flex-1 relative ">
        {/* Search bar */}
        <input
          type="search"
          placeholder="Search..."
          className="w-full pl-4 pr-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <BsSearch className="text-gray-400" />
        </div>
      </div>
      <div className="flex-1">
        <div className="relative"></div>
      </div>
      <div className="flex gap-4">
     
        {/* Right side of the header for auth buttons */}
        <button className=" rounded-md text-white bg-green  hover:underline focus:outline-none w-20">
          <Link href="/login" className="text-sm">
           Login
          </Link>
        </button>
        <button className="w-20 py-1 rounded-md text-green border border-green  hover:underline focus:ring-blue-500">
          <Link href="/signup" className="text-sm">
            Sign up
          </Link>
        </button>
      </div>
    </header>
    );
}