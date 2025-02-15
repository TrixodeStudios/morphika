"use client";

import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#10131C] text-white px-6 py-12 overflow-hidden">
      
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-3xl opacity-50 animate-pulse"></div>

      {/* Pricing Header */}
      <motion.section 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center py-10"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Pricing
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Start for free. Upgrade to get the capacity that matches your needs.
        </p>
      </motion.section>

      {/* Pricing Cards Container */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        
        {[
          { title: "🚀 Starter", price: "$20", desc: "For individuals starting out.", features: ["Everything in Free, plus:", "Generate up to 100 images/month", "5 product LoRA model trainings", "Email support"], button: "Try Now" },
          { title: "💼 Team", price: "$50", desc: "For small businesses & teams.", features: ["Everything in Starter, plus:", "Generate up to 500 images/month", "20 product LoRA model trainings", "Priority email & chat support"], button: "Get Started" },
          { title: "🔥 Pro", price: "$100", desc: "For large-scale businesses.", features: ["Everything in Team, plus:", "Unlimited AI image generation", "50+ product LoRA model trainings", "Dedicated account manager"], button: "Contact Us" }
        ].map((plan, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-[#191e2d] p-8 rounded-lg border border-gray-700 text-center shadow-md hover:scale-105 transition-transform duration-300 relative overflow-hidden"
          >
            {/* Floating Blurred Glow */}
            <div className="absolute inset-0 bg-blue-900/10 blur-[120px] opacity-30"></div>

            <h2 className="text-xl font-semibold mb-4">{plan.title}</h2>
            <p className="text-4xl font-bold">{plan.price}<span className="text-lg">/month</span></p>
            <p className="text-gray-400 mt-2">{plan.desc}</p>
            <ul className="mt-6 text-gray-300 space-y-3 text-sm text-left">
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all">
              {plan.button}
            </button>
          </motion.div>
        ))}

      </section>

      {/* Floating Glow Effect */}
      <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-900 blur-[150px] opacity-40"></div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-10">
        * All plans include free updates and access to new AI features.
      </p>

    </div>
  );
}
