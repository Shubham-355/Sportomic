import { useState } from 'react';
import { motion } from 'framer-motion';
import VenueCard from '../venues/VenueCard';

const FeaturedVenues = ({ venues, sports, sportIcons, onVenueSelect }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter venues based on selected sport
  const filteredVenues = activeFilter === 'all' 
    ? venues 
    : venues.filter((venue, index) => {
        // Generate a pseudo-random set of sports for this venue
        const venueId = parseInt(venue.id);
        const venueSports = sports.filter((sport, i) => (i + venueId) % 3 === 0);
        return venueSports.includes(activeFilter);
      });

  // Handle venue selection
  const handleVenueSelect = (venueId) => {
    onVenueSelect(venueId);
    // Additional scroll behavior is now handled in the VenueCard component
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 rounded-full bg-[#ddffe7]/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-[#ddffe7]/15 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-block mb-3 bg-[#ddffe7]/30 px-3 py-1 rounded-full">
            <div className="flex items-center text-sm font-medium text-green-800">
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Premium Venues
            </div>
          </div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Discover & Play With Sportomic
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Find and book the best sports venues in your area. Whether you're looking for a cricket pitch, 
            tennis court, or football field, we've got you covered.
          </motion.p>
          
          {/* Sport filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <motion.button
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeFilter === 'all' 
                  ? 'bg-[#ddffe7] text-green-800 shadow-lg shadow-[#ddffe7]/20' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#ddffe7]/70 hover:bg-[#ddffe7]/10'
              }`}
              onClick={() => setActiveFilter('all')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              All Venues
            </motion.button>
            
            {sports.map(sport => (
              <motion.button
                key={sport}
                className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center ${
                  activeFilter === sport 
                    ? 'bg-[#ddffe7] text-green-800 shadow-lg shadow-[#ddffe7]/20' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#ddffe7]/70 hover:bg-[#ddffe7]/10'
                }`}
                onClick={() => setActiveFilter(sport)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">{sportIcons[sport]?.emoji || ""}</span>
                {sport}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Remove AnimatePresence mode="wait" and render cards directly */}
          {filteredVenues.slice(0, 6).map((venue, index) => (
            <VenueCard 
              key={venue.id}
              venue={venue}
              sports={sports}
              sportIcons={sportIcons}
              onSelect={handleVenueSelect}
              index={index}
              activeFilter={activeFilter}
            />
          ))}
        </div>

        {filteredVenues.length > 6 && (
          <div className="mt-14 text-center">
            <motion.button 
              className="inline-flex items-center px-8 py-3 bg-white border border-[#ddffe7] rounded-xl text-green-700 font-medium hover:bg-[#ddffe7]/10 transition-all duration-300 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>View All Venues</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedVenues;
