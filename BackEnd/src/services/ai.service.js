// gmeini ki api ki integration krna ka code

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function generateContent(prompt) {
  try {
    // Check if API key is available
    if (!process.env.GOOGLE_GEMINI_KEY) {
      throw new Error('GOOGLE_GEMINI_KEY environment variable is not set');
    }    // Get the model - Using Gemini 2.5 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create the prompt with system instructions
    const fullPrompt = `You are a code reviewer who has expertise in development. You look for the code and find the problems and then suggest the solution to developer. You always suggest the solution in a very simple way so that developer can understand it easily.

User Request: ${prompt || "Explain how AI works in a few words"}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

module.exports = { generateContent }; // generateContent function ko export krte hain taake baqi files isko use kar sakein
// Note: Make sure to set the environment variable GOOGLE_GEMINI_KEY with your API key