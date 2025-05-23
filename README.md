# Sportomic - Sports Venue Booking Platform

Sportomic is a modern web application for booking sports venues. It allows users to discover venues, select sports, book time slots, and manage their bookings.

## Features

- Browse and search sports venues
- Filter venues by sports offered
- Check real-time availability of time slots
- Book venues for various sports
- View and manage bookings
- AI-powered assistant for customer support

## Technology Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Express.js
- **AI**: Google Gemini 2.0 Flash model
- **State Management**: React Hooks
- **Styling**: Tailwind CSS with custom design system

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm run install:all
   ```
3. Set up environment variables:
   - Create a `.env` file in the `Frontend` directory with:
     ```
     VITE_API_URL=http://localhost:5000/api
     VITE_APP_NAME=Sportomic
     VITE_APP_VERSION=1.0.0
     ```
   - Create a `.env` file in the `backend` directory with:
     ```
     PORT=5000
     CORS_ORIGIN=http://localhost:5173
     NODE_ENV=development
     MONGO_URI=your_database
     VITE_GEMINI_API_KEY=YOUR_API_KEY
     ```
4. Start the development server:
   ```
   npm start
   ```

## ChatBot Assistant

Sportomic includes an AI-powered chatbot built with Google's Gemini 2.0 Flash model. The assistant helps users with:

- Finding appropriate venues
- Understanding booking procedures
- Learning about available sports
- Answering common questions about facilities

To use the chatbot:
1. Click the chat icon in the bottom right corner of any page
2. Type your question or request
3. Receive instant AI-generated assistance

## License

[MIT](LICENSE)
