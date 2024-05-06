"use client";
import { useAuth } from "../../hooks/useAuth";

export default function TestAuthComponent() {
  const { user, loading, error } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{user ? `Logged in as ${user.email}` : "Not logged in"}</div>;
}
