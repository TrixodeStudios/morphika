"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function TrainModelPage() {
  const [images, setImages] = useState([]);
  const [modelName, setModelName] = useState("");
  const [trainingStatus, setTrainingStatus] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length < 8 || files.length > 15) {
      alert("Please upload between 8 and 15 images.");
      return;
    }
    setImages(files);
  };

  // Upload images to Replicate and start training
  const handleTrainModel = async () => {
    if (!modelName || images.length < 8) {
      alert("Please provide a model name and at least 8 images.");
      return;
    }

    setLoading(true);
    setTrainingStatus("Uploading images...");

    try {
      // Upload images to a cloud storage (or Replicate-compatible endpoint)
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          // Replace with your actual upload endpoint
          const { data } = await axios.post("/api/upload", formData);
          return data.url;
        })
      );

      setTrainingStatus("Starting model training...");

      // Call Replicate API to train LoRA model
      const { data } = await axios.post("https://api.replicate.com/v1/predictions", {
        version: "flux-dev-lora-training",
        input: { images: imageUrls, model_name: modelName },
      }, {
        headers: {
          Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      setTrainingStatus("Training started... This may take a few minutes.");
      setSelectedModel(data.id);

    } catch (error) {
      console.error("Training error:", error);
      alert("Failed to start model training.");
    }

    setLoading(false);
  };

  // Generate images using trained model
  const handleGenerateImages = async () => {
    if (!selectedModel) {
      alert("No model selected.");
      return;
    }

    setLoading(true);
    setGeneratedImages([]);

    try {
      const { data } = await axios.post("https://api.replicate.com/v1/predictions", {
        version: "flux-dev-image-generation",
        input: { model_id: selectedModel, prompt: "A high-quality product photo on a white background." },
      }, {
        headers: {
          Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      setGeneratedImages(data.output);

    } catch (error) {
      console.error("Generation error:", error);
      alert("Failed to generate images.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#10131C] text-white px-6 py-12">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 blur-3xl opacity-50 animate-pulse"></div>

      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl text-center py-10"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Train Your AI Model
        </h1>
        <p className="text-lg text-gray-400 mt-4">
          Upload images and train a custom AI model for your product.
        </p>
      </motion.section>

      {/* Model Training Form */}
      <div className="bg-[#191e2d] p-8 rounded-lg border border-gray-700 shadow-md w-full max-w-2xl">
        <label className="block text-lg font-medium mb-4">Model Name:</label>
        <input
          type="text"
          className="w-full p-3 bg-white/5 border border-white/10 rounded-lg mb-4"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          placeholder="E.g., Red Candle AI"
        />

        <label className="block text-lg font-medium mb-4">Upload Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full mb-4"
          onChange={handleFileChange}
        />

        <button 
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-all"
          onClick={handleTrainModel}
          disabled={loading}
        >
          {loading ? "Training..." : "Train Model"}
        </button>

        {trainingStatus && <p className="text-gray-400 mt-4">{trainingStatus}</p>}
      </div>

      {/* Image Generation Section */}
      {selectedModel && (
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Generate Product Images</h2>
          <button 
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all"
            onClick={handleGenerateImages}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Images"}
          </button>
        </div>
      )}

      {/* Display Generated Images */}
      {generatedImages.length > 0 && (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6">
          {generatedImages.map((img, index) => (
            <img key={index} src={img} alt="Generated" className="rounded-lg shadow-lg" />
          ))}
        </div>
      )}

    </div>
  );
}
