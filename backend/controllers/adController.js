const Ad = require('../models/Ad');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const cloudinary = require('../config/cloudinary');



exports.generateAd = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // 1. Generate Content with Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const geminiPrompt = `
      You are a creative marketing expert.
      For the product description: "${prompt}", generate the following:
      1. A catchy tagline (max 10 words).
      2. 5 relevant hashtags (start with #).
      
      Output strictly in JSON format like this:
      {
        "tagline": "Your tagline here",
        "tags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"]
      }
    `;

    const result = await model.generateContent(geminiPrompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up JSON string if markdown formatting is present
    const jsonString = text.replace(/```json\n|\n```/g, '').trim();
    const { tagline, tags } = JSON.parse(jsonString);

    // 2. Generate Image with Stability AI
    const stabilityResponse = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      {
        prompt: `Professional product photography of ${prompt}, high quality, commercial advertisement, 4k, detail`,
        output_format: "webp"
      },
      {
        headers: {
            Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
            Accept: "image/*"
        },
        responseType: 'arraybuffer',
      }
    );

    if (stabilityResponse.status !== 200) {
        throw new Error(`Stability AI generation failed: ${stabilityResponse.status}`);
    }

    // 3. Upload to Cloudinary
    const imageBuffer = Buffer.from(stabilityResponse.data);
    const base64Image = `data:image/webp;base64,${imageBuffer.toString('base64')}`;

    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: 'ad_generator',
    });

    const newAd = new Ad({
      prompt,
      imageUrl: uploadResponse.secure_url,
      tags: tags,
      tagline: tagline,
    });

    await newAd.save();

    res.status(201).json(newAd);
  } catch (error) {
    console.error('Error generating ad:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
