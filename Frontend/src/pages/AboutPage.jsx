import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 bg-[#ddffe7]/10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 w-96 h-96 rounded-full bg-[#ddffe7]/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 w-96 h-96 rounded-full bg-[#ddffe7]/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="flex flex-col items-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About Sportomic
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
              Making sports accessible to everyone through easy venue booking
            </motion.p>
          </div>
          
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sports enthusiasts playing" 
                className="w-full h-80 object-cover"
              />
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#ddffe7]/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Sportomic, we believe that everyone should have access to quality sports facilities. Our mission is to connect sports enthusiasts with the best venues in their area, making booking seamless and hassle-free.
              </p>
              <p className="text-gray-600 mb-4">
                We're passionate about promoting active lifestyles and building communities around sports. By making venue booking simple, we hope to encourage more people to get out and play.
              </p>
              <div className="flex items-center text-green-700 font-medium">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Established in 2023 with a focus on accessibility
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Our Values Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <div className="w-16 h-1 bg-[#ddffe7] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The core principles that guide everything we do at Sportomic
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Accessibility',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm0 10h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2z" />
                  </svg>
                ),
                description: 'Making sports venues accessible to everyone, regardless of skill level or background.'
              },
              { 
                title: 'Community',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                description: 'Building vibrant communities of sports enthusiasts who share a passion for active living.'
              },
              { 
                title: 'Innovation',
                icon: (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                description: 'Continuously improving our platform to provide the best booking experience possible.'
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-[#ddffe7]/5 border border-[#ddffe7]/20 rounded-2xl p-8 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#ddffe7] text-green-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="py-20 bg-[#ddffe7]/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <div className="w-16 h-1 bg-[#ddffe7] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals behind Sportomic
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'Rahul Patel',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              },
              { 
                name: 'Priya Sharma',
                role: 'CTO',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              },
              { 
                name: 'Vikram Singh',
                role: 'Head of Operations',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              },
              { 
                name: 'Aisha Khan',
                role: 'Marketing Director',
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-green-700">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
