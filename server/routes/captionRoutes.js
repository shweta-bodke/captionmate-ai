const express = require("express");
const Caption = require("../models/Caption");
const { generateCaption } = require("../services/geminiService");

const router = express.Router();

// POST - Generate and save caption
router.post("/", async (req, res) => {
  try {
    const { topic, tone, platform } = req.body;

    if (!topic || !tone || !platform) {
      return res.status(400).json({
        message: "Topic, tone, and platform are required"
      });
    }

    const aiResponse = await generateCaption(
      topic,
      tone,
      platform
    );

    const newCaption = new Caption({
  topic,
  tone,
  platform,
  caption: aiResponse.caption,
  hashtags: aiResponse.hashtags
});

    const savedCaption = await newCaption.save();

    res.status(201).json(savedCaption);

  } catch (error) {
    console.error("Caption generation failed:", error.message);

    res.status(500).json({
      message: "Failed to generate caption",
      error: error.message
    });
  }
});

// GET - Get all saved captions
router.get("/", async (req, res) => {
  try {
    const captions = await Caption.find().sort({ createdAt: -1 });

    res.status(200).json(captions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch captions",
      error: error.message
    });
  }
});

module.exports = router;