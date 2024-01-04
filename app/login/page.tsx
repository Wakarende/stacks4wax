"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';

export default function Page(){
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const signInWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
      console.error('Error logging in:', error);
    } else {
        console.log("User signed in: ", data);
      router.push('/dashboard'); // Redirect to the dashboard upon successful login
    }
    setLoading(false);
  };
    return(
    <div className="flex justify-center items-start pt-12 h-screen">
        <div className="bg-white p-8  w-full max-w-md">
            <h2 className="text-2xl font-bold mb-8">Log in</h2>
            <form onSubmit={signInWithEmail} className="space-y-4">
                
                <p className="text-sm">
                    Do not have an account? <Link href="/signup"className="text-green hover:underline">Sign up</Link>
                </p>
                <div>
                    <label htmlFor="email" className="block text-sm  text-gray-400">
                    Email Address
                    </label>
                    <input 
                    id="email" 
                    type="email" 
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
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 focus:outline-none focus:border-gray-300 block w-full rounded-md sm:text-sm focus:ring-1"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                    <label className="flex items-center">
                        <input 
                        type="checkbox" 
                        className="form-checkbox h-4 w-4 text-green"
                        />
                        <span className="ml-2 text-sm text-gray-400">Remember Me</span>
                    </label>
                    </div>
                    <div>
                    <a href="#" className="text-sm text-green hover:underline">
                        Lost your password?
                    </a>
                    </div>
                </div>
                <div>
                    <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-green rounded-md shadow-sm text-sm font-medium text-green bg-white hover:bg-green hover:text-white focus:outline-none"
                    >
                    {loading? 'Logging In..' : 'Log In'}
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}