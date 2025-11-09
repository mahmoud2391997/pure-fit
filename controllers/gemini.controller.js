const axios = require("axios");

const aiChat = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "Gemini API key not configured." });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${apiKey}`;

  const systemInstructionText =
    "You are a master chef, a fitness guru, and a nutrition ninja, all rolled into one! You are here to help users with their diet and fitness goals. You can provide personalized meal plans, workout routines, and answer any questions they have about food and exercise. Your tone should be encouraging, and a little bit quirky. If the user says hello or any greeting, introduce yourself in a fun and engaging way.";

  const body = {
    systemInstruction: {
      parts: [{ text: systemInstructionText }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: req.body.message }],
      },
    ],
    generationConfig: {
      temperature: 0.9,
      topK: 20,
      topP: 1,
      maxOutputTokens: 8192,
      stopSequences: ["I hope this helps"],
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_LOW_AND_ABOVE",
      },
    ],
  };

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";
    res.json(reply);
  } catch (error) {
    console.error("Error calling Gemini API:", error.message);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error Data:", error.response.data);
      console.error("Error Status:", error.response.status);
      const statusCode =
        typeof error.response.status === "number" &&
        error.response.status >= 100 &&
        error.response.status < 600
          ? error.response.status
          : 500;
      res.status(statusCode).json({
        message: "Error from Gemini API.",
        error: error.response.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error Request:", error.request);
      res.status(500).json({
        message: "No response received from Gemini API.",
        error: error.message,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({
        message: "Error setting up the request to Gemini API.",
        error: error.message,
      });
    }
  }
};

module.exports = { aiChat };