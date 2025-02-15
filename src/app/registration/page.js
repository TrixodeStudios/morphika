"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    businessName: "",
    businessType: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // 🚀 Redirect users if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) router.push("/dashboard");
    };
    checkUser();
  }, []);

  // 🔄 Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔐 Handle Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 🛑 Validate Passwords Match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // 🏆 Register User with Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            business_name: formData.businessName,
            business_type: formData.businessType,
          },
          emailRedirectTo: `${window.location.origin}/auth`, // Verify email before login
        },
      });

      if (signUpError) {
        if (signUpError.message.includes("User already registered")) {
          setError("An account with this email already exists. Try logging in.");
          return;
        }
        throw signUpError;
      }

      alert("Check your email to confirm your registration!");
      router.push("/auth"); // Redirect to login after signup
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const businessTypes = [
    "Retail",
    "E-commerce",
    "Service Provider",
    "Manufacturing",
    "Technology",
    "Other",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#10131C] to-[#191e2d] text-white px-6 py-12">
      <div className="w-full max-w-xl">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Create Your Account
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
              <input
                type="text"
                name="businessName"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Business Type Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Business Type</label>
              <select
                name="businessType"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.businessType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type} className="bg-[#191e2d] text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-8"
            disabled={loading}
          >
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/auth" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign in
          </Link>
        </p>

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
