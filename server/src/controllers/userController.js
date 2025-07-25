// Example controller to handle user routes
const { SendPrompt } = require("../../AIchat");

const getUsers = (req, res) => {
  // Simulating a database call
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];

  res.status(200).json({ users });
};

const sendResponse = async (req, res) => {
  const { prompt } = req.body;
  console.log(req.body);
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is missing or empty" });
  }

  try {
    const aiResponse = await SendPrompt(prompt);

    res.status(201).json({ data: aiResponse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get AI Response", error: error.message });
  }
};

module.exports = { getUsers, sendResponse };
