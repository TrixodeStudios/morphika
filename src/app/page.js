"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import AboutContent from './about/page'; // Import the content from about/page.js

// Import Lottie dynamically (avoids SSR issues)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LandingPage() {
  const [animationData, setAnimationData] = useState(null);

  // Load animation only on the client side


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#10131C] text-white px-6 overflow-hidden">
      
      {/* Only Render Lottie if animationData is Loaded */}
      {animationData && (
        <div className="absolute top-0 left-0 w-full h-full opacity-100 flex items-center justify-center pointer-events-none backdrop-blur-lg bg-white/30 rounded-lg">
          <Lottie animationData={animationData} loop autoplay speed={0.5} />
        </div>
      )}

      <h1 className="text-5xl font-bold mb-6 relative z-10">Welcome to Morphika</h1>
      
      <p className="text-xl text-gray-400 mb-8 text-center max-w-2xl relative z-10">
        AI-powered product image creation at your fingertips. Train AI models and generate high-quality content effortlessly.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex gap-4 relative z-10">
        <Link 
          href="/auth" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition transform hover:scale-105"
        >
          Get Started
        </Link>
        
        <Link 
          href="/about"
          className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition transform hover:scale-105"
        >
          Learn More
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-20 relative z-10" id="features">
        <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg transition transform hover:scale-105">
            <h3 className="text-xl font-bold mb-3">AI Model Training</h3>
            <p className="text-gray-400">Train AI models for your product imagery.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg transition transform hover:scale-105">
            <h3 className="text-xl font-bold mb-3">Instant Image Generation</h3>
            <p className="text-gray-400">Generate product mockups in seconds.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg transition transform hover:scale-105">
            <h3 className="text-xl font-bold mb-3">High-Resolution Quality</h3>
            <p className="text-gray-400">Download high-quality AI-generated images.</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-20 relative z-10" id="about">
        <h2 className="text-3xl font-bold mb-6 text-center"></h2>
        <div className="text-gray-400 text-center max-w-2xl mx-auto">
          <AboutContent />
        </div>
      </div>
    </div>
  );
}
