import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ sports }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentSportIndex, setCurrentSportIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Sport data with colors
  const sportData = [
    {
      name: 'Cricket',
      color: 'text-green-500'
    },
    {
      name: 'Football',
      color: 'text-blue-500'
    },
    {
      name: 'Tennis',
      color: 'text-yellow-500'
    },
    {
      name: 'Badminton',
      color: 'text-purple-500'
    }
  ];

  // Typewriter effect
  useEffect(() => {
    const currentSport = sportData[currentSportIndex].name;
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // If we're typing and not at the end of the word
        if (displayText.length < currentSport.length) {
          setDisplayText(currentSport.substring(0, displayText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause at the end of the word before starting to delete
          setIsDeleting(true);
          setTypingSpeed(1500);
        }
      } else {
        // If we're deleting and not at the beginning of the word
        if (displayText.length > 0) {
          setDisplayText(currentSport.substring(0, displayText.length - 1));
          setTypingSpeed(75); // Delete a bit faster than typing
        } else {
          // When word is fully deleted, move to next word
          setIsDeleting(false);
          setCurrentSportIndex((currentSportIndex + 1) % sportData.length);
          setTypingSpeed(500); // Pause before starting the next word
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentSportIndex, sportData, typingSpeed]);

  return (
    <div className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 opacity-90"></div>
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDRjMCAyLjIwOSAxLjc5MSA0IDQgNHM0LTEuNzkxIDQtNHptLTIwIDBoLTRhMiAyIDAgMSAwIDAgNGg0YTIgMiAwIDEgMCAwLTR6bTM2IDBjLTIuMjA5IDAtNCAxLjc5MS00IDRzMS43OTEgNCA0IDRjMi4yMDkgMCA0LTEuNzkxIDQtNHMtMS43OTEtNC00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container relative mx-auto px-4 py-24 md:py-32 text-center text-white">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Play Any Sport. <br className="hidden md:block" />
          Any Time. Any Where.
        </motion.h1>
        
        <motion.p 
          className="text-xl opacity-90 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Book your favorite sports venues instantly with Sportomic's seamless booking platform
        </motion.p>
        
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a 
            href="#booking-form" 
            className="bg-[#ddffe7] text-green-800 hover:bg-white transition font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Book Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
