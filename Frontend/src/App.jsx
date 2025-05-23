import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import SportCategories from './components/home/SportCategories';
import FeaturedVenues from './components/home/FeaturedVenues';
import BookingForm from './components/booking/BookingForm';
import TimeSlots from './components/booking/TimeSlots';
import BookingConfirmation from './components/booking/BookingConfirmation';
import BookingSummary from './components/booking/BookingSummary';
import Testimonials from './components/common/Testimonials';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import VenuesPage from './pages/VenuesPage';
import SportsPage from './pages/SportsPage';
import BookingsPage from './pages/BookingsPage';
import ConfirmBookingPage from './pages/ConfirmBookingPage';
import ChatBot from './components/chat/ChatBot';
import config from './config';

// Create a wrapper component for the Home page to access router hooks
function HomePage(props) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle URL query params on mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const venueParam = queryParams.get('venue');
    const sportParam = queryParams.get('sport');
    
    // Set venue and sport from URL params if they exist
    if (venueParam && props.venues.some(venue => venue.id.toString() === venueParam)) {
      props.setSelectedVenue(venueParam);
    }
    
    if (sportParam && props.sports.includes(sportParam)) {
      props.setSelectedSport(sportParam);
    }
    
    // Clear URL params after setting state to avoid state updates on page refresh
    if ((venueParam || sportParam) && navigate) {
      // Use replace to avoid adding to browser history
      navigate('/', { replace: true });
    }
  }, [location.search, props.venues, props.sports]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Keep Hero section unchanged */}
      <Hero sports={props.sports} />
      
      <div className="container mx-auto px-4 py-12 relative z-20">
        {/* SportCategories moved above booking form but below Hero */}
        <div className="mb-12">
          <SportCategories 
            sports={props.sports} 
            sportIcons={props.sportIcons} 
            onSportSelect={props.setSelectedSport}
            selectedSport={props.selectedSport}
          />
        </div>
        
        <div id="booking-form">
          <BookingForm 
            venues={props.venues}
            sports={props.sports}
            selectedVenue={props.selectedVenue}
            setSelectedVenue={props.setSelectedVenue}
            selectedSport={props.selectedSport}
            setSelectedSport={props.setSelectedSport}
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
            getNextWeekDates={props.getNextWeekDates}
          />
        </div>
        
        <TimeSlots 
          availableSlots={props.availableSlots}
          selectedVenue={props.selectedVenue}
          selectedDate={props.selectedDate}
          selectedSport={props.selectedSport}
          venues={props.venues}
          sportIcons={props.sportIcons}
          loading={props.loading}
        />
        
        {/* We don't need the BookingConfirmation component anymore since we're using a separate page */}
        
        {/* Show booking summary after successful booking */}
        {props.latestBooking && (
          <div className="mt-8">
            <BookingSummary booking={props.latestBooking} sportIcons={props.sportIcons} />
          </div>
        )}
      </div>
      
      <FeaturedVenues 
        venues={props.venues} 
        sports={props.sports} 
        sportIcons={props.sportIcons}
        onVenueSelect={props.handleVenueSelect}
      />
      
      <Testimonials />
      
      {props.currentBookings.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Your Recent Bookings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {props.currentBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#ddffe7]/30">
                <div className="h-12 bg-[#ddffe7] flex items-center px-4">
                  <h4 className="text-green-800 font-medium">{booking.venueName}</h4>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#ddffe7]/30 text-green-700 flex items-center justify-center text-xl mr-3">
                      {props.sportIcons[booking.sport]?.emoji || "🏆"}
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800">{booking.sport}</span>
                      <span className="block text-xs text-gray-500">{new Date(booking.date).toLocaleDateString()}</span>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

function App() {
  const [venues, setVenues] = useState([]);
  const [sports, setSports] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [userName, setUserName] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentBookings, setCurrentBookings] = useState([]);

  // Get API URL from environment variables via config
  const API_URL = config.apiUrl;

  // Fetch venues on component mount
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`${API_URL}/venues`);
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    const fetchSports = async () => {
      try {
        const response = await fetch(`${API_URL}/sports`);
        const data = await response.json();
        setSports(data);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };

    fetchVenues();
    fetchSports();
  }, [API_URL]);

  // Fetch available slots when venue or date changes
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedVenue) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/slots?venueId=${selectedVenue}&date=${selectedDate}`);
        const data = await response.json();
        
        // Only update available slots without affecting selected slot
        setAvailableSlots(data);
        
        // Only reset selectedSlot when the venue or date changes explicitly
        // Not during regular polling updates
      } catch (error) {
        console.error('Error fetching slots:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchSlots();

    // Set up polling for real-time updates
    const intervalId = setInterval(async () => {
      if (!selectedVenue) return;
      
      try {
        const response = await fetch(`${API_URL}/slots?venueId=${selectedVenue}&date=${selectedDate}`);
        const data = await response.json();
        
        // When polling, only update the availability status of slots
        // without changing the selectedSlot
        setAvailableSlots(prevSlots => {
          // If no slots were previously loaded, just use the new data
          if (!prevSlots || prevSlots.length === 0) return data;
          
          // Otherwise, update the existing slots' availability
          return data.map(newSlot => {
            // Keep the selected slot's isBooked status to avoid UI flickering
            if (selectedSlot && newSlot.time === selectedSlot.time) {
              return { ...newSlot, isBooked: selectedSlot.isBooked };
            }
            return newSlot;
          });
        });
      } catch (error) {
        console.error('Error polling slots:', error);
      }
    }, 5000);
    
    // When venue or date changes, reset the selectedSlot
    return () => {
      clearInterval(intervalId);
      setSelectedSlot(null);
    };
  }, [selectedVenue, selectedDate, API_URL]);

  // Sport icons with gradients and images - enhanced with images for each sport
  const sportIcons = {
    Cricket: {
      emoji: "🏏",
      gradient: "from-emerald-400 to-green-600",
      shadow: "shadow-emerald-500/50",
      images: [
        "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=500&q=80"
      ]
    },
    Football: {
      emoji: "⚽",
      gradient: "from-emerald-400 to-teal-600",
      shadow: "shadow-emerald-500/50",
      images: [
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.pexels.com/photos/3041176/pexels-photo-3041176.jpeg?auto=compress&cs=tinysrgb&w=500&q=80"
      ]
    },
    Basketball: {
      emoji: "🏀",
      gradient: "from-teal-400 to-emerald-600",
      shadow: "shadow-teal-500/50",
      images: [
        "https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1505666287802-931dc83a5dc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=500&q=80"
      ]
    },
    Tennis: {
      emoji: "🎾",
      gradient: "from-green-400 to-emerald-600",
      shadow: "shadow-green-500/50",
      images: [
        "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.pexels.com/photos/5739101/pexels-photo-5739101.jpeg?auto=compress&cs=tinysrgb&w=500&q=80"
      ]
    },
    Badminton: {
      emoji: "🏸",
      gradient: "from-emerald-400 to-green-600",
      shadow: "shadow-emerald-500/50",
      images: [
        "https://images.unsplash.com/photo-1626224583764-f87db24ac1f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=500&q=80",
        "https://images.pexels.com/photos/6203574/pexels-photo-6203574.jpeg?auto=compress&cs=tinysrgb&w=500&q=80"
      ]
    },
    Pickleball: {
      emoji: "🎯",
      gradient: "from-teal-400 to-emerald-600",
      shadow: "shadow-teal-500/50",
      images: [
        "https://images.unsplash.com/photo-1631495634750-0c473e620673?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.pexels.com/photos/7937415/pexels-photo-7937415.jpeg?auto=compress&cs=tinysrgb&w=500&q=80",
        "https://images.pexels.com/photos/3660199/pexels-photo-3660199.jpeg?auto=compress&cs=tinysrgb&w=500&q=80"
      ]
    }
  };

  // Handle booking completion
  const [latestBooking, setLatestBooking] = useState(null);

  const handleBookSlot = async () => {
    if (!selectedVenue || !selectedDate || !selectedSlot || !userName || !selectedSport) {
      setBookingStatus('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          venueId: selectedVenue,
          date: selectedDate,
          time: selectedSlot.time,
          userName,
          sport: selectedSport,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // On successful booking, set the latest booking and update current bookings
        setBookingStatus(`Booking confirmed! ID: ${data.id}`);
        setCurrentBookings(prev => [...prev, data]);
        setLatestBooking(data);
        
        // Reset the form for the next booking
        setUserName('');
        
        // Update available slots to reflect the booking
        const slotsResponse = await fetch(`${API_URL}/slots?venueId=${selectedVenue}&date=${selectedDate}`);
        const slotsData = await slotsResponse.json();
        setAvailableSlots(slotsData);
        
        // Reset selectedSlot only after latestBooking is set
        // to ensure proper rendering flow
        setTimeout(() => {
          setSelectedSlot(null);
          setLatestBooking(null); // Reset latestBooking after a delay to allow summary display
        }, 5000); // Show booking summary for 5 seconds
      } else {
        setBookingStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error booking slot:', error);
      setBookingStatus('Failed to book slot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVenueSelect = (venueId) => {
    setSelectedVenue(venueId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate dates for the next 7 days
  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    
    return dates;
  };

  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/confirm-booking" element={<ConfirmBookingPage />} />
        <Route path="/" element={
          <HomePage 
            venues={venues}
            sports={sports}
            selectedVenue={selectedVenue}
            setSelectedVenue={setSelectedVenue}
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            availableSlots={availableSlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            userName={userName}
            setUserName={setUserName}
            loading={loading}
            latestBooking={latestBooking}
            currentBookings={currentBookings}
            sportIcons={sportIcons}
            handleBookSlot={handleBookSlot}
            handleVenueSelect={handleVenueSelect}
            getNextWeekDates={getNextWeekDates}
          />
        } />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;
