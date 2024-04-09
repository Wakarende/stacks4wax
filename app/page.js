"use client";

import { useEffect, useState, useContext, createContext } from "react";
import Page from "./welcome/page";

export const AuthContext = createContext();

export default function Home() {
  return (
    <AuthContext.Provider>
      <main className="flex max-h-screen flex-col items-center justify-between">
        <Page />
      </main>
    </AuthContext.Provider>
  );
}
