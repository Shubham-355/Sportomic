import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current page is the home page (for styling purposes)
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check to set proper header state when navigating directly to a page
    setIsScrolled(window.scrollY > 10);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2 border-b border-gray-100' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            {/* Inline SVG logo */}
            <div className={`h-10 w-10 ${isScrolled || !isHomePage ? 'bg-[#ddffe7]' : 'bg-white'} rounded-full flex items-center justify-center`}>
              <svg 
                className={`h-6 w-6 ${isScrolled || !isHomePage ? 'text-green-800' : 'text-green-700'}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                <path d="M10 17L15 12L10 7V17Z" fill="currentColor"/>
              </svg>
            </div>
            <span className={`font-bold text-2xl ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}>
              Sportomic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition ${
                isScrolled || !isHomePage
                  ? (location.pathname === "/" ? "text-green-700" : "text-gray-700 hover:text-green-700") 
                  : (location.pathname === "/" ? "text-white opacity-100" : "text-white/90 hover:text-white")
              }`}
            >
              Home
            </Link>
            <Link 
              to="/venues" 
              className={`font-medium transition ${
                isScrolled || !isHomePage
                  ? (location.pathname === "/venues" ? "text-green-700" : "text-gray-700 hover:text-green-700") 
                  : (location.pathname === "/venues" ? "text-white opacity-100" : "text-white/90 hover:text-white")
              }`}
            >
              Venues
            </Link>
            <Link 
              to="/sports" 
              className={`font-medium transition ${
                isScrolled || !isHomePage
                  ? (location.pathname === "/sports" ? "text-green-700" : "text-gray-700 hover:text-green-700") 
                  : (location.pathname === "/sports" ? "text-white opacity-100" : "text-white/90 hover:text-white")
              }`}
            >
              Sports
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition ${
                isScrolled || !isHomePage
                  ? (location.pathname === "/about" ? "text-green-700" : "text-gray-700 hover:text-green-700") 
                  : (location.pathname === "/about" ? "text-white opacity-100" : "text-white/90 hover:text-white")
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition ${
                isScrolled || !isHomePage
                  ? (location.pathname === "/contact" ? "text-green-700" : "text-gray-700 hover:text-green-700") 
                  : (location.pathname === "/contact" ? "text-white opacity-100" : "text-white/90 hover:text-white")
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/bookings" 
              className="bg-[#ddffe7] hover:bg-[#c3f8d4] text-green-800 px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg"
            >
              My Bookings
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100 animate-fadeIn">
            <Link 
              to="/" 
              className={`block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                location.pathname === "/" ? "text-green-700 font-medium" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/venues" 
              className={`block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                location.pathname === "/venues" ? "text-green-700 font-medium" : "text-gray-700"
              }`}
            >
              Venues
            </Link>
            <Link 
              to="/sports" 
              className={`block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                location.pathname === "/sports" ? "text-green-700 font-medium" : "text-gray-700"
              }`}
            >
              Sports
            </Link>
            <Link 
              to="/about" 
              className={`block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                location.pathname === "/about" ? "text-green-700 font-medium" : "text-gray-700"
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                location.pathname === "/contact" ? "text-green-700 font-medium" : "text-gray-700"
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/bookings" 
              className="block px-4 py-3 text-green-700 font-medium hover:bg-[#ddffe7]/20"
            >
              My Bookings
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
