import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TimeSlots = ({ availableSlots, selectedVenue, selectedDate, selectedSport, venues, sportIcons, loading }) => {
  const navigate = useNavigate();
  const [filteredSlots, setFilteredSlots] = useState({
    morning: [],
    afternoon: [],
    evening: []
  });
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (!availableSlots) return;

    // Group slots by time period
    const morning = availableSlots.filter(slot => slot.period === 'Morning');
    const afternoon = availableSlots.filter(slot => slot.period === 'Afternoon');
    const evening = availableSlots.filter(slot => slot.period === 'Evening');

    setFilteredSlots({ morning, afternoon, evening });
  }, [availableSlots]);

  // Get slots based on active filter
  const getFilteredSlots = () => {
    if (activeFilter === 'all') return availableSlots;
    return filteredSlots[activeFilter.toLowerCase()] || [];
  };

  // Function to handle slot selection with improved logic
  const handleSlotSelect = (slot) => {
    try {
      // Only allow selecting available slots
      if (!slot.isBooked) {
        const venue = venues.find(v => v.id.toString() === selectedVenue.toString());
        
        if (!venue) {
          console.error("Venue not found:", selectedVenue);
          return;
        }
        
        if (!selectedSport) {
          console.error("No sport selected");
          return;
        }
        
        // Navigate to confirmation page with all necessary booking data
        navigate('/confirm-booking', {
          state: {
            bookingData: {
              venueId: selectedVenue,
              venueName: venue?.name || "Selected Venue",
              date: selectedDate,
              time: slot.time,
              sport: selectedSport,
              sportEmoji: sportIcons[selectedSport]?.emoji
            }
          }
        });
      }
    } catch (error) {
      console.error("Error in handleSlotSelect:", error);
    }
  };

  // Group slots by period
  const groupedSlots = {
    Morning: availableSlots.filter(slot => slot.period === 'Morning'),
    Afternoon: availableSlots.filter(slot => slot.period === 'Afternoon'),
    Evening: availableSlots.filter(slot => slot.period === 'Evening')
  };

  // If no venue selected, show message
  if (!selectedVenue) {
    return (
      <div className="mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
        <div className="text-gray-400 py-6">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-500 mb-1">Select a Venue and Date</h3>
          <p className="text-gray-400">Available time slots will appear here</p>
        </div>
      </div>
    );
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="mt-10 bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-center py-12">
          <div className="inline-flex items-center">
            <div className="w-10 h-10 border-4 border-[#ddffe7]/30 border-t-[#ddffe7] rounded-full animate-spin mr-4"></div>
            <div>
              <p className="text-lg font-medium text-gray-700">Loading available slots...</p>
              <p className="text-gray-500 text-sm">Please wait while we fetch the latest availability</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no slots available
  if (!availableSlots.length) {
    return (
      <div className="mt-10 bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
        <div className="text-gray-500 py-6">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-1">No Slots Available</h3>
          <p className="text-gray-500">Try a different date or venue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 bg-white p-8 rounded-xl shadow-md border border-[#ddffe7]/30">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Select a Time Slot
      </h2>
      
      {Object.entries(groupedSlots).map(([period, slots]) => (
        slots.length > 0 && (
          <div key={period} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#ddffe7]/20 flex items-center justify-center mr-2">
                {period === 'Morning' ? '🌅' : period === 'Afternoon' ? '☀️' : '🌙'}
              </span>
              {period}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {slots.map((slot, index) => (
                <motion.button
                  key={slot.time}
                  onClick={() => handleSlotSelect(slot)}
                  className={`py-3 px-4 rounded-lg border text-center transition-all ${
                    slot.isBooked
                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-[#ddffe7] hover:bg-[#ddffe7]/5 hover:shadow-sm'
                  }`}
                  disabled={slot.isBooked}
                  whileHover={!slot.isBooked ? { scale: 1.03 } : {}}
                  whileTap={!slot.isBooked ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                >
                  {slot.time}
                </motion.button>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default TimeSlots;
