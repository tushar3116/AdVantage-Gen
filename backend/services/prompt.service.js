import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const enhancePrompt = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const promptText = `
    Rewrite the following user prompt into a highly detailed, cinematic description optimized for AI image generation.
    Original prompt: "${prompt}"
    Make it vivid, include elements like lighting, environment, mood, realism, and focus on creating an engaging ad image.
    Output only the enhanced prompt, no additional text.
    `;

    const result = await model.generateContent(promptText);
    const response = await result.response;
    const enhancedPrompt = response.text().trim();

    return enhancedPrompt;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    // Fallback to basic enhancement
    return `Create a highly detailed, cinematic ad image for: ${prompt}. Include realistic lighting, environment, and mood.`;
  }
};
