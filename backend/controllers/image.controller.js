import { enhancePrompt } from "../services/prompt.service.js";
import { generateImage } from "../services/image.service.js";
import { addBranding } from "../services/branding.service.js";
import axios from "axios";

export const generateAdImage = async (req, res) => {
  try {
    const { prompt, logoUrl, ctaText } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "prompt is required"
      });
    }

    const enhancedPrompt = await enhancePrompt(prompt);
    const imageBase64 = await generateImage(enhancedPrompt);

    // If image is base64, convert to buffer for branding
    let imageBuffer;
    if (imageBase64.startsWith('data:image')) {
      const base64Data = imageBase64.split(',')[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      // If it's a URL, fetch it
      const imageResponse = await axios.get(imageBase64, { responseType: 'arraybuffer' });
      imageBuffer = imageResponse.data;
    }

    // Add branding if logoUrl or ctaText is provided
    let finalImage = imageBuffer;
    if (logoUrl || ctaText) {
      finalImage = await addBranding(imageBuffer, logoUrl, ctaText);
    }

    // Convert back to base64 for response
    const finalImageBase64 = `data:image/png;base64,${finalImage.toString('base64')}`;

    res.json({
      success: true,
      image: finalImageBase64,
      enhancedPrompt: enhancedPrompt
    });
  } catch (error) {
    console.error("Image generation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Image generation failed"
    });
  }
};
