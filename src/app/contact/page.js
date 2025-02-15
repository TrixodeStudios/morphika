"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Dynamically import Lottie (to prevent SSR issues)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  // Load Lottie animation only on client side
  useEffect(() => {
    import("../../assets/Animation.json")
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Simulate form submission (Replace with backend API later)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#10131C] text-white px-6 py-12">
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-3xl opacity-40 animate-pulse"></div>

      {/* Lottie Animation */}
      {/* Removed Lottie animation from the main contact page */}
      {/* {animationData && (
        <div className="absolute inset-0 w-full h-full z-0 flex justify-center items-center">
          <Lottie animationData={animationData} loop autoplay />
        </div>
      )} */}

      {/* Page Header */}
      <section className="w-full max-w-4xl text-center py-5">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Have questions? Reach out and we'll be happy to help!
        </p>
      </section>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl">
        {/* Contact Form */}
        <div className="relative z-10 w-full md:w-1/2 md:mr-4">
          {/* Lottie Animation */}
          {animationData && (
            <div className="absolute inset-0 z-0">
              <Lottie animationData={animationData} loop autoplay />
            </div>
          )}

          <div className="bg-[#191e2d] p-8 rounded-lg border border-gray-500 shadow-md backdrop-blur-md bg-opacity-60">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {success && (
              <p className="mt-4 text-green-400 text-center">
                ✅ Your message has been sent successfully!
              </p>
            )}
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mt-6 md:mt-0 w-full md:w-1/2">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "10px" }}
              center={{ lat: 37.7749, lng: -122.4194 }} // Set to your actual location
              zoom={12}
            >
              <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Contact Links */}
      <div className="mt-8 md:mt-6 w-full text-center text-gray-400 flex flex-col items-center">
        <p className="mb-2">Email: <span className="text-blue-400">support@morphika.io</span></p>
        <p className="mb-2">Phone: <span className="text-blue-400">+1 234 567 890</span></p>
        <p>Follow us on 
          <a href="#" className="text-blue-400 hover:text-blue-300 ml-2">Twitter</a> | 
          <a href="#" className="text-blue-400 hover:text-blue-300 ml-2">LinkedIn</a>
        </p>
      </div>

    </div>
  );
}
