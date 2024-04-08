"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { supabase } from "../utils/supabaseClient";
import Page from "./welcome/page";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function Home({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={user}>
      <main className="flex max-h-screen flex-col items-center justify-between">
        <Page />
      </main>
    </AuthContext.Provider>
  );
}
