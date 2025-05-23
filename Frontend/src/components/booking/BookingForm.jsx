import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BookingForm = ({ 
  venues, 
  sports, 
  selectedVenue, 
  setSelectedVenue, 
  selectedSport, 
  setSelectedSport, 
  selectedDate, 
  setSelectedDate, 
  getNextWeekDates 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState({
    venue: false,
    date: false,
    sport: false
  });
  const [venueJustSelected, setVenueJustSelected] = useState(false);
  const [sportJustSelected, setSportJustSelected] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Show highlight effect when venue is pre-selected
  useEffect(() => {
    if (selectedVenue) {
      setVenueJustSelected(true);
      const timer = setTimeout(() => {
        setVenueJustSelected(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedVenue]);

  // Show highlight effect when sport is pre-selected
  useEffect(() => {
    if (selectedSport) {
      setSportJustSelected(true);
      const timer = setTimeout(() => {
        setSportJustSelected(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedSport]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#ddffe7]/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-60 h-60 rounded-full bg-[#ddffe7]/20 blur-3xl"></div>
      </div>
      
      <div className="relative backdrop-blur-sm rounded-3xl overflow-hidden border border-[#ddffe7]/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        {/* Stylish header */}
        <div className="bg-[#ddffe7] p-6 flex items-center justify-between">
          <h2 className="text-gray-800 font-extrabold text-2xl tracking-tight flex items-center">
            <span className="bg-white/70 p-2 rounded-lg mr-4">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <span>Book Your Slot</span>
          </h2>
          
          <div className="hidden md:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/60 text-gray-700">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Real-time availability
            </span>
          </div>
        </div>
        
        {/* Form content with a more creative layout */}
        <div className="bg-white p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Venue selector with unique styling */}
            <div className="relative group">
              <motion.div 
                className={`absolute inset-0 bg-[#ddffe7]/20 rounded-xl transition-opacity duration-300 ${hoverState.venue ? 'opacity-100' : 'opacity-0'}`}
                animate={{ 
                  opacity: hoverState.venue || venueJustSelected ? 1 : 0,
                  scale: venueJustSelected ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: venueJustSelected ? 0.5 : 0.3 }}
              ></motion.div>
              
              <div 
                className={`relative p-5 rounded-xl border transition-all duration-300 hover:shadow-md ${
                  venueJustSelected 
                    ? 'border-[#ddffe7] bg-[#ddffe7]/10 shadow-md' 
                    : 'border-gray-200 bg-white'
                }`}
                onMouseEnter={() => setHoverState({...hoverState, venue: true})}
                onMouseLeave={() => setHoverState({...hoverState, venue: false})}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-[#ddffe7] rounded-lg flex items-center justify-center text-green-800 mr-3 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <label className="block text-gray-700 font-semibold">Select Venue</label>
                </div>
                
                <select 
                  className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#ddffe7] focus:ring-0 appearance-none cursor-pointer transition-colors text-gray-700"
                  value={selectedVenue} 
                  onChange={(e) => setSelectedVenue(e.target.value)}
                >
                  <option value="" className="text-gray-500">-- Select a venue --</option>
                  {venues.map(venue => (
                    <option key={venue.id} value={venue.id} className="text-gray-700">
                      {venue.name}
                    </option>
                  ))}
                </select>
                
                <div className="absolute right-5 bottom-8 pointer-events-none text-green-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Date selector with unique styling */}
            <div className="relative group">
              <motion.div 
                className={`absolute inset-0 bg-[#ddffe7]/20 rounded-xl transition-opacity duration-300 ${hoverState.date ? 'opacity-100' : 'opacity-0'}`}
                animate={{ opacity: hoverState.date ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              
              <div 
                className="relative p-5 rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                onMouseEnter={() => setHoverState({...hoverState, date: true})}
                onMouseLeave={() => setHoverState({...hoverState, date: false})}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-[#ddffe7] rounded-lg flex items-center justify-center text-green-800 mr-3 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <label className="block text-gray-700 font-semibold">Select Date</label>
                </div>
                
                <select 
                  className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#ddffe7] focus:ring-0 appearance-none cursor-pointer transition-colors text-gray-700"
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {getNextWeekDates().map(date => (
                    <option key={date.value} value={date.value} className="text-gray-700">
                      {date.label}
                    </option>
                  ))}
                </select>
                
                <div className="absolute right-5 bottom-8 pointer-events-none text-green-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Sport selector with unique styling */}
            <div className="relative group">
              <motion.div 
                className={`absolute inset-0 bg-[#ddffe7]/20 rounded-xl transition-opacity duration-300 ${hoverState.sport ? 'opacity-100' : 'opacity-0'}`}
                animate={{ 
                  opacity: hoverState.sport || sportJustSelected ? 1 : 0,
                  scale: sportJustSelected ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: sportJustSelected ? 0.5 : 0.3 }}
              ></motion.div>
              
              <div 
                className={`relative p-5 rounded-xl border transition-all duration-300 hover:shadow-md ${
                  sportJustSelected 
                    ? 'border-[#ddffe7] bg-[#ddffe7]/10 shadow-md' 
                    : 'border-gray-200 bg-white'
                }`}
                onMouseEnter={() => setHoverState({...hoverState, sport: true})}
                onMouseLeave={() => setHoverState({...hoverState, sport: false})}
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-[#ddffe7] rounded-lg flex items-center justify-center text-green-800 mr-3 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <label className="block text-gray-700 font-semibold">Select Sport</label>
                </div>
                
                <select 
                  className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#ddffe7] focus:ring-0 appearance-none cursor-pointer transition-colors text-gray-700"
                  value={selectedSport} 
                  onChange={(e) => setSelectedSport(e.target.value)}
                >
                  <option value="" className="text-gray-500">-- Select a sport --</option>
                  {sports.map(sport => (
                    <option key={sport} value={sport} className="text-gray-700">
                      {sport}
                    </option>
                  ))}
                </select>
                
                <div className="absolute right-5 bottom-8 pointer-events-none text-green-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stylish footer with availability notice */}
        <div className="py-4 px-8 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center">
              <div className="mr-3 relative">
                <div className="absolute inset-0 bg-[#ddffe7] rounded-full animate-ping opacity-20"></div>
                <div className="relative w-10 h-10 rounded-full bg-[#ddffe7] flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="font-medium text-green-800">
                Select your preferences to view available slots
              </p>
            </div>
            
            <div className="flex items-center">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-600">Real-time availability</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingForm;
