import express from "express";
import {
  generateCampaign,
  getCampaigns,
  getCampaign,
  remixCampaign
} from "../controllers/campaign.controller.js";

const router = express.Router();

// Generate new campaign
router.post("/generate", generateCampaign);

// Get all campaigns
router.get("/", getCampaigns);

// Get single campaign
router.get("/:id", getCampaign);

// Remix existing campaign
router.post("/:id/remix", remixCampaign);

export default router;
