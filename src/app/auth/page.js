"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // 🚀 Redirect users if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) router.push("/dashboard");
    };
    checkUser();
  }, []);

  // 🔑 Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✨ Signup Function
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          setError("An account with this email already exists. Try logging in.");
          setIsLogin(true);
          return;
        }
        throw error;
      }

      alert("Check your email to confirm your account!");
      setIsLogin(true); // Switch back to login after signup
    } catch (error) {
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔗 Google & GitHub Login
  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setError(error.message || "OAuth login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#10131C] to-[#191e2d] text-white px-6">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleSignUp} className="space-y-6 bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => {
              if (isLogin) {
                // Redirect to registration page
                router.push('/registration');
              }
              setIsLogin(!isLogin);
            }} 
            className="text-blue-400 hover:text-blue-300 transition-colors bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            {isLogin ? "Create account" : "Sign in"}
          </button>
        </p>

        {/* Add margin below the paragraph for more space */}
        <div className="mb-4"></div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#10131C] text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* OAuth Login Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Login with Google
          </button>

          <button
            onClick={() => handleOAuthLogin("github")}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Login with GitHub
          </button>
        </div>

        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="block mt-8 text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
