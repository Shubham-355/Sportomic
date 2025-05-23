import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const VenueCard = ({ venue, sports, sportIcons, onSelect, index, activeFilter }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Generate a pseudo-random set of sports for this venue
  const venueId = parseInt(venue.id);
  const venueSports = sports.filter((_, i) => (i + venueId) % 3 === 0);
  
  // Get venue-specific image
  const getVenueImage = () => {
    // Venue-specific images mapping
    const venueImages = {
      // Kabir Sports Academy
      1: [
        "https://images.unsplash.com/photo-1626224583764-f87db24ac1f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Badminton
        "https://images.pexels.com/photos/7937415/pexels-photo-7937415.jpeg?auto=compress&cs=tinysrgb&w=500&q=80" // Pickleball
      ],
      // AB Box Cricket
      2: [
        "https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Basketball
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" // Football
      ],
      // Karmaveer Education and Sports Federation
      3: [
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Cricket
        "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" // Tennis
      ],
      // BCCA Box Cricket
      4: [
        "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=500&q=80", // Badminton
        "https://images.pexels.com/photos/3660199/pexels-photo-3660199.jpeg?auto=compress&cs=tinysrgb&w=500&q=80" // Pickleball
      ],
      // Eagle Pickleball
      5: [
        "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Football
        "https://images.unsplash.com/photo-1505666287802-931dc83a5dc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" // Basketball
      ],
      // Crick Buddies Box Cricket
      6: [
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Cricket
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" // Tennis
      ],
      // Paradise Box Cricket
      7: [
        "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=500&q=80", // Cricket
        "https://images.pexels.com/photos/5739101/pexels-photo-5739101.jpeg?auto=compress&cs=tinysrgb&w=500&q=80" // Tennis
      ],
      // Spinters Club
      8: [
        "https://images.pexels.com/photos/3041176/pexels-photo-3041176.jpeg?auto=compress&cs=tinysrgb&w=500&q=80", // Football
        "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=500&q=80" // Basketball
      ]
    };
    
    // If the venue has specific images, use those
    if (venueImages[venue.id]) {
      return venueImages[venue.id][0]; // Use first image by default
    }
    
    // If a sport is selected in the filter and the venue offers it, use that sport's image
    if (activeFilter !== 'all' && venueSports.includes(activeFilter) && sportIcons[activeFilter]?.images) {
      const images = sportIcons[activeFilter]?.images;
      return images ? images[venueId % images.length] : null;
    }
    
    // Otherwise use the first sport this venue offers
    const primarySport = venueSports[0];
    if (!primarySport) return null;
    
    const images = sportIcons[primarySport]?.images;
    return images ? images[venueId % images.length] : null;
  };

  const venueImage = getVenueImage();

  const handleBookNow = () => {
    try {
      // Different behavior based on current page
      const isVenuesPage = location.pathname === "/venues";
      
      if (isVenuesPage) {
        // Call the onSelect callback from VenuesPage
        onSelect(venue.id);
      } else {
        // Determine which sport to use
        let sportToUse = '';
        
        // If a sport is filtered/selected, use that
        if (activeFilter && activeFilter !== 'all') {
          sportToUse = activeFilter;
        } 
        // Otherwise use the first sport this venue offers
        else if (venueSports.length > 0) {
          sportToUse = venueSports[0];
        } else {
          // Fallback to a default sport if none is available
          sportToUse = sports[0] || 'Cricket';
        }
        
        // Get today's date
        const today = new Date().toISOString().split('T')[0];
        
        // Navigate directly to the confirmation page with venue details
        navigate('/confirm-booking', {
          state: {
            bookingData: {
              venueId: venue.id,
              venueName: venue.name,
              date: today,
              sport: sportToUse,
              sportEmoji: sportIcons[sportToUse]?.emoji
            }
          }
        });
      }
    } catch (error) {
      console.error("Error in handleBookNow:", error);
    }
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
      layout
    >
      <div 
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-gray-100 hover:border-[#ddffe7]/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Venue Image/Header */}
        <div className="h-48 relative overflow-hidden group">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
          
          {/* Sport image with fallback */}
          {venueImage ? (
            <img 
              src={venueImage}
              alt={`${venue.name} - ${venueSports[0] || 'Venue'}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                // Show the venue initial as fallback
                const fallback = e.target.parentNode.querySelector('.fallback-bg');
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          
          {/* Venue Initial with colored background (fallback) */}
          <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 overflow-hidden fallback-bg ${venueImage ? 'hidden' : 'flex'}`}>
            <span className="text-[150px] font-black text-[#ddffe7]/50">{venue.name.charAt(0)}</span>
          </div>
          
          {/* Color overlay to match theme */}
          <div className="absolute inset-0 bg-[#ddffe7]/10 mix-blend-overlay z-5"></div>
          
          {/* Venue info overlay */}
          <div className="absolute left-0 bottom-0 p-4 z-20 w-full">
            <div className="flex items-center mb-1">
              <span className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-xl mr-2 shadow-sm">
                {venue.name.charAt(0)}
              </span>
              <h3 className="text-xl font-bold text-white">{venue.name}</h3>
            </div>
            <div className="flex items-center text-white/80 text-sm">
              <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{venue.location}</span>
            </div>
          </div>
          
          {/* Sport icons */}
          <div className="absolute top-3 right-3 flex space-x-1.5 z-20">
            {venueSports.slice(0, 2).map(sport => (
              <div 
                key={sport} 
                className="w-8 h-8 rounded-full flex items-center justify-center text-lg bg-white/80 backdrop-blur-sm shadow-sm"
              >
                {sportIcons[sport]?.emoji || "🏆"}
              </div>
            ))}
          </div>
        </div>
        
        {/* Venue Details */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star} 
                  className={`w-4 h-4 ${star <= 4 + (venue.id % 2) ? 'text-yellow-400' : 'text-gray-200'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 flex items-center">
              <span className="font-medium text-green-700 mr-1">{venueSports.length}</span> 
              sports available
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-5 flex-grow">
            {venue.name} offers modern facilities for {venueSports.join(', ')} with professional coaching and equipment rentals.
          </p>
          
          {/* Sports available tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {venueSports.map(sport => (
              <span key={sport} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#ddffe7]/30 text-green-800">
                {sportIcons[sport]?.emoji || "🏆"} {sport}
              </span>
            ))}
          </div>
          
          <motion.button 
            onClick={handleBookNow}
            className="w-full py-2.5 rounded-lg font-medium transition-all duration-300 text-green-800 flex items-center justify-center overflow-hidden relative"
            animate={{
              background: isHovered 
                ? 'linear-gradient(to right, #a5f0c5, #ddffe7)' 
                : 'linear-gradient(to right, #ddffe7, #a5f0c5)'
            }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-500/20"
              initial={{ x: '100%', opacity: 0 }}
              animate={isHovered ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="relative z-10">Book Now</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VenueCard;
