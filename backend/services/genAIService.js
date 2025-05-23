const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(apiKey);

// Default system prompt for the assistant
const defaultSystemPrompt = `You are SportBot, a helpful assistant for Sportomic, a sports venue booking platform. 
Your goal is to help users book sports venues, answer questions about sports available, 
explain booking procedures, and provide information about facilities. 

FORMAT YOUR RESPONSES:
- Use **bold text** for important information, headings, and emphasis
- Use *italic text* for subtle emphasis or sport names
- Use bullet lists (with - prefix) for listing options or features
- Use numbered lists (with 1. prefix) for sequential instructions
- Keep responses concise and focused on sports venue booking

Current sports offered:
- Cricket
- Football
- Badminton
- Tennis
- Basketball
- Pickleball

Keep responses under 150 words unless details are specifically requested.`;

/**
 * Gets a response from the Gemini model
 * @param {string} userInput - The user's message
 * @param {Array} chatHistory - Previous messages in the conversation
 * @param {string} systemPrompt - Optional custom system prompt
 * @returns {Promise<string>} The AI's response text
 */
async function getChatResponse(userInput, chatHistory = [], systemPrompt = defaultSystemPrompt) {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Format chat history for Gemini API
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    // Start chat with history and system instruction
    const chat = model.startChat({
      history: formattedHistory,
      systemInstruction: systemPrompt,
    });

    // Send the user's message and get a response
    const result = await chat.sendMessage(userInput);
    return result.response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response");
  }
}

/**
 * Gets sport recommendations based on user preferences
 * @param {Object} preferences - User preferences for sports
 * @returns {Promise<Array>} Recommended sports
 */
async function getSportRecommendations(preferences) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Create a prompt based on user preferences
    const prompt = `Based on the following preferences, recommend the best sport matches:
    - Experience level: ${preferences.experienceLevel || 'Any'}
    - Physical intensity preferred: ${preferences.intensity || 'Any'}
    - Indoor or outdoor preference: ${preferences.environment || 'Any'}
    - Team or individual sport preference: ${preferences.teamOrIndividual || 'Any'}
    - Age: ${preferences.age || 'Adult'}
    
    Choose from these available sports: Cricket, Football, Badminton, Tennis, Basketball, and Pickleball.
    Return your answer as a JSON array of sport names, ordered by best match first.`;

    // Get a response
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse the JSON response
    // The response might contain text around the JSON, so we need to extract just the JSON part
    const jsonMatch = responseText.match(/\[.*\]/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if JSON parsing fails
    return responseText.includes("Cricket") ? ["Cricket"] : 
           responseText.includes("Football") ? ["Football"] : 
           responseText.includes("Badminton") ? ["Badminton"] : 
           responseText.includes("Tennis") ? ["Tennis"] : 
           responseText.includes("Basketball") ? ["Basketball"] : 
           responseText.includes("Pickleball") ? ["Pickleball"] : 
           ["Cricket", "Football", "Badminton"];
  } catch (error) {
    console.error("Error generating sport recommendations:", error);
    return ["Cricket", "Football", "Badminton"]; // Fallback recommendations
  }
}

/**
 * Analyzes booking patterns to suggest optimal booking times
 * @param {Array} bookingHistory - Array of previous bookings
 * @returns {Promise<Object>} Optimal booking times and analysis
 */
async function analyzeBookingPatterns(bookingHistory) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Create a prompt with the booking history
    const prompt = `Analyze this booking history and suggest optimal booking times:
    ${JSON.stringify(bookingHistory)}
    
    Provide your analysis as a JSON object with these properties:
    1. "peakHours": Array of busiest time slots
    2. "optimalTimes": Array of recommended booking times with high availability
    3. "popularSports": Object mapping sports to their popularity scores
    4. "summary": Brief text summary of the analysis`;

    // Get a response
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse the JSON response
    const jsonMatch = responseText.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if JSON parsing fails
    return {
      peakHours: ["18:00", "19:00"],
      optimalTimes: ["10:00", "14:00", "16:00"],
      popularSports: { "Cricket": 0.8, "Football": 0.7 },
      summary: "Evenings tend to be busiest. Mornings and afternoons typically have better availability."
    };
  } catch (error) {
    console.error("Error analyzing booking patterns:", error);
    return {
      peakHours: ["18:00", "19:00"],
      optimalTimes: ["10:00", "14:00", "16:00"],
      popularSports: { "Cricket": 0.8, "Football": 0.7 },
      summary: "Error analyzing patterns. These are default recommendations."
    };
  }
}

module.exports = {
  getChatResponse,
  getSportRecommendations,
  analyzeBookingPatterns
};
