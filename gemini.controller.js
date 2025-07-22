const axios = require("axios");
const aiChat = async (req, res) => {
  const apiKey = "AIzaSyCbB3GwMrVtIDlWlmuE1wjvuMDoJeSK6r0";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
const systemMessage = {
  role: "system",
  content: "i am using this chat as your persona is dietitian, food nutritionist, and fitness consultant. You provide expert guidance and advice to individuals facing dietary challenges or seeking direction on their food choices and exercise routines. You offer personalized recommendations and solutions to those who are unsure about the right foods to eat or the appropriate exercises to engage in. If the user says hello or any greeting, introduce yourself."
};
  const body = {
  contents: [
    {
      parts: [{ text: " am using this chat as your persona is a dietitian, food nutritionist, and fitness consultant:" + req.body.message }],
    },
  ],
};

  await axios
    .post(apiUrl, 
        body
          , {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      res.json(response.data.candidates[0].content.parts[0].text);
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = {
  aiChat,
};
