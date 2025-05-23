import { motion } from 'framer-motion';

const BookingConfirmation = ({ 
  selectedSlot, 
  selectedVenue, 
  selectedDate, 
  selectedSport, 
  userName, 
  setUserName, 
  venues, 
  loading, 
  handleBookSlot,
  sportIcons
}) => {
  // Find venue by ID
  const venue = venues.find(v => v.id.toString() === selectedVenue.toString());
  
  // Format date
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <motion.div 
      className="mt-10 bg-white rounded-xl shadow-lg overflow-hidden border border-[#ddffe7]/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      key={`${selectedSlot.time}-${selectedDate}`} // Key to ensure proper rerendering
    >
      <div className="bg-[#ddffe7] py-4 px-6">
        <h2 className="text-2xl font-bold text-gray-800">Complete Your Booking</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#ddffe7] flex items-center justify-center text-2xl mr-4">
                  {sportIcons[selectedSport]?.emoji || "🏆"}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{venue?.name || "Selected Venue"}</h4>
                  <p className="text-gray-500">{selectedSport}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-800">{formattedDate}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium text-gray-800">{selectedSlot.time}</span>
                </div>
                <div className="flex justify-between pb-3">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-800">1 hour</span>
                </div>
              </div>
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
              
              <div className="mt-6">
                <button 
                  onClick={handleBookSlot} 
                  disabled={loading || !userName} 
                  className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all ${
                    loading || !userName
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
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;
