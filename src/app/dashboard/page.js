"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [modelName, setModelName] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // Store the  checking/11111logged-in user's ID

  // 🔹 Fetch authenticated user details
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        console.log("User ID:", user.id);
      } else {
        router.push("/auth"); // Redirect to login if not authenticated
      }
    };
    getUser();
  }, [router]);

  // 🔹 Fetch previously uploaded images
  const fetchUploadedImages = async () => {
    if (!userId || !modelName) return;

    try {
      // Fetch file list from Supabase Storage
      const { data, error } = await supabase
        .storage
        .from("morphika-images")
        .list(`models/${userId}/${modelName}`, { limit: 100 });

      if (error) throw error;

      // Generate correct public URLs
      const imageUrls = data.map((file) => {
        return `${supabase.storage
          .from("morphika-images")
          .getPublicUrl(`models/${userId}/${modelName}/${file.name}`).data.publicUrl}`;
      });

      console.log("Fetched Image URLs:", imageUrls);
      setUploadedImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (modelName) {
      fetchUploadedImages();
    }
  }, [modelName, userId]);

  // 🔹 Handle Image Upload to Supabase
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length || !userId || !modelName) return;

    setLoading(true);
    let uploadedImageUrls = [...uploadedImages];

    for (let file of files) {
      const filePath = `models/${userId}/${modelName}/${file.name}`;

      const { data, error } = await supabase.storage
        .from("morphika-images")
        .upload(filePath, file, { upsert: true });

      if (error) {
        console.error("Upload error:", error.message || "Unknown error", error);
        setLoading(false);
        return;
      }

      const publicUrl = `${supabase.storage
        .from("morphika-images")
        .getPublicUrl(filePath).data.publicUrl}`;

      uploadedImageUrls.push(publicUrl);
    }

    console.log("Uploaded Images Count:", uploadedImageUrls.length);
    setUploadedImages(uploadedImageUrls);
    setLoading(false);
  };

  // 🔹 Train Model with Replicate API
  const handleTrainModel = async () => {
    if (!modelName || uploadedImages.length < 8) {
      alert("Please enter a model name and upload at least 8 images.");
      return;
    }

    setLoading(true);

    try {
      // Store model metadata in Supabase
      const { error: insertError } = await supabase
        .from("models")
        .insert([
          {
            user_id: userId,
            model_name: modelName,
            description,
            images: uploadedImages,
          },
        ]);

      if (insertError) throw insertError;

      // Send training request to Replicate API
      const response = await axios.post(
        "https://api.replicate.com/v1/train",
        {
          model: "FLUX-DEV",
          images: uploadedImages,
          description,
        },
        {
          headers: {
            Authorization: `Token YOUR_REPLICATE_API_KEY`,
          },
        }
      );

      const loraFileUrl = response.data.output; // The trained LoRA model file

      // Store the LoRA model file in Supabase
      const { error: loraError } = await supabase
        .from("models")
        .update({ lora_file: loraFileUrl })
        .eq("model_name", modelName);

      if (loraError) throw loraError;

      alert("Model training started! Check back later.");
    } catch (error) {
      console.error("Training error:", error);
      alert("Error training model. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("Logged out successfully");
      router.push("/auth");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#10131C] text-white p-8">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 bg-[#191e2d] rounded-r-lg backdrop-blur-lg border border-gray-700">
        <h2 className="text-2xl font-bold">Current Plan: Start</h2>
        <p className="mt-2 text-gray-400"># Trains: 0/5</p>
        <p className="text-gray-400"># Pictures: {uploadedImages.length}/25</p>
        <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg mt-4">
          Add Train
        </button>
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg mt-4"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Create AI Model</h1>

        {/* Model Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300">Name:</label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg"
              placeholder="Model Name"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <h2 className="text-xl font-semibold mt-6">Upload Your Pictures:</h2>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="mt-4" />

        {/* Display previously uploaded images */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {uploadedImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Uploaded Image"
              className="w-24 h-24 rounded-lg border border-gray-700 object-cover"
              onError={(e) => console.error("Image failed to load:", img)}
            />
          ))}
        </div>

        {/* Train Model Button */}
        <button
          onClick={handleTrainModel}
          className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Training Model..." : "Train Model"}
        </button>
      </main>
    </div>
  );
}
