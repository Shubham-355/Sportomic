require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const aiRoutes = require('./routes/aiRoutes');

// Environment variables
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Log the environment
console.log(`Server running in ${NODE_ENV} mode`);

// AI Routes
app.use('/api/ai', aiRoutes);

// In-memory data store - updated to match Sportomic's real venues
const venues = [
  { id: 1, name: 'Kabir Sports Academy', location: 'Bopal, Ahmedabad' },
  { id: 2, name: 'AB Box Cricket', location: 'South Bopal, Ahmedabad' },
  { id: 3, name: 'Karmaveer Education and Sports Federation', location: 'Koba, Gandhinagar' },
  { id: 4, name: 'BCCA Box Cricket', location: 'Chandkheda, Ahmedabad' },
  { id: 5, name: 'Eagle Pickleball', location: 'Mumatpura, Ahmedabad' },
  { id: 6, name: 'Crick Buddies Box Cricket', location: 'Satellite, Ahmedabad' },
  { id: 7, name: 'Paradise Box Cricket', location: 'Danilimda, Ahmedabad' },
  { id: 8, name: 'Spinters Club', location: 'Shela, Ahmedabad' }
];

// Updated sports list based on Sportomic offerings
const sports = ['Cricket', 'Football', 'Badminton', 'Tennis', 'Basketball', 'Pickleball'];

// Generate time slots from 6 AM to 10 PM
const generateTimeSlots = () => {
  const slots = [];
  // Morning slots
  for (let hour = 6; hour < 12; hour++) {
    slots.push({
      time: `${hour}:00 - ${hour + 1}:00`,
      period: 'Morning'
    });
  }
  // Afternoon slots
  for (let hour = 12; hour < 17; hour++) {
    slots.push({
      time: `${hour}:00 - ${hour + 1}:00`,
      period: 'Afternoon'
    });
  }
  // Evening slots
  for (let hour = 17; hour < 23; hour++) {
    slots.push({
      time: `${hour}:00 - ${hour + 1}:00`,
      period: 'Evening'
    });
  }
  return slots;
};

// Generate available slots for all venues
let availableSlots = {};

venues.forEach(venue => {
  availableSlots[venue.id] = {};
  
  // Generate slots for the next 7 days
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate slots with REDUCED booking probability to show more available slots
    availableSlots[venue.id][dateStr] = generateTimeSlots().map(slot => {
      // Significantly reduced booking probability for testing purposes
      let bookingProbability;
      if (slot.period === 'Morning') {
        bookingProbability = 0.15;  // Only 15% chance morning slots are booked
      } else if (slot.period === 'Afternoon') {
        bookingProbability = 0.25;  // Only 25% chance afternoon slots are booked
      } else {
        bookingProbability = 0.35;  // Only 35% chance evening slots are booked
      }
      
      // For first day, make even more slots available for immediate testing
      if (i === 0) {
        bookingProbability = bookingProbability / 2;  // Cut the booking probability in half
      }
      
      // Make specific venues more available for testing (venue IDs 1-3)
      if (venue.id <= 3) {
        bookingProbability = bookingProbability * 0.6;  // 40% fewer bookings on test venues
      }
      
      return {
        time: slot.time,
        period: slot.period,
        isBooked: Math.random() > (1 - bookingProbability)
      };
    });
  }
});

// Booking history
const bookings = [];

// Add a tracking mechanism for user activity
let lastActivityTimestamp = Date.now();
let simulationActive = false;
let simulationInterval = null;

// Function to update activity timestamp
const updateActivity = () => {
  lastActivityTimestamp = Date.now();
  
  // Start simulation if not already running
  if (!simulationActive) {
    startSimulation();
  }
};

// Function for simulated bookings
const simulateRandomBooking = () => {
  // Check if there's been inactivity for more than 5 minutes (300000ms)
  // If so, stop the simulation to save resources
  if (Date.now() - lastActivityTimestamp > 300000) {
    stopSimulation();
    return;
  }
  
  // Check if it's during booking hours (6 AM to 10 PM)
  const currentHour = new Date().getHours();
  if (currentHour < 6 || currentHour >= 22) {
    // Outside of booking hours, don't simulate
    return;
  }

  // Reduce the chance of random bookings happening
  if (Math.random() > 0.7) { // Only 30% chance to even attempt a booking
    const randomVenue = venues[Math.floor(Math.random() * venues.length)];
    const dates = Object.keys(availableSlots[randomVenue.id]);
    const randomDate = dates[Math.floor(Math.random() * dates.length)];
    
    const availableSlotIndices = availableSlots[randomVenue.id][randomDate]
      .map((slot, index) => ({ index, isBooked: slot.isBooked, period: slot.period }))
      .filter(slot => !slot.isBooked)
      .map(slot => slot.index);
    
    if (availableSlotIndices.length > 0) {
      const randomSlotIndex = availableSlotIndices[Math.floor(Math.random() * availableSlotIndices.length)];
      availableSlots[randomVenue.id][randomDate][randomSlotIndex].isBooked = true;
      
      const bookedSlot = availableSlots[randomVenue.id][randomDate][randomSlotIndex];
      console.log(`Simulated booking: Venue ${randomVenue.name}, Date ${randomDate}, Slot ${bookedSlot.time} (${bookedSlot.period})`);
    }
  }
};

// Function to start the simulation
const startSimulation = () => {
  if (simulationActive) return;
  
  console.log('Starting booking simulation due to user activity');
  simulationActive = true;
  simulationInterval = setInterval(simulateRandomBooking, 15000);
};

// Function to stop the simulation
const stopSimulation = () => {
  if (!simulationActive) return;
  
  console.log('Stopping booking simulation due to inactivity');
  simulationActive = false;
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
};

// Routes
app.get('/api/venues', (req, res) => {
  updateActivity(); // Track user activity
  res.json(venues);
});

app.get('/api/sports', (req, res) => {
  updateActivity(); // Track user activity
  res.json(sports);
});

app.get('/api/slots', (req, res) => {
  updateActivity(); // Track user activity
  const { venueId, date } = req.query;
  
  if (!venueId || !date || !availableSlots[venueId] || !availableSlots[venueId][date]) {
    return res.status(400).json({ error: 'Invalid venue ID or date' });
  }
  
  res.json(availableSlots[venueId][date]);
});

app.post('/api/book', (req, res) => {
  updateActivity(); // Track user activity
  const { venueId, date, time, userName, sport } = req.body;
  
  if (!venueId || !date || !time || !userName || !sport) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (!availableSlots[venueId] || !availableSlots[venueId][date]) {
    return res.status(400).json({ error: 'Invalid venue or date' });
  }
  
  // Find the slot
  const slotIndex = availableSlots[venueId][date].findIndex(slot => 
    slot.time === time && !slot.isBooked
  );
  
  if (slotIndex === -1) {
    return res.status(400).json({ error: 'Slot is not available' });
  }
  
  // Mark slot as booked
  availableSlots[venueId][date][slotIndex].isBooked = true;
  
  // Add to bookings
  const booking = {
    id: Date.now(),
    venueId,
    date,
    time,
    userName,
    sport,
    venueName: venues.find(v => v.id == venueId)?.name
  };
  
  bookings.push(booking);
  
  res.status(201).json(booking);
});

// Add an endpoint to manually control simulation
app.post('/api/control-simulation', (req, res) => {
  const { action } = req.body;
  
  if (action === 'start') {
    updateActivity();
    res.json({ status: 'Simulation started', active: true });
  } else if (action === 'stop') {
    stopSimulation();
    res.json({ status: 'Simulation stopped', active: false });
  } else {
    res.status(400).json({ error: 'Invalid action. Use "start" or "stop".' });
  }
});

// Add an endpoint to check simulation status
app.get('/api/simulation-status', (req, res) => {
  res.json({
    active: simulationActive,
    lastActivity: new Date(lastActivityTimestamp).toISOString(),
    inactiveFor: `${Math.floor((Date.now() - lastActivityTimestamp) / 60000)} minutes`
  });
});

// Add an endpoint to clear bookings for testing purposes
app.post('/api/reset-slots', (req, res) => {
  const { venueId, date } = req.body;
  
  // If specific venue and date are provided, clear only those slots
  if (venueId && date) {
    if (availableSlots[venueId] && availableSlots[venueId][date]) {
      availableSlots[venueId][date] = availableSlots[venueId][date].map(slot => ({
        ...slot,
        isBooked: false // Mark all slots as available
      }));
      return res.json({ message: `All slots for venue ${venueId} on ${date} have been reset.` });
    } else {
      return res.status(400).json({ error: 'Invalid venue ID or date' });
    }
  }
  
  // If no specific venue/date, clear all bookings for today
  const today = new Date().toISOString().split('T')[0];
  let resetCount = 0;
  
  venues.forEach(venue => {
    if (availableSlots[venue.id] && availableSlots[venue.id][today]) {
      availableSlots[venue.id][today] = availableSlots[venue.id][today].map(slot => {
        if (slot.isBooked) resetCount++;
        return {
          ...slot,
          isBooked: false
        };
      });
    }
  });
  
  res.json({ 
    message: `Reset ${resetCount} slots for today (${today}).`,
    date: today
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`More slots available for testing. Visit http://localhost:${PORT}/api/slots?venueId=1&date=${new Date().toISOString().split('T')[0]} to see available slots.`);
  console.log(`AI endpoints available at http://localhost:${PORT}/api/ai/`);
  console.log('Booking simulation will start automatically when users access the API');
});
