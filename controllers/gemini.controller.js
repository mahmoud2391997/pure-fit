const axios = require("axios")

const aiChat = async (req, res) => {
  // Use environment variable for API key
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ message: "Gemini API key not configured." })
  }

  // Use the correct, more concise URL for generateContent
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
  
  // Set the persona using systemInstruction in the config
  const systemInstructionText = "You are a dietitian, food nutritionist, and fitness consultant. You provide expert guidance and advice to individuals facing dietary challenges or seeking direction on their food choices and exercise routines. You offer personalized recommendations and solutions to those who are unsure about the right foods to eat or the appropriate exercises to engage in. If the user says hello or any greeting, introduce yourself."

  const body = {
    // FIX 1: Provide the user message with the required 'role' field
    contents: [
      {
        role: "user", 
        parts: [
          { 
            // FIX 2: Only send the user's actual message
            text: req.body.message,
          },
        ],
      },
    ],
    // FIX 3: Use the standard 'config' structure for system instructions
    config: {
      systemInstruction: systemInstructionText,
    }
  }

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    res.json(response.data.candidates[0].content.parts[0].text)
  } catch (error) {
    // Improve error logging to show the actual API error message
    console.error("Error calling Gemini API:", error.response ? error.response.data : error.message)
    
    // The API error response (e.g., 400 Bad Request) is what was likely caught,
    // leading to the 500 status and generic message.
    res.status(500).json("Internal server error when communicating with AI.")
  }
}

module.exports = {
  aiChat,
}
