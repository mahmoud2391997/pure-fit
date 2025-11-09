const axios = require("axios");

const aiChat = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "Gemini API key not configured." });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${apiKey}`;

  const systemInstructionText =
    "You are a dietitian, food nutritionist, and fitness consultant. You provide expert guidance and advice to individuals facing dietary challenges or seeking direction on their food choices and exercise routines. You offer personalized recommendations and solutions to those who are unsure about the right foods to eat or the appropriate exercises to engage in. If the user says hello or any greeting, introduce yourself.";

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
      temperature: 0.7,
      topK: 20,
      topP: 0.1,
      maxOutputTokens: 512,
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
    res.json({ reply });
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
