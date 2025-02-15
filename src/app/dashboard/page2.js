"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const { data: userData, error } = await supabase.auth.getUser();
      if (userData?.user) {
        setUser(userData.user);
        fetchSubscription(userData.user.id);
      }
    }

    async function fetchSubscription(userId) {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .single();
      
      if (data) {
        setSubscription(data);
      }
    }

    fetchUser();
  }, []);

  const handleSubscribe = async (plan) => {
    setLoading(true);
    const stripe = await stripePromise;

    const { data, error } = await supabase.functions.invoke("create-stripe-session", {
      body: { plan, email: user.email },
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#10131C] text-white px-6 py-12">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-3xl opacity-50 animate-pulse"></div>

      {/* Dashboard Header */}
      <motion.section 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center py-10"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome, {user?.email || "User"}
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Manage your AI-generated product images & models below.
        </p>
      </motion.section>

      {/* Show Subscription Status */}
      {subscription ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#191e2d] p-6 rounded-lg border border-gray-700 text-center shadow-md"
        >
          <h2 className="text-2xl font-semibold">Your Plan: {subscription.plan}</h2>
          <p className="text-gray-400 mt-2">Status: {subscription.status}</p>
        </motion.div>
      ) : (
        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          {["Starter", "Team", "Pro"].map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#191e2d] p-8 rounded-lg border border-gray-700 text-center shadow-md hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-xl font-semibold mb-4">{plan} Plan</h2>
              <button 
                onClick={() => handleSubscribe(plan)}
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all"
                disabled={loading}
              >
                {loading ? "Processing..." : "Subscribe"}
              </button>
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}
