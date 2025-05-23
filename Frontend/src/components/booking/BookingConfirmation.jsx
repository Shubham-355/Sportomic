import { useState } from 'react';
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
  sportIcons,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  
  // Find venue by ID
  const venue = venues.find(v => v.id.toString() === selectedVenue.toString());
  
  // Format date
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const copyBookingInfo = () => {
    const text = `
      Booking Confirmation:
      Venue: ${venue?.name || "Selected Venue"}
      Sport: ${selectedSport}
      Date: ${formattedDate}
      Time: ${selectedSlot.time}
      Booked By: ${userName}
      Booking ID: ${selectedSlot.id}
    `;
    
    navigator.clipboard.writeText(text.trim())
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };
  
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
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <span className="flex items-center justify-center w-10 h-10 bg-[#ddffe7] rounded-full text-xl mr-3">
                {sportIcons[selectedSport]?.emoji || "🏆"}
              </span>
              <div>
                <h3 className="font-bold text-gray-900">{selectedSport}</h3>
                <p className="text-sm text-gray-500">{venue?.name || "Selected Venue"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Date</p>
                <p className="font-medium text-gray-900">{formattedDate}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Time</p>
                <p className="font-medium text-gray-900">{selectedSlot.time}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Booked By</p>
                <p className="font-medium text-gray-900">{userName}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                <p className="font-medium text-gray-900">#{selectedSlot.id?.toString().slice(-6)}</p>
              </div>
            </div>
            
            <button
              className="w-full mt-4 py-2 px-4 bg-[#ddffe7] text-green-800 rounded-lg font-medium hover:bg-[#c3f8d4] transition flex items-center justify-center"
              onClick={copyBookingInfo}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              {copied ? 'Copied!' : 'Copy Booking Info'}
            </button>
          </div>
          
          <div className="bg-[#ddffe7]/10 p-4 rounded-lg border border-[#ddffe7]/30">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-gray-700">Please arrive at the venue 15 minutes before your slot time. Remember to bring appropriate sports gear.</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => window.location.href = '/bookings'}
              className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              View My Bookings
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-[#ddffe7] text-green-800 rounded-lg font-medium hover:bg-[#c3f8d4] transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingConfirmation;
