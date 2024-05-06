"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

const ProtectedLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login page if not authenticated
      router.push("/dashboard/login");
    }
  }, [loading, user, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Redirecting to login...</div>;

  return <>{children}</>;
};

export default ProtectedLayout;
