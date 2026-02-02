import express from "express";
import { generateAdImage } from "../controllers/image.controller.js";
import { generateCampaign, getCampaigns, getCampaign, remixCampaign } from "../controllers/campaign.controller.js";
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting
const campaignLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many campaign generation requests, please try again later.'
});

const imageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 image requests per windowMs
  message: 'Too many image generation requests, please try again later.'
});

// Routes
router.post("/generate-image", imageLimiter, generateAdImage);
router.post("/generate-campaign", campaignLimiter, generateCampaign);
router.get("/campaigns", getCampaigns);
router.get("/campaigns/:id", getCampaign);
router.post("/campaigns/:id/remix", campaignLimiter, remixCampaign);

export default router;
