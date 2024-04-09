"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { app } from "../../../utils/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUpNewUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed up:", user);
        router.push("/dashboard/login"); // Adjust as necessary
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorCode, errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex justify-center items-start pt-12 h-screen">
      <div className="bg-white p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8">Create an account</h2>

        <form onSubmit={signUpNewUser} className="space-y-4">
          <div>
            <p className="text-sm">
              Already have an account?{" "}
              <Link href="login" className="text-green hover:underline">
                Login
              </Link>
            </p>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email Address
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 px-3 py-2 bg-white border border-gray-300 focus:outline-none focus:border-gray-300 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 focus:outline-none focus:border-gray-300 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green hover:bg-green-dark focus:outline-none"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
