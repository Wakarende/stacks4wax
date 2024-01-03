"use client";
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Page(){
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signUpNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from refreshing
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'http://localhost:3000/dashboard'
      }
    });

    if (error) {console.error('Error signing up:', error);
    } else {
        console.log('User signed up:', data);
        router.push('/dashboard');
    }

    setLoading(false);
  };
    return(
    <div className="flex justify-center items-start pt-12 h-screen">
      <div className="bg-white p-8  w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8">Create an account</h2>

        <form onSubmit={signUpNewUser} className="space-y-4">
          <div>
            <p className="text-sm">
              Already have an account? <Link href="/login"className="text-green hover:underline">Login</Link>
            </p>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm  text-gray-400">
              Email Address
            </label>
            <input 
              id="username" 
              type="text" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="mt-1 px-3 py-2 bg-white border  border-gray-300  focus:outline-none focus:border-gray-300 block w-full rounded-md sm:text-sm focus:ring-1"
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
              onChange={(e)=> setPassword(e.target.value)}
              required
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 focus:outline-none focus:border-gray-300 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <div>
            <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-green rounded-md shadow-sm text-sm font-medium text-green  bg-white hover:bg-green hover:text-white focus:outline-none"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>)
}