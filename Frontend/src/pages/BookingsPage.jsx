import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const location = useLocation();
  
  // Sport icons
  const sportIcons = {
    Cricket: "🏏",
    Football: "⚽",
    Basketball: "🏀",
    Tennis: "🎾",
    Badminton: "🏸",
    Pickleball: "🎯"
  };
  
  useEffect(() => {
    // Get bookings from localStorage (for persistence across sessions)
    const fetchBookings = () => {
      setLoading(true);
      try {
        // Get bookings from localStorage
        const storedBookings = JSON.parse(localStorage.getItem('sportomicBookings') || '[]');
        
        // If there's a new booking in the navigation state, add it
        if (location.state?.newBooking) {
          const newBooking = location.state.newBooking;
          // Check if it already exists
          if (!storedBookings.some(booking => booking.id === newBooking.id)) {
            storedBookings.push(newBooking);
            localStorage.setItem('sportomicBookings', JSON.stringify(storedBookings));
          }
        }
        
        setBookings(storedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [location.state]);
  
  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (activeTab === 'upcoming') {
      return bookingDate >= today;
    } else if (activeTab === 'past') {
      return bookingDate < today;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-12 bg-[#ddffe7]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Bookings
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
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex mb-8 border-b border-gray-200">
            <button 
              className={`px-4 py-2 font-medium text-sm transition ${
                activeTab === 'upcoming' 
                  ? 'text-green-700 border-b-2 border-green-500' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Bookings
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm transition ${
                activeTab === 'past' 
                  ? 'text-green-700 border-b-2 border-green-500' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past Bookings
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ddffe7] rounded-full animate-spin"></div>
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#ddffe7]/30">
                  <div className="h-12 bg-[#ddffe7] flex items-center px-4">
                    <h4 className="text-green-800 font-medium">{booking.venueName}</h4>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#ddffe7]/30 text-green-700 flex items-center justify-center text-xl mr-3">
                        {sportIcons[booking.sport] || "🏆"}
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800">{booking.sport}</span>
                        <span className="block text-xs text-gray-500">{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium text-gray-800">{booking.time}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Booked By:</span>
                        <span className="font-medium text-gray-800">{booking.userName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Booking ID:</span>
                        <span className="font-medium text-gray-800">#{booking.id.toString().slice(-6)}</span>
                      </div>
                    </div>
                    
                    {activeTab === 'upcoming' && (
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 py-2 bg-[#ddffe7] text-green-800 rounded-lg font-medium hover:bg-[#c3f8d4] transition text-sm">
                          Reschedule
                        </button>
                        <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm">
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No bookings found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming bookings." 
                  : "You don't have any past bookings."}
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center px-4 py-2 bg-[#ddffe7] text-green-800 rounded-lg font-medium hover:bg-[#c3f8d4] transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Book a New Session
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingsPage;
