import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const ConfirmBookingPage = () => {
  console.log("⭐ ConfirmBookingPage is rendering");
  const location = useLocation();
  console.log("📍 Location state:", location.state);
  
  const navigate = useNavigate();
  const { user, createGuestSession, isAuthenticated, token, openLoginModal } = useAuth();
  const [bookingData, setBookingData] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  
  // Extract booking data from URL state
  useEffect(() => {
    try {
      console.log("🔍 In useEffect, location state:", location.state);
      if (location.state?.bookingData) {
        const data = location.state.bookingData;
        setBookingData(data);
        
        // Pre-fill username if provided or use authenticated user's name
        if (data.userName) {
          setUserName(data.userName);
        } else if (user && user.name) {
          setUserName(user.name);
        }
        
        // If there's time in the booking data, create a slot object
        if (data.time) {
          setSelectedSlot({
            time: data.time,
            period: getPeriodFromTime(data.time)
          });
        } else {
          // Fetch available slots for the venue and date
          fetchAvailableSlots(data.venueId, data.date);
        }
      } else {
        // If no booking data, redirect to home
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error("❌ Error in useEffect:", error);
      navigate('/', { replace: true });
    }
  }, [location, navigate, user]);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      // If not authenticated, open login modal and redirect
      openLoginModal('login');
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate, openLoginModal]);

  // Helper function to determine the period based on time
  const getPeriodFromTime = (timeString) => {
    try {
      const hour = parseInt(timeString.split(':')[0]);
      if (hour < 12) return 'Morning';
      if (hour < 17) return 'Afternoon';
      return 'Evening';
    } catch (e) {
      return 'Afternoon'; // Default fallback
    }
  };

  // Fetch available slots for the venue and date
  const fetchAvailableSlots = async (venueId, date) => {
    if (!venueId || !date) return;
    
    setSlotsLoading(true);
    try {
      const response = await fetch(`${API_URL}/slots?venueId=${venueId}&date=${date}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Only include available slots
      const available = data.filter(slot => !slot.isBooked);
      setAvailableSlots(available);
      
      // If there are available slots, select the first one by default
      if (available.length > 0) {
        setSelectedSlot(available[0]);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setError('Error loading time slots. Please try again.');
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleDateChange = (newDate) => {
    if (bookingData) {
      // Update the booking data with the new date
      setBookingData(prev => ({
        ...prev,
        date: newDate
      }));
      
      // Reset selected slot
      setSelectedSlot(null);
      
      // Fetch available slots for the new date
      fetchAvailableSlots(bookingData.venueId, newDate);
    }
  };

  const handleConfirmBooking = async () => {
    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // If no user yet, create a guest session with the provided name
      if (!user) {
        createGuestSession(userName);
      }

      // Include authorization header with token
      const response = await fetch(`${API_URL}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          venueId: bookingData.venueId,
          date: bookingData.date,
          time: selectedSlot.time,
          userName: userName,
          sport: bookingData.sport,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setBookingResult(data);
        
        // Store in local storage for "My Bookings" page
        const storedBookings = JSON.parse(localStorage.getItem('sportomicBookings') || '[]');
        localStorage.setItem('sportomicBookings', JSON.stringify([...storedBookings, data]));
        
        // After 5 seconds, redirect to bookings page
        setTimeout(() => {
          navigate('/bookings', { 
            state: { newBooking: data } 
          });
        }, 5000);
      } else {
        setError(data.error || 'Failed to complete booking');
      }
    } catch (error) {
      console.error('Error booking slot:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleModifyBooking = () => {
    // Return to home with booking data to pre-fill the form
    navigate('/', { 
      state: { 
        venueId: bookingData.venueId,
        sport: bookingData.sport,
        date: bookingData.date,
        modifying: true
      } 
    });
  };

  // Group slots by period for display
  const groupedSlots = {
    Morning: availableSlots.filter(slot => slot.period === 'Morning'),
    Afternoon: availableSlots.filter(slot => slot.period === 'Afternoon'),
    Evening: availableSlots.filter(slot => slot.period === 'Evening')
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#ddffe7] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  // Generate dates for the next 7 days
  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    
    return dates;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-12 bg-[#ddffe7]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {success ? 'Booking Confirmed!' : 'Confirm Your Booking'}
            </motion.h1>
            
            <motion.div 
              className="w-16 h-1 bg-[#ddffe7] mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {success ? (
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#ddffe7]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#ddffe7] p-6 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-800">Booking Confirmed!</h2>
                <p className="text-green-700 mt-1">Your booking has been successfully confirmed.</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Venue:</span>
                          <span className="font-medium text-gray-800">{bookingResult.venueName}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Sport:</span>
                          <span className="font-medium text-gray-800">{bookingResult.sport}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium text-gray-800">{new Date(bookingResult.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium text-gray-800">{bookingResult.time}</span>
                        </div>
                        <div className="flex justify-between pb-3">
                          <span className="text-gray-600">Booked By:</span>
                          <span className="font-medium text-gray-800">{bookingResult.userName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Information</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Booking ID:</span>
                          <span className="font-medium text-gray-800">#{bookingResult.id.toString().slice(-6)}</span>
                        </div>
                        <div className="flex justify-between pb-3 border-b border-gray-200">
                          <span className="text-gray-600">Status:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Confirmed</span>
                        </div>
                        <div className="pt-3">
                          <p className="text-gray-600 text-sm">
                            A confirmation has been sent to your device. Please arrive 15 minutes before your slot time.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex flex-col space-y-3">
                        <button 
                          onClick={() => navigate('/bookings')}
                          className="w-full py-2.5 bg-[#ddffe7] text-green-800 rounded-lg font-medium hover:bg-[#c3f8d4] transition shadow-sm"
                        >
                          View My Bookings
                        </button>
                        <button 
                          onClick={() => navigate('/')}
                          className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                        >
                          Return to Home
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#ddffe7] flex items-center justify-center text-2xl mr-4">
                          {bookingData.sportEmoji || "🏆"}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800">{bookingData.venueName}</h4>
                          <p className="text-gray-500">{bookingData.sport}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">Select Date</label>
                          <select 
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-[#ddffe7] focus:border-[#ddffe7]"
                            value={bookingData.date}
                            onChange={(e) => handleDateChange(e.target.value)}
                          >
                            {getNextWeekDates().map(date => (
                              <option key={date.value} value={date.value}>
                                {date.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-gray-700 font-medium mb-2">Select Time Slot</label>
                          {slotsLoading ? (
                            <div className="flex justify-center py-4">
                              <div className="w-8 h-8 border-2 border-gray-200 border-t-[#ddffe7] rounded-full animate-spin"></div>
                            </div>
                          ) : bookingData.time && selectedSlot ? (
                            // If time is already provided in booking data
                            <div className="py-3 px-4 rounded-lg border text-center bg-[#ddffe7] border-[#ddffe7] text-green-800 shadow-sm">
                              {bookingData.time}
                            </div>
                          ) : availableSlots.length > 0 ? (
                            <div className="space-y-3">
                              {Object.entries(groupedSlots).map(([period, slots]) => (
                                slots.length > 0 && (
                                  <div key={period} className="mb-3">
                                    <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                      <span className="w-6 h-6 rounded-full bg-[#ddffe7]/20 flex items-center justify-center mr-2 text-xs">
                                        {period === 'Morning' ? '🌅' : period === 'Afternoon' ? '☀️' : '🌙'}
                                      </span>
                                      {period}
                                    </h5>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                      {slots.map((slot) => (
                                        <button
                                          key={slot.time}
                                          onClick={() => setSelectedSlot(slot)}
                                          className={`py-2 px-3 rounded-lg border text-center transition-all ${
                                            selectedSlot && selectedSlot.time === slot.time
                                              ? 'bg-[#ddffe7] border-[#ddffe7] text-green-800 shadow-sm'
                                              : 'bg-white border-gray-200 text-gray-700 hover:border-[#ddffe7] hover:shadow-sm'
                                          }`}
                                        >
                                          {slot.time}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          ) : (
                            <div className="py-4 text-center bg-red-50 rounded-lg">
                              <p className="text-red-600">No available slots for this date</p>
                              <p className="text-sm text-red-500 mt-1">Please select a different date</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleModifyBooking}
                        className="mt-6 w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Modify Booking
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">Your Name</label>
                        <input 
                          type="text" 
                          id="userName" 
                          value={userName} 
                          onChange={(e) => setUserName(e.target.value)} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#ddffe7] focus:border-[#ddffe7]" 
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-red-700">{error}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <button 
                          onClick={handleConfirmBooking} 
                          disabled={loading || !userName || !selectedSlot} 
                          className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all ${
                            loading || !userName || !selectedSlot
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            'Confirm Booking'
                          )}
                        </button>
                      </div>
                      
                      <div className="bg-[#ddffe7]/20 p-4 rounded-lg mt-6">
                        <h4 className="font-medium text-green-800 mb-2 flex items-center">
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Important Information
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1 pl-6 list-disc">
                          <li>Please arrive 15 minutes before your slot time</li>
                          <li>Bookings can be cancelled up to 6 hours before the scheduled time</li>
                          <li>Bring appropriate sports gear and equipment</li>
                          <li>Follow all venue guidelines and safety protocols</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ConfirmBookingPage;
