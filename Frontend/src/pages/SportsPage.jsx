import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Add the missing Link import
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import config from '../config'; // Import the config file

const SportsPage = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSport, setExpandedSport] = useState(null);
  
  // Rich data about each sport
  const sportDetails = {
    Cricket: {
      emoji: "🏏",
      description: "A bat-and-ball game played between two teams on a field with a 22-yard pitch in the center.",
      facts: [
        "India's most popular sport with over 1 billion followers worldwide",
        "A standard cricket match can last from 3 hours to 5 days",
        "The cricket bat can be up to 38 inches long"
      ],
      benefits: ["Improves hand-eye coordination", "Builds teamwork skills", "Enhances strategic thinking"],
      equipments: ["Bat", "Ball", "Stumps", "Pads", "Gloves", "Helmet"],
      surfaces: ["Natural grass", "Artificial turf", "Clay pitches"],
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-[#ddffe7]",
      textColor: "text-green-800"
    },
    Football: {
      emoji: "⚽",
      description: "A team sport played with a spherical ball between two teams of 11 players each.",
      facts: [
        "The most popular sport in the world with over 4 billion followers",
        "The first World Cup was held in 1930 in Uruguay",
        "The modern game originated in England in the 19th century"
      ],
      benefits: ["Improves cardiovascular health", "Develops lower body strength", "Enhances teamwork and coordination"],
      equipments: ["Football", "Studded shoes", "Shin guards", "Gloves (for goalkeeper)"],
      surfaces: ["Natural grass", "Artificial turf", "Indoor courts"],
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-[#ddffe7]",
      textColor: "text-green-800"
    },
    Badminton: {
      emoji: "🏸",
      description: "A racquet sport played by either two players (singles) or two pairs (doubles) on opposite halves of a rectangular court.",
      facts: [
        "The fastest racket sport with shuttlecocks reaching speeds over 300 km/h",
        "Originated in British India as a variant of battledore and shuttlecock",
        "Became an Olympic sport in 1992"
      ],
      benefits: ["Improves reflexes", "Increases aerobic fitness", "Develops agility and coordination"],
      equipments: ["Racquet", "Shuttlecock", "Appropriate footwear", "Nets"],
      surfaces: ["Indoor wooden courts", "Synthetic courts"],
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac1f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-[#ddffe7]",
      textColor: "text-green-800"
    },
    Tennis: {
      emoji: "🎾",
      description: "A racket sport played on a rectangular court either by two players (singles) or two teams of two players each (doubles).",
      facts: [
        "Modern tennis originated in the United Kingdom in the late 19th century",
        "The four Grand Slam tournaments are the most prestigious events",
        "The fastest recorded serve was 263 km/h by Sam Groth"
      ],
      benefits: ["Full body workout", "Improves bone density", "Enhances mental alertness"],
      equipments: ["Racquet", "Tennis balls", "Tennis shoes", "Net"],
      surfaces: ["Clay", "Grass", "Hard court", "Carpet"],
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-[#ddffe7]",
      textColor: "text-green-800"
    },
    Basketball: {
      emoji: "🏀",
      description: "A team sport in which two teams of five players compete to score points by shooting a ball through an elevated hoop.",
      facts: [
        "Invented by Dr. James Naismith in 1891",
        "The NBA is the world's premier men's professional basketball league",
        "A regulation basketball hoop is 10 feet (3.05m) high"
      ],
      benefits: ["Builds endurance", "Improves balance and coordination", "Develops concentration and self-discipline"],
      equipments: ["Basketball", "Basketball shoes", "Basketball hoop"],
      surfaces: ["Indoor hardwood", "Outdoor concrete", "Synthetic courts"],
      image: "https://images.unsplash.com/photo-1546519638-68e109acd27d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "bg-[#ddffe7]",
      textColor: "text-green-800"
    },
    Pickleball: {
      emoji: "🎯",
      description: "A paddle sport that combines elements of tennis, badminton, and table tennis, played on a badminton-sized court.",
      facts: [
        "Invented in 1965 on Bainbridge Island, Washington",
        "One of the fastest growing sports in the United States",
        "Named after the inventor's family dog, Pickles"
      ],
      benefits: ["Suitable for all ages and skill levels", "Low impact on joints", "Develops quick reflexes"],
      equipments: ["Paddle", "Wiffle ball", "Net", "Court"],
      surfaces: ["Indoor courts", "Outdoor hard courts"],
      image: "https://images.pexels.com/photos/7937415/pexels-photo-7937415.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
      color: "bg-[#ddffe7]",
      textColor: "text-green-800"
    }
  };

  useEffect(() => {
    // Fetch sports data
    const fetchSports = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/sports`);
        const data = await response.json();
        setSports(data);
      } catch (error) {
        console.error('Error fetching sports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 bg-[#ddffe7]/10">
        <div className="absolute top-0 right-0 -mr-20 w-96 h-96 rounded-full bg-[#ddffe7]/20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="flex flex-col items-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sports We Offer
            </motion.h1>
            
            <motion.div 
              className="w-16 h-1 bg-[#ddffe7] rounded-full mb-6"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            ></motion.div>
            
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Discover the wide range of sports available at our partner venues
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Sports Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-[#ddffe7] rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {sports.map((sport, index) => {
                const isExpanded = expandedSport === sport;
                const details = sportDetails[sport] || {};
                
                return (
                  <motion.div 
                    key={sport}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={`rounded-3xl overflow-hidden shadow-md transition-all duration-500 ${
                      isExpanded ? 'col-span-full transform transition-all duration-500 border-2 border-[#ddffe7]' : 'border border-gray-100 hover:shadow-lg hover:border-[#ddffe7]/30'
                    }`}
                  >
                    <div 
                      className="cursor-pointer"
                      onClick={() => setExpandedSport(isExpanded ? null : sport)}
                    >
                      {/* Sport Header with Image */}
                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={details.image || `https://via.placeholder.com/800x400?text=${sport}`} 
                          alt={sport} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <div className="flex items-center">
                            <span className="text-4xl mr-3">{details.emoji || "🏆"}</span>
                            <h2 className="text-3xl font-bold text-white">{sport}</h2>
                          </div>
                        </div>
                      </div>
                      
                      {/* Basic Sport Info */}
                      <div className="p-6 bg-white">
                        <p className="text-gray-600 mb-4">{details.description || `Learn more about ${sport} and find venues to play.`}</p>
                        
                        {!isExpanded && (
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                              {(details.surfaces || []).slice(0, 2).map((surface, i) => (
                                <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ddffe7]/30 text-green-800">
                                  {surface}
                                </span>
                              ))}
                              {(details.surfaces || []).length > 2 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{(details.surfaces || []).length - 2} more
                                </span>
                              )}
                            </div>
                            
                            <button className="text-green-700 font-medium flex items-center">
                              Learn More
                              <svg className="ml-1 w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Expanded Details */}
                    {isExpanded && (
                      <motion.div 
                        className="p-6 bg-[#ddffe7]/5 border-t border-[#ddffe7]/20"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Interesting Facts</h3>
                            <ul className="space-y-2">
                              {(details.facts || ["No facts available"]).map((fact, i) => (
                                <li key={i} className="flex items-start">
                                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-gray-600">{fact}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Benefits</h3>
                            <ul className="space-y-2">
                              {(details.benefits || ["No benefits listed"]).map((benefit, i) => (
                                <li key={i} className="flex items-start">
                                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-gray-600">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Equipment Needed</h3>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                              {(details.equipments || ["No equipment listed"]).map((equipment, i) => (
                                <div key={i} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-gray-700">{equipment}</span>
                                </div>
                              ))}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Playing Surfaces</h3>
                            <div className="flex flex-wrap gap-2">
                              {(details.surfaces || ["No surfaces listed"]).map((surface, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium bg-[#ddffe7]/40 text-green-800">
                                  {surface}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 flex flex-wrap justify-between items-center">
                          <button 
                            className="text-gray-600 font-medium flex items-center"
                            onClick={() => setExpandedSport(null)}
                          >
                            <svg className="mr-1 w-5 h-5 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Show Less
                          </button>
                          
                          <Link to="/venues" className="bg-[#ddffe7] hover:bg-[#c3f8d4] text-green-800 px-4 py-2 rounded-lg transition shadow-sm hover:shadow-md flex items-center">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Find {sport} Venues
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#ddffe7]/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#ddffe7]/30 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#ddffe7]/20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Play Your Favorite Sport?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Find and book the perfect venue now. Invite friends, organize matches, and enjoy the game.
            </p>
            <Link to="/venues" className="inline-flex items-center px-6 py-3 bg-[#ddffe7] text-green-800 rounded-lg font-medium hover:bg-[#c3f8d4] transition shadow-md hover:shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Venue Now
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SportsPage;
