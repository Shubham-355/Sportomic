import { motion } from 'framer-motion';

const SportCategories = ({ sports, sportIcons, onSportSelect, selectedSport }) => {
  // Enhanced sport details with mint theme colors
  const sportDetails = {
    Cricket: {
      emoji: "🏏",
      gradient: "from-[#b7f7d4] to-[#ddffe7]",
      hoverGradient: "from-[#a5f0c5] to-[#c9f5d8]",
      shadow: "shadow-[#ddffe7]/30",
      bgAccent: "bg-[#eafff2]",
      description: "Book cricket grounds and box cricket arenas",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
          <path d="M7 15l2.5-2.5M10 10l4 4M14 10l3 3" />
        </svg>
      )
    },
    Football: {
      emoji: "⚽",
      gradient: "from-[#b7f7d4] to-[#ddffe7]",
      hoverGradient: "from-[#a5f0c5] to-[#c9f5d8]",
      shadow: "shadow-[#ddffe7]/30",
      bgAccent: "bg-[#eafff2]",
      description: "Find football fields and futsal courts near you",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0110 10M12 2v10h10M2 12c0-2.8 1.2-5.3 3-7M12 12L5 5" />
        </svg>
      )
    },
    Badminton: {
      emoji: "🏸",
      gradient: "from-[#b7f7d4] to-[#ddffe7]",
      hoverGradient: "from-[#a5f0c5] to-[#c9f5d8]",
      shadow: "shadow-[#ddffe7]/30",
      bgAccent: "bg-[#eafff2]",
      description: "Reserve indoor and outdoor badminton courts",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 6v12M7 12h10M3.5 18.5l17-13M20.5 18.5l-17-13" />
        </svg>
      )
    },
    Tennis: {
      emoji: "🎾",
      gradient: "from-[#b7f7d4] to-[#ddffe7]",
      hoverGradient: "from-[#a5f0c5] to-[#c9f5d8]",
      shadow: "shadow-[#ddffe7]/30",
      bgAccent: "bg-[#eafff2]",
      description: "Book tennis courts for singles or doubles",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 8l8 8M16 8l-8 8" />
        </svg>
      )
    },
    Basketball: {
      emoji: "🏀",
      gradient: "from-[#b7f7d4] to-[#ddffe7]",
      hoverGradient: "from-[#a5f0c5] to-[#c9f5d8]",
      shadow: "shadow-[#ddffe7]/30",
      bgAccent: "bg-[#eafff2]",
      description: "Discover basketball courts for practice and games",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20" />
          <path d="M12 12a5 5 0 005-5M12 12a5 5 0 01-5 5" />
        </svg>
      )
    },
    Pickleball: {
      emoji: "🎯",
      gradient: "from-[#b7f7d4] to-[#ddffe7]",
      hoverGradient: "from-[#a5f0c5] to-[#c9f5d8]",
      shadow: "shadow-[#ddffe7]/30",
      bgAccent: "bg-[#eafff2]",
      description: "Try the fastest growing sport on dedicated courts",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 8V5M12 19v-3M5 12H2M22 12h-3" />
        </svg>
      )
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-lg border border-[#ddffe7]/30 py-12 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#ddffe7]/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#ddffe7]/10 blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block mb-3 bg-[#ddffe7]/30 px-3 py-1 rounded-full">
            <div className="flex items-center text-sm font-medium text-green-800">
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Sports Selection
            </div>
          </div>
          
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Book A Sports Venue Near You
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choose from a variety of sports and find the perfect venue for your game.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sports.map((sport, index) => (
            <motion.div
              key={sport}
              className="relative"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => onSportSelect(sport)}
                className={`w-full h-full flex flex-col items-center justify-center rounded-2xl px-4 py-6 transition-all duration-300 relative group ${
                  selectedSport === sport 
                    ? `bg-gradient-to-b ${sportDetails[sport]?.gradient || "from-[#b7f7d4] to-[#ddffe7]"} shadow-lg ${sportDetails[sport]?.shadow || "shadow-[#ddffe7]/30"} border-2 border-[#a5f0c5]` 
                    : `bg-white hover:bg-gradient-to-b hover:${sportDetails[sport]?.hoverGradient || "from-[#a5f0c5] to-[#c9f5d8]"} border border-gray-100 hover:border-[#a5f0c5] hover:shadow-lg hover:${sportDetails[sport]?.shadow || "shadow-[#ddffe7]/30"}`
                }`}
              >
                <div className="absolute top-3 right-3">
                  {selectedSport === sport && (
                    <motion.div 
                      className="w-5 h-5 rounded-full bg-white flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <svg className="w-3 h-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                
                <div className={`w-16 h-16 mb-4 rounded-full flex items-center justify-center text-3xl ${
                  selectedSport === sport 
                    ? 'bg-white/80' 
                    : `${sportDetails[sport]?.bgAccent || "bg-[#eafff2]"} group-hover:bg-white/80`
                } transition-colors duration-300`}>
                  {sportDetails[sport]?.emoji || sportIcons[sport]?.emoji || "🏆"}
                </div>
                
                <h3 className={`font-semibold text-lg mb-1 ${
                  selectedSport === sport ? 'text-green-800' : 'text-gray-800 group-hover:text-green-800'
                }`}>
                  {sport}
                </h3>
                
                <p className={`text-xs leading-relaxed text-center ${
                  selectedSport === sport ? 'text-green-700/80' : 'text-gray-500 group-hover:text-green-700/80'
                } transition-colors duration-300 mt-1 max-w-[180px] mx-auto`}>
                  {sportDetails[sport]?.description || `Find and book ${sport} venues`}
                </p>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SportCategories;
