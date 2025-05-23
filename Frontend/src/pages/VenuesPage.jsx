import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import VenueCard from '../components/venues/VenueCard';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Sport icons with gradients
  const sportIcons = {
    Cricket: { emoji: "🏏", gradient: "from-emerald-400 to-green-600" },
    Football: { emoji: "⚽", gradient: "from-emerald-400 to-teal-600" },
    Basketball: { emoji: "🏀", gradient: "from-teal-400 to-emerald-600" },
    Tennis: { emoji: "🎾", gradient: "from-green-400 to-emerald-600" },
    Badminton: { emoji: "🏸", gradient: "from-emerald-400 to-green-600" },
    Pickleball: { emoji: "🎯", gradient: "from-teal-400 to-emerald-600" }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch venues and sports using environment variable
        const venuesResponse = await fetch(`${API_URL}/venues`);
        const venuesData = await venuesResponse.json();
        
        const sportsResponse = await fetch(`${API_URL}/sports`);
        const sportsData = await sportsResponse.json();
        
        setVenues(venuesData);
        setSports(sportsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter venues based on search query and active filter
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') {
      return matchesSearch;
    } else {
      // Generate a pseudo-random set of sports for this venue based on venueId
      const venueId = parseInt(venue.id);
      const venueSports = sports.filter((_, i) => (i + venueId) % 3 === 0);
      return matchesSearch && venueSports.includes(activeFilter);
    }
  });

  // Handle venue booking
  const handleVenueSelect = (venueId) => {
    try {
      // Find the venue object using toString() for safe comparison
      const venue = venues.find(v => v.id.toString() === venueId.toString());
      
      if (!venue) {
        console.error('Venue not found:', venueId);
        return;
      }
      
      // Determine which sport to use based on active filter
      let selectedSport = '';
      
      // If a sport is filtered/selected, use that
      if (activeFilter !== 'all') {
        selectedSport = activeFilter;
      } else {
        // If no filter active, use the first sport this venue offers based on our algorithm
        const venueId = parseInt(venue.id);
        const venueSports = sports.filter((_, i) => (i + venueId) % 3 === 0);
        
        // Fallback to first sport if none are available for this venue
        selectedSport = venueSports.length > 0 ? venueSports[0] : (sports.length > 0 ? sports[0] : 'Cricket');
      }
      
      // Navigate to confirmation page with venue details
      navigate('/confirm-booking', {
        state: {
          bookingData: {
            venueId: venue.id,
            venueName: venue.name,
            date: new Date().toISOString().split('T')[0], // Today's date
            sport: selectedSport,
            sportEmoji: sportIcons[selectedSport]?.emoji || "🏆"
          }
        }
      });
    } catch (error) {
      console.error('Error selecting venue:', error);
      // Show a user-friendly error message if needed
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero section */}
      <div className="relative pt-20 pb-16 bg-gradient-to-br from-green-800 via-green-700 to-emerald-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDRjMCAyLjIwOSAxLjc5MSA0IDQgNHM0LTEuNzkxIDQtNHptLTIwIDBoLTRhMiAyIDAgMSAwIDAgNGg0YTIgMiAwIDEgMCAwLTR6bTM2IDBjLTIuMjA5IDAtNCAxLjc5MS00IDRzMS43OTEgNCA0IDRjMi4yMDkgMCA0LTEuNzkxIDQtNHMtMS43OTEtNC00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-white">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sports Venues
            </motion.h1>
            
            <motion.div 
              className="w-16 h-1 bg-[#ddffe7] rounded-full mb-6"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
            
            <motion.p 
              className="text-xl text-white/90 max-w-2xl text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Find and book the perfect venue for your favorite sport
            </motion.p>
            
            {/* Search and Filter Controls */}
            <motion.div 
              className="w-full max-w-4xl mx-auto mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 pl-12 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddffe7]/50 text-gray-800"
                      placeholder="Search venues by name or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <select
                    className="w-full md:w-60 px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ddffe7]/50 text-gray-800 appearance-none"
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                  >
                    <option value="all">All Sports</option>
                    {sports.map(sport => (
                      <option key={sport} value={sport}>{sportIcons[sport]?.emoji} {sport}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Venues Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-[#ddffe7] rounded-full animate-spin"></div>
            </div>
          ) : filteredVenues.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredVenues.length} {filteredVenues.length === 1 ? 'venue' : 'venues'} found
                  {activeFilter !== 'all' && ` for ${activeFilter}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVenues.map((venue, index) => (
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
            </>
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No venues found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchQuery 
                  ? `We couldn't find any venues matching "${searchQuery}"`
                  : activeFilter !== 'all'
                    ? `We couldn't find any venues offering ${activeFilter}`
                    : "We couldn't find any venues matching your criteria"
                }
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-6 px-4 py-2 bg-[#ddffe7] text-green-800 rounded-lg font-medium hover:bg-[#c3f8d4] transition"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VenuesPage;
