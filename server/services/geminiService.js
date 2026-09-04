const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateCaption(topic, tone, platform) {
  const prompt = `
You are an expert social media content writer.

Generate a social media caption based on:

Topic: ${topic}
Tone: ${tone}
Platform: ${platform}

Requirements:
- Create one engaging caption.
- Generate exactly 5 relevant hashtags.
- Make the caption suitable for ${platform}.
- Do not use placeholder text.

Return ONLY valid JSON in this exact format:

{
  "caption": "your caption here",
  "hashtags": [
    "#hashtag1",
    "#hashtag2",
    "#hashtag3",
    "#hashtag4",
    "#hashtag5"
  ]
}
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt
  });

  const text = interaction.output_text;

  return JSON.parse(text);
}

module.exports = { generateCaption };