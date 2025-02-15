"use client";

import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#10131C] text-white px-6 py-12 overflow-hidden">
      
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-3xl opacity-50 animate-pulse"></div>

      {/* Features Header */}
      <motion.section 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center py-10"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Morphika Features
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          AI-powered product imagery for online stores. Train models, generate images, and elevate your brand.
        </p>
      </motion.section>

      {/* How It Works Section */}
      <section className="w-full max-w-6xl grid md:grid-cols-3 gap-8 py-12">
        
        {[
          { title: "📸 Train Your Model", desc: "Upload 8-15 images of your product, and let AI train a custom LoRA model." },
          { title: "🖼️ Generate Product Images", desc: "Use AI-powered prompts to generate high-quality product images in any setting." },
          { title: "🚀 Boost Your Brand", desc: "Get stunning visuals that fit your brand identity—no expensive photoshoots needed." }
        ].map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-[#191e2d] p-6 rounded-lg border border-gray-700 text-center hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-semibold">{feature.title}</h2>
            <p className="text-gray-300 mt-3">{feature.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* Key Benefits Section */}
      <section className="w-full max-w-6xl py-20 text-center relative">
        <h2 className="text-4xl font-bold mb-8">Why Choose Morphika?</h2>
        
        {/* Floating Blurred Background */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-900 blur-[150px] opacity-40"></div>

        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          
          {[
            { title: "⚡ Instant Content Creation", desc: "Save time with AI-generated product images tailored to your brand." },
            { title: "🎨 Customizable AI Models", desc: "Train a unique LoRA model for each product and create unlimited variations." },
            { title: "💰 Cost-Effective", desc: "Reduce expenses on photography and design—AI does the work for you." },
            { title: "📈 Scalable for eCommerce", desc: "Whether you're a small shop or a large retailer, Morphika adapts to your needs." }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#191e2d] p-8 rounded-lg border border-gray-700 hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold">{benefit.title}</h3>
              <p className="text-gray-400 mt-3">{benefit.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* Example Use Cases Section */}
      <section className="w-full max-w-6xl py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-12">
          
          {[
            { title: "🛒 eCommerce Stores", desc: "Create product images that match your brand without expensive photoshoots." },
            { title: "📱 Social Media Branding", desc: "Generate high-quality marketing visuals that stand out on Instagram & Facebook." },
            { title: "🖥️ Product Mockups", desc: "Showcase different variations of your products in realistic AI-generated environments." }
          ].map((useCase, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#191e2d] p-6 rounded-lg border border-gray-700 text-center hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold">{useCase.title}</h3>
              <p className="text-gray-400 mt-3">{useCase.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center py-20"
      >
        <h2 className="text-4xl font-bold">Ready to start creating?</h2>
        <p className="text-lg text-gray-400 mt-4">
          Sign up today and transform your product imagery with AI.
        </p>
        <a 
          href="/registration"
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium transition-all hover:scale-105"
        >
          Get Started →
        </a>
      </motion.section>

    </div>
  );
}
