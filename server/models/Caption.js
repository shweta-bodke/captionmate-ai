const mongoose = require("mongoose");

const captionSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true
    },

    tone: {
      type: String,
      required: true
    },

    platform: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      required: true
    },

    hashtags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Caption", captionSchema);