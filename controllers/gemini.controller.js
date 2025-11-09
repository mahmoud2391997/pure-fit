const axios = require("axios");

const aiChat = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "Gemini API key not configured." });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstructionText =
    "You are a dietitian, food nutritionist, and fitness consultant. You provide expert guidance and advice to individuals facing dietary challenges or seeking direction on their food choices and exercise routines. You offer personalized recommendations and solutions to those who are unsure about the right foods to eat or the appropriate exercises to engage in. If the user says hello or any greeting, introduce yourself.";

  // ✅ The correct structure for Gemini generateContent API
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
  };

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ✅ Safely handle response structure
    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";
    res.json({ reply });
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Internal server error when communicating with AI." });
  }
};

module.exports = { aiChat };
