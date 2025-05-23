import { useState } from 'react';
import { motion } from 'framer-motion';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const SportRecommender = ({ onSportSelect }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    experienceLevel: '',
    intensity: '',
    environment: '',
    teamOrIndividual: '',
    age: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
  };
  
  const nextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/ai/recommend-sports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setRecommendations(data.recommendations);
      nextStep();
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setError('Unable to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelect = (sport) => {
    if (onSportSelect) {
      onSportSelect(sport);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-[#ddffe7]/30 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Find Your Perfect Sport
      </h3>
      
      {step === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600 mb-4">Let's find the perfect sport for you based on your preferences.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your experience level</label>
              <select 
                name="experienceLevel" 
                value={preferences.experienceLevel} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ddffe7] focus:border-[#ddffe7]"
              >
                <option value="">Select an option</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Physical intensity preferred</label>
              <select 
                name="intensity" 
                value={preferences.intensity} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ddffe7] focus:border-[#ddffe7]"
              >
                <option value="">Select an option</option>
                <option value="Low">Low intensity</option>
                <option value="Medium">Medium intensity</option>
                <option value="High">High intensity</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Indoor or outdoor preference</label>
              <select 
                name="environment" 
                value={preferences.environment} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ddffe7] focus:border-[#ddffe7]"
              >
                <option value="">Select an option</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Either">No preference</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Team or individual sport</label>
              <select 
                name="teamOrIndividual" 
                value={preferences.teamOrIndividual} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ddffe7] focus:border-[#ddffe7]"
              >
                <option value="">Select an option</option>
                <option value="Team">Team sport</option>
                <option value="Individual">Individual sport</option>
                <option value="Either">No preference</option>
              </select>
            </div>
            
            <div className="pt-2">
              <button 
                onClick={getRecommendations}
                disabled={loading}
                className="w-full py-3 bg-[#ddffe7] text-green-800 rounded-lg font-medium hover:bg-[#c3f8d4] transition flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting Recommendations...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    Get Recommendations
                  </span>
                )}
              </button>
              
              {error && (
                <p className="mt-2 text-red-600 text-sm">{error}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
      
      {step === 2 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600 mb-4">Based on your preferences, here are our sport recommendations:</p>
          
          <div className="space-y-3 mb-6">
            {recommendations.map((sport, index) => (
              <motion.div 
                key={sport}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#ddffe7]/10 border border-[#ddffe7]/30 rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">
                    {sport === 'Cricket' ? '🏏' :
                     sport === 'Football' ? '⚽' :
                     sport === 'Basketball' ? '🏀' :
                     sport === 'Tennis' ? '🎾' :
                     sport === 'Badminton' ? '🏸' :
                     sport === 'Pickleball' ? '🎯' : '🏆'}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800">{sport}</h4>
                    <p className="text-xs text-gray-500">
                      {index === 0 ? 'Best Match' : index === 1 ? 'Great Option' : 'Good Choice'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleSelect(sport)}
                  className="px-3 py-1.5 bg-[#ddffe7] text-green-800 rounded-lg text-sm font-medium hover:bg-[#c3f8d4] transition"
                >
                  Select
                </button>
              </motion.div>
            ))}
          </div>
          
          <button 
            onClick={prevStep}
            className="w-full py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Preferences
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default SportRecommender;
