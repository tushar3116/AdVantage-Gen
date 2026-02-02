import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const tonePrompts = {
  Witty: "Create a witty, humorous caption that engages the audience with clever wordplay.",
  Professional: "Create a professional, polished caption that conveys expertise and reliability.",
  Urgent: "Create an urgent, compelling caption that creates a sense of scarcity or time pressure.",
  Inspirational: "Create an inspirational, motivational caption that evokes emotion and aspiration.",
};

export const generateCopy = async (prompt, tone) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const copyPrompt = `
    Generate a social media caption and relevant hashtags for an ad campaign based on this prompt: "${prompt}"
    Tone: ${tone}
    ${tonePrompts[tone] || "Create an engaging caption in the specified tone."}
    Caption should be concise (under 150 characters), engaging, and optimized for Instagram/LinkedIn.
    Also generate 5-7 relevant hashtags.
    Output format:
    Caption: [caption text]
    Hashtags: [comma-separated hashtags]
    `;

    const result = await model.generateContent(copyPrompt);
    const response = await result.response;
    const text = response.text().trim();

    // Parse the response
    const captionMatch = text.match(/Caption:\s*(.+?)(?:\n|$)/i);
    const hashtagsMatch = text.match(/Hashtags:\s*(.+?)(?:\n|$)/i);

    const caption = captionMatch ? captionMatch[1].trim() : `${tone} ad copy for ${prompt}`;
    const hashtagsString = hashtagsMatch ? hashtagsMatch[1].trim() : "#AdVantageGen,#AIAds,#Marketing";
    const hashtags = hashtagsString.split(',').map(tag => tag.trim());

    return {
      caption,
      hashtags,
    };
  } catch (error) {
    console.error("Error generating copy:", error);
    // Fallback
    return {
      caption: `${tone} ad copy for ${prompt}`,
      hashtags: ["#AdVantageGen", "#AIAds", "#Marketing"],
    };
  }
};
