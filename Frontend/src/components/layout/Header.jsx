import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, openLoginModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-white/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl mr-2">🏏</span>
            <span className="font-bold text-xl text-gray-800">
              Sportomic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-[#ddffe7] text-green-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/venues"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/venues'
                  ? 'bg-[#ddffe7] text-green-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Venues
            </Link>
            <Link
              to="/sports"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/sports'
                  ? 'bg-[#ddffe7] text-green-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Sports
            </Link>
            {isAuthenticated && (
              <Link
                to="/bookings"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === '/bookings'
                    ? 'bg-[#ddffe7] text-green-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                My Bookings
              </Link>
            )}
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/about'
                  ? 'bg-[#ddffe7] text-green-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/contact'
                  ? 'bg-[#ddffe7] text-green-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons or Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 bg-[#ddffe7]/30 hover:bg-[#ddffe7]/50 py-2 px-3 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#ddffe7] rounded-full flex items-center justify-center">
                    <span className="text-green-800 font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">{user.name}</span>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isProfileMenuOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10"
                  >
                    <Link
                      to="/bookings"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>My Bookings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-red-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => openLoginModal('login')}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => openLoginModal('register')}
                  className="px-4 py-2 bg-[#ddffe7] text-green-800 rounded-lg hover:bg-[#c3f8d4] transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/' ? 'bg-[#ddffe7] text-green-800' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/venues"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/venues' ? 'bg-[#ddffe7] text-green-800' : 'text-gray-700'
                }`}
              >
                Venues
              </Link>
              <Link
                to="/sports"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/sports' ? 'bg-[#ddffe7] text-green-800' : 'text-gray-700'
                }`}
              >
                Sports
              </Link>
              {isAuthenticated && (
                <Link
                  to="/bookings"
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === '/bookings' ? 'bg-[#ddffe7] text-green-800' : 'text-gray-700'
                  }`}
                >
                  My Bookings
                </Link>
              )}
              <Link
                to="/about"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/about' ? 'bg-[#ddffe7] text-green-800' : 'text-gray-700'
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/contact' ? 'bg-[#ddffe7] text-green-800' : 'text-gray-700'
                }`}
              >
                Contact
              </Link>

              {/* Mobile Auth Buttons */}
              <div className="pt-2 border-t border-gray-100 mt-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-2 px-4 py-3">
                      <div className="w-8 h-8 bg-[#ddffe7] rounded-full flex items-center justify-center">
                        <span className="text-green-800 font-semibold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 hover:bg-gray-50 rounded-lg transition-colors mt-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        openLoginModal('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        openLoginModal('register');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 bg-[#ddffe7] text-green-800 rounded-lg"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
