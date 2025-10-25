const axios = require("axios");

/**
 * Controller function to handle AI chat requests using the Gemini API.
 * @param {object} req - Express request object (expects req.body.message)
 * @param {object} res - Express response object
 */
const aiChat = async (req, res) => {
  // 1. API Key Check
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Better to return 500 for a server-side configuration issue
    console.error("Gemini API key not configured in environment variables.");
    return res.status(500).json({ message: "Gemini API key not configured." });
  }

  // 2. API Endpoint
  // Using the gemini-1.5-flash model as specified in the original code
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  // 3. System Instruction/Persona
  const systemInstructionText =
    "You are a dietitian, food nutritionist, and fitness consultant. You provide expert guidance and advice to individuals facing dietary challenges or seeking direction on their food choices and exercise routines. You offer personalized recommendations and solutions to those who are unsure about the right foods to eat or the appropriate exercises to engage in. If the user says hello or any greeting, introduce yourself.";

  // 4. Correct Request Body Structure
  const body = {
    // FIX 1: The 'contents' array must contain objects with a 'role' (e.g., 'user')
    contents: [
      {
        role: "user",
        parts: [
          {
            // FIX 2: Only send the user's message as the text
            text: req.body.message,
          },
        ],
      },
    ],
    // FIX 3: Use the 'config' object with 'systemInstruction' for setting the persona
    config: {
      systemInstruction: systemInstructionText,
    },
  };

  // 5. API Call and Error Handling
  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response contains content
    if (response.data.candidates && response.data.candidates.length > 0) {
      // The path to the text content
      const aiResponseText = response.data.candidates[0].content.parts[0].text;
      res.json(aiResponseText);
    } else {
      // Handle cases where the API returns a success status but no content (e.g., blocked prompt)
      console.warn("Gemini API returned no content for the request.");
      res.status(400).json("Could not generate a response for this message.");
    }
  } catch (error) {
    // Detailed error logging is crucial for debugging
    const errorMessage = error.response
      ? error.response.data
      : error.message;
    console.error("Error calling Gemini API:", errorMessage);

    // Send a generic error back to the client
    res.status(500).json("Internal server error when communicating with AI.");
  }
};

module.exports = {
  aiChat,
};
