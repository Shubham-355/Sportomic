import { motion } from 'framer-motion';

const BookingSummary = ({ booking, sportIcons }) => {
  if (!booking) {
    return null;
  }

  // Format date
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md border border-[#ddffe7] overflow-hidden"
    >
      <div className="bg-[#ddffe7] p-4 flex items-center">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
          <span className="text-xl">{sportIcons[booking.sport]?.emoji || "🏆"}</span>
        </div>
        <div>
          <h3 className="font-bold text-green-800 leading-tight">Booking Successful!</h3>
          <p className="text-xs text-green-700">Your booking has been confirmed</p>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Venue</p>
            <p className="font-medium text-gray-800">{booking.venueName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Sport</p>
            <p className="font-medium text-gray-800">{booking.sport}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Date</p>
            <p className="font-medium text-gray-800">{formattedDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Time</p>
            <p className="font-medium text-gray-800">{booking.time}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Booking ID</p>
            <p className="font-medium text-gray-800">#{booking.id.toString().slice(-6)}</p>
          </div>
          <button 
            onClick={() => window.location.href = '/bookings'}
            className="px-3 py-1.5 bg-[#ddffe7] text-green-800 rounded-lg text-sm font-medium hover:bg-[#c3f8d4] transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingSummary;
