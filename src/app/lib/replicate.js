import Replicate from "replicate";

// Initialize Replicate API client
const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

/**
 * Trains a model using Replicate API.
 * @param {string} userId - The user ID from Supabase authentication.
 * @param {string} modelName - The name of the model.
 * @param {array} imageUrls - Array of image URLs for training.
 * @returns {Promise<object>} - The response from Replicate API.
 */
export const trainModel = async (userId, modelName, imageUrls) => {
  try {
    // Ensure the user has at least 8 images before training
    if (imageUrls.length < 8) {
      throw new Error("At least 8 images are required for training.");
    }

    // Send training request to Replicate API
    const training = await replicate.trainings.create(
      "ostris", // Replicate model namespace (change if needed)
      "flux-dev-lora-trainer",
      "b6af14222e6bd9be257cbc1ea4afda3cd0503e1133083b9d1de0364d8568e6ef",
      {
        destination: `morphika/${userId}/${modelName}`,
        input: {
          steps: 1000,
          lora_rank: 16,
          optimizer: "adamw8bit",
          batch_size: 1,
          resolution: "512,768,1024",
          autocaption: true,
          input_images: imageUrls,
          trigger_word: modelName.toUpperCase(), // Use model name as trigger word
          learning_rate: 0.0004,
          wandb_project: "flux_train_replicate",
          wandb_save_interval: 100,
          caption_dropout_rate: 0.05,
          cache_latents_to_disk: false,
          wandb_sample_interval: 100,
          gradient_checkpointing: false
        }
      }
    );

    return training; // Return the training response from Replicate
  } catch (error) {
    console.error("Replicate Training Error:", error);
    throw new Error("Error training model with Replicate.");
  }
};
