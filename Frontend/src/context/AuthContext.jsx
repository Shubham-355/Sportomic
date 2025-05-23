import { createContext, useContext, useState, useEffect } from 'react';
import config from '../config';

// Create auth context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);

  // Register new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${config.apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setUser(data.user);
      setToken(data.token);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      setUser(data.user);
      setToken(data.token);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Create guest user for non-authenticated operations
  const createGuestSession = (name) => {
    const guestUser = {
      id: `guest-${Date.now()}`,
      name: name || 'Guest User',
      isGuest: true
    };
    
    setUser(guestUser);
    localStorage.setItem('user', JSON.stringify(guestUser));
    return guestUser;
  };

  // Open login modal
  const openLoginModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  // Close login modal
  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user && !user.isGuest;
  
  // Check if user is guest
  const isGuest = !!user && user.isGuest;

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isGuest,
    isModalOpen,
    authMode,
    register,
    login,
    logout,
    createGuestSession,
    openLoginModal,
    closeLoginModal,
    setAuthMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
