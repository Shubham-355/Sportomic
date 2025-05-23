import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import config from '../../config';

const TimeSlots = ({ availableSlots, selectedVenue, selectedDate, selectedSport, venues, sportIcons, loading }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, openLoginModal } = useAuth();

  // Reset selected slot when venue or date changes
  useEffect(() => {
    setSelectedSlot(null);
    setError('');
    setBookingStatus('');
  }, [selectedVenue, selectedDate]);

  // Set userName from authenticated user
  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    }
  }, [user]);

  // Group slots by period
  const groupedSlots = {
    Morning: availableSlots.filter(slot => slot.period === 'Morning' && !slot.isBooked),
    Afternoon: availableSlots.filter(slot => slot.period === 'Afternoon' && !slot.isBooked),
    Evening: availableSlots.filter(slot => slot.period === 'Evening' && !slot.isBooked),
  };

  // Count available slots
  const availableCount = availableSlots.filter(slot => !slot.isBooked).length;

  const handleSlotSelect = (slot) => {
    if (!selectedSport) {
      setError('Please select a sport first');
      return;
    }
    setSelectedSlot(slot);
    setError('');
  };

  const handleBooking = async () => {
    // Reset error and status
    setError('');
    setBookingStatus('');
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Open login modal if not authenticated
      openLoginModal('login');
      return;
    }
    
    // Validate inputs
    if (!selectedVenue) {
      setError('Please select a venue');
      return;
    }
    if (!selectedSport) {
      setError('Please select a sport');
      return;
    }
    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }

    // Find venue details
    const venue = venues.find(v => v.id.toString() === selectedVenue.toString());
    if (!venue) {
      setError('Selected venue not found');
      return;
    }

    setBookingInProgress(true);
    
    try {
      // Navigate to the confirmation page with booking data
      navigate('/confirm-booking', {
        state: {
          bookingData: {
            venueId: selectedVenue,
            venueName: venue.name,
            date: selectedDate,
            time: selectedSlot.time,
            userName: userName,
            sport: selectedSport,
            sportEmoji: sportIcons[selectedSport]?.emoji || "🏆"
          }
        }
      });
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to process booking. Please try again.');
    } finally {
      setBookingInProgress(false);
    }
  };

  // Don't render if no venue or date selected
  if (!selectedVenue || !selectedDate) {
    return null;
  }

  // If loading, show loading indicator
  if (loading) {
    return (
      <div className="mt-8 p-8 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ddffe7] rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Available Time Slots</h2>
        <p className="text-gray-600">
          {availableCount > 0 
            ? `${availableCount} slots available for ${new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`
            : 'No slots available for the selected date'
          }
        </p>
      </div>

      {availableCount > 0 ? (
        <div className="p-6">
          {/* Time Slots */}
          <div className="mb-8">
            {Object.entries(groupedSlots).map(([period, slots]) => 
              slots.length > 0 && (
                <div key={period} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-[#ddffe7]/80 rounded-full flex items-center justify-center mr-2 text-green-800">
                      {period === 'Morning' ? '🌅' : period === 'Afternoon' ? '☀️' : '🌙'}
                    </span>
                    {period} Slots
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {slots.map(slot => (
                      <button
                        key={slot.time}
                        className={`px-4 py-3 border rounded-lg text-center transition ${
                          selectedSlot && selectedSlot.time === slot.time
                            ? 'bg-[#ddffe7] border-[#ddffe7] text-green-800'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-[#ddffe7]/50'
                        }`}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          
          {/* Booking Form */}
          {selectedSlot && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-100 pt-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  {!isAuthenticated && (
                    <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
                      <p className="font-medium">Login required</p>
                      <p className="text-sm">You need to log in to book this slot. Click "Continue to Booking" to proceed.</p>
                    </div>
                  )}
                  
                  <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="userName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ddffe7] focus:border-[#ddffe7]"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    disabled={isAuthenticated} // Disable if user is authenticated
                  />
                </div>
                
                <div className="md:w-40 lg:w-60 flex items-end">
                  <button
                    className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
                      bookingInProgress
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400'
                    }`}
                    onClick={handleBooking}
                    disabled={bookingInProgress}
                  >
                    {bookingInProgress ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      isAuthenticated ? 'Continue to Booking' : 'Login & Book'
                    )}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                  {error}
                </div>
              )}
              
              {bookingStatus && (
                <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700">
                  {bookingStatus}
                </div>
              )}
            </motion.div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Available Slots</h3>
          <p className="text-gray-600 mb-4">There are no available slots for the selected date and venue.</p>
          <button 
            onClick={() => setSelectedDate(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0])}
            className="px-4 py-2 bg-[#ddffe7] text-green-800 rounded-lg inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Try Tomorrow
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TimeSlots;
