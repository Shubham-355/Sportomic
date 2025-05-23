const express = require('express');
const router = express.Router();
const genAIService = require('../services/genAIService');

// Route for chat completions
router.post('/chat', async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const response = await genAIService.getChatResponse(message, chatHistory || []);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Route for sport recommendations
router.post('/recommend-sports', async (req, res) => {
  try {
    const { preferences } = req.body;
    
    if (!preferences) {
      return res.status(400).json({ error: 'Preferences are required' });
    }
    
    const recommendations = await genAIService.getSportRecommendations(preferences);
    res.json({ recommendations });
  } catch (error) {
    console.error('Error in sport recommendations endpoint:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Route for analyzing booking patterns
router.post('/analyze-bookings', async (req, res) => {
  try {
    const { bookingHistory } = req.body;
    
    if (!bookingHistory || !Array.isArray(bookingHistory)) {
      return res.status(400).json({ error: 'Valid booking history array is required' });
    }
    
    const analysis = await genAIService.analyzeBookingPatterns(bookingHistory);
    res.json(analysis);
  } catch (error) {
    console.error('Error in booking analysis endpoint:', error);
    res.status(500).json({ error: 'Failed to analyze booking patterns' });
  }
});

module.exports = router;
