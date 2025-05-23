// Configuration file that loads environment variables
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  appName: import.meta.env.VITE_APP_NAME || 'Sportomic',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  
  // Default sports data
  defaultSports: [
    'Cricket', 
    'Football', 
    'Badminton', 
    'Tennis', 
    'Basketball', 
    'Pickleball'
  ],
  
  // Default venues data
  defaultVenues: [
    { id: 1, name: 'Kabir Sports Academy', location: 'Bopal, Ahmedabad' },
    { id: 2, name: 'AB Box Cricket', location: 'South Bopal, Ahmedabad' },
    { id: 3, name: 'Karmaveer Education and Sports Federation', location: 'Koba, Gandhinagar' },
    { id: 4, name: 'BCCA Box Cricket', location: 'Chandkheda, Ahmedabad' },
    { id: 5, name: 'Eagle Pickleball', location: 'Mumatpura, Ahmedabad' },
    { id: 6, name: 'Crick Buddies Box Cricket', location: 'Satellite, Ahmedabad' },
    { id: 7, name: 'Paradise Box Cricket', location: 'Danilimda, Ahmedabad' },
    { id: 8, name: 'Spinters Club', location: 'Shela, Ahmedabad' }
  ],
  
  // Sport icons and details
  sportIcons: {
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
  }
};

export default config;
