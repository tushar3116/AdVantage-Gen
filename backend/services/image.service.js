import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateImage = async (enhancedPrompt) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/blackforestlabs/FLUX.1-dev",
      {
        inputs: enhancedPrompt,
        parameters: {
          width: 1024,
          height: 1024,
          num_inference_steps: 20,
          guidance_scale: 7.5,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
        timeout: 60000, // 60 seconds timeout
      }
    );

    // Convert the image buffer to base64 for easy handling
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error("Error generating image:", error);
    // Fallback to dummy image
    return "https://dummyimage.com/600x400/000/fff&text=AI+Ad+Image+Error";
  }
};
