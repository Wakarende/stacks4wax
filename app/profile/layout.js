"use client";
import { useState } from "react";
import SideNav from "../ui/sidenav/sidenav";
import Header from "../ui/header/header";

export default function Layout({ children }) {
  // State to manage sidebar collapse
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to update the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Side Navigation */}
      <div
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } flex-none transition-all duration-300`}
      >
        <SideNav
          collapsed={isSidebarCollapsed}
          setCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Main content + Header */}
      <div className="flex flex-col flex-grow">
        <Header isCollapsed={isSidebarCollapsed} onSearch={handleSearch} />
        <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </main>
      </div>
    </div>
  );
}
