import { enhancePrompt } from "../services/prompt.service.js";
import { generateImage } from "../services/image.service.js";
import { generateCopy } from "../services/copy.service.js";
import { addBranding } from "../services/branding.service.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";
import Campaign from "../models/Campaign.js";
import axios from "axios";

export const generateCampaign = async (req, res) => {
  try {
    const { prompt, tone, ctaText = "Shop Now", logoUrl } = req.body;

    if (!prompt || !tone) {
      return res.status(400).json({
        error: "prompt and tone are required"
      });
    }

    // Generate enhanced prompt, image, and copy in parallel
    const [enhancedPrompt, imageBase64, copy] = await Promise.all([
      enhancePrompt(prompt),
      generateImage(await enhancePrompt(prompt)),
      generateCopy(prompt, tone)
    ]);

    // Convert base64 to buffer for branding
    let imageBuffer;
    if (imageBase64.startsWith('data:image')) {
      const base64Data = imageBase64.split(',')[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      const imageResponse = await axios.get(imageBase64, { responseType: 'arraybuffer' });
      imageBuffer = imageResponse.data;
    }

    // Add branding if logo or CTA provided
    let finalImageBuffer = imageBuffer;
    if (logoUrl || ctaText) {
      finalImageBuffer = await addBranding(imageBuffer, logoUrl, ctaText);
    }

    // Upload to Cloudinary (with fallback)
    let imageUrl;
    try {
      imageUrl = await uploadToCloudinary(finalImageBuffer);
    } catch (uploadError) {
      console.error('Cloudinary upload failed, using base64:', uploadError);
      // Fallback to base64 if Cloudinary fails
      imageUrl = `data:image/png;base64,${finalImageBuffer.toString('base64')}`;
    }

    // Save to database
    const campaign = new Campaign({
      prompt,
      enhancedPrompt,
      tone,
      imageUrl,
      caption: copy.caption,
      hashtags: copy.hashtags,
      ctaText,
      logoUrl
    });

    await campaign.save();

    return res.status(200).json({
      success: true,
      campaignId: campaign._id,
      image: imageUrl,
      caption: copy.caption,
      hashtags: copy.hashtags,
      enhancedPrompt
    });

  } catch (error) {
    console.error('Campaign generation error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || "Campaign generation failed"
    });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 }).limit(20);
    res.json({
      success: true,
      campaigns
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: "Campaign not found"
      });
    }

    res.json({
      success: true,
      campaign
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const remixCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { promptVariation } = req.body;

    const originalCampaign = await Campaign.findById(id);
    if (!originalCampaign) {
      return res.status(404).json({
        success: false,
        error: "Original campaign not found"
      });
    }

    // Create variation prompt
    const variationPrompt = promptVariation || `${originalCampaign.prompt} with slight variations`;

    // Generate new campaign with variation
    const [enhancedPrompt, imageBase64, copy] = await Promise.all([
      enhancePrompt(variationPrompt),
      generateImage(await enhancePrompt(variationPrompt)),
      generateCopy(variationPrompt, originalCampaign.tone)
    ]);

    // Convert and brand image
    let imageBuffer;
    if (imageBase64.startsWith('data:image')) {
      const base64Data = imageBase64.split(',')[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      const imageResponse = await axios.get(imageBase64, { responseType: 'arraybuffer' });
      imageBuffer = imageResponse.data;
    }

    let finalImageBuffer = imageBuffer;
    if (originalCampaign.logoUrl || originalCampaign.ctaText) {
      finalImageBuffer = await addBranding(imageBuffer, originalCampaign.logoUrl, originalCampaign.ctaText);
    }

    // Upload new image
    const imageUrl = await uploadToCloudinary(finalImageBuffer);

    // Save new campaign
    const newCampaign = new Campaign({
      prompt: variationPrompt,
      enhancedPrompt,
      tone: originalCampaign.tone,
      imageUrl,
      caption: copy.caption,
      hashtags: copy.hashtags,
      ctaText: originalCampaign.ctaText,
      logoUrl: originalCampaign.logoUrl
    });

    await newCampaign.save();

    res.json({
      success: true,
      campaignId: newCampaign._id,
      image: imageUrl,
      caption: copy.caption,
      hashtags: copy.hashtags,
      enhancedPrompt
    });
  } catch (error) {
    console.error('Remix error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
