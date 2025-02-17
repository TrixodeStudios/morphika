"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userPlan, setUserPlan] = useState("starter");
  const [trainsAvailable, setTrainsAvailable] = useState(5);
  const [photosAvailable, setPhotosAvailable] = useState(50);
  const [existingModels, setExistingModels] = useState([]);
  const [modelName, setModelName] = useState("");
  const [newModelName, setNewModelName] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  // ✅ Fetch authenticated user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchUserPlan(user.id);
        fetchModels(user.id);
      } else {
        router.push("/auth");
      }
    };
    getUser();
  }, [router]);

  // ✅ Fetch user's plan and available resources
  const fetchUserPlan = async (uid) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("plan, trains_available, photos_available")
        .eq("id", uid)
        .single();
      if (error) throw error;

      setUserPlan(data.plan);
      setTrainsAvailable(data.trains_available);
      setPhotosAvailable(data.photos_available);
    } catch (error) {
      console.error("Error fetching user plan:", error);
    }
  };

  // ✅ Fetch models
  const fetchModels = async (uid) => {
    try {
      const { data, error } = await supabase.storage
        .from("morphika-images")
        .list(`models/${uid}`, { limit: 100 });
      if (error) throw error;
      setExistingModels(data.map(folder => folder.name));
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  // ✅ Fetch images for selected model (for previews)
  const fetchUploadedImages = async (selectedModel) => {
    if (!userId || !selectedModel) return;

    setImageLoading(true);
    try {
      const { data, error } = await supabase
        .storage
        .from("morphika-images")
        .list(`models/${userId}/${selectedModel}`, { limit: 100 });

      if (error) throw error;

      // Generate only valid image URLs
      const imageUrls = data
        .filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
        .map(file => supabase.storage
          .from("morphika-images")
          .getPublicUrl(`models/${userId}/${selectedModel}/${file.name}`).data.publicUrl);

      setUploadedImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
      setUploadedImages([]);
    } finally {
      setImageLoading(false);
    }
  };

  // ✅ Handle New Model Creation
  const handleCreateModel = async () => {
    if (!newModelName) {
      alert("Enter a model name.");
      return;
    }

    // Check if user reached model limit
    const modelLimit = userPlan === "pro" ? 100 : userPlan === "business" ? 25 : 5;
    if (existingModels.length >= modelLimit) {
      alert("You have reached your model limit. Upgrade your plan.");
      return;
    }

    try {
      // Create an empty file to initialize the folder
      const dummyFile = new Blob([""], { type: "text/plain" });
      const filePath = `models/${userId}/${newModelName}/init.txt`;

      const { error } = await supabase
        .storage
        .from("morphika-images")
        .upload(filePath, dummyFile, { upsert: true });

      if (error) {
        console.error("Error creating model:", error);
        alert("Error creating model.");
        return;
      }

      // Refresh models
      fetchModels(userId);
      setNewModelName("");
      alert("Model created successfully!");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // ✅ Handle Image Upload
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length || !userId || !modelName) return;

    if (uploadedImages.length + files.length > photosAvailable) {
      alert("You don't have enough available photo slots.");
      return;
    }

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

      const publicUrl = supabase.storage
        .from("morphika-images")
        .getPublicUrl(filePath).data.publicUrl;

      uploadedImageUrls.push(publicUrl);
    }

    setUploadedImages(uploadedImageUrls);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#10131C] text-white p-8">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 bg-[#191e2d] rounded-lg">
        <h2 className="text-2xl font-bold">Plan: {userPlan.toUpperCase()}</h2>
        <p>Models: {existingModels.length}/{userPlan === "pro" ? 100 : userPlan === "business" ? 25 : 5}</p>
        <p>Trains Available: {trainsAvailable}</p>
        <p>Photos Available: {photosAvailable}</p>

        <input
          type="text"
          value={newModelName}
          onChange={(e) => setNewModelName(e.target.value)}
          placeholder="New model name"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg mt-4"
        />
        <button onClick={handleCreateModel} className="w-full py-2 bg-green-500 rounded-lg mt-2">
          Create Model
        </button>

        <button className="w-full py-2 bg-yellow-500 rounded-lg mt-4">Upgrade Plan</button>
        <button className="w-full py-2 bg-blue-500 rounded-lg mt-2">Buy More Trains</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Manage AI Models</h1>

        <select onChange={(e) => { 
          setModelName(e.target.value); 
          fetchUploadedImages(e.target.value); 
        }} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg">
          <option value="">Select Model</option>
          {existingModels.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>

        <input type="file" multiple accept="image/*" className="mt-4" onChange={handleImageUpload} />
        
        {/* ✅ Show Image Previews */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {imageLoading ? (
            <p className="text-gray-400">Loading images...</p>
          ) : uploadedImages.length > 0 ? (
            uploadedImages.map((img, index) => (
              <div key={index} className="relative group">
                <img 
                  src={img} 
                  alt={`Model image ${index + 1}`}
                  className="w-full h-40 rounded-lg border border-gray-700 object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No images found for this model.</p>
          )}
        </div>
      </main>
    </div>
  );
}
