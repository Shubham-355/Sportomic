import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';

const BookingSummary = ({ booking, sportIcons }) => {
  if (!booking) return null;

  // Format date
  const formattedDate = new Date(booking.date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-blue-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Booking Confirmed!</h3>
          <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
            #{booking.id.toString().slice(-6)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mr-4`}>
                {sportIcons[booking.sport] || "🏆"}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">{booking.venueName}</h4>
                <p className="text-gray-500">{formattedDate}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h5 className="font-semibold text-blue-800 mb-3">Booking Details</h5>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500 text-sm">Sport</p>
                  <p className="font-medium text-gray-800">{booking.sport}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Time</p>
                  <p className="font-medium text-gray-800">{booking.time}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Booked By</p>
                  <p className="font-medium text-gray-800">{booking.userName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Booking ID</p>
                  <p className="font-medium text-gray-800">#{booking.id.toString().slice(-6)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">Booking confirmed on</p>
              <p className="font-medium text-gray-800">{new Date().toLocaleDateString()}</p>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 py-2 px-4 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add to Calendar
              </button>
              <button className="flex-1 py-2 px-4 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Ticket
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <QRCode value={`SPORTOMIC:${booking.id}`} size={150} />
            </div>
            <p className="text-sm text-center text-gray-500 mt-2">Scan this QR code at the venue</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingSummary;
