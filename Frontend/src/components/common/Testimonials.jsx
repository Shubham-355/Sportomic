import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Cricket Enthusiast",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Sportomic made it incredibly easy to find and book cricket grounds in my area. The real-time availability feature saved me so much time!",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Tennis Player",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I love how I can book tennis courts on the go. The app is intuitive and the booking process is seamless. Highly recommended!",
    rating: 4
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Football Coach",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    text: "As a football coach, I need reliable access to good fields. Sportomic has been a game-changer for scheduling practice sessions and matches.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of sports enthusiasts who use Sportomic to book venues and play their favorite sports.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 transform -translate-x-8 -translate-y-8">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27 8C27 3.58172 23.4183 0 19 0C14.5817 0 11 3.58172 11 8C11 12.4183 14.5817 16 19 16C23.4183 16 27 12.4183 27 8Z" fill="#3B82F6" fillOpacity="0.2"/>
              <path d="M64 27C64 22.5817 60.4183 19 56 19C51.5817 19 48 22.5817 48 27C48 31.4183 51.5817 35 56 35C60.4183 35 64 31.4183 64 27Z" fill="#3B82F6" fillOpacity="0.2"/>
              <path d="M16 45C16 40.5817 12.4183 37 8 37C3.58172 37 0 40.5817 0 45C0 49.4183 3.58172 53 8 53C12.4183 53 16 49.4183 16 45Z" fill="#3B82F6" fillOpacity="0.2"/>
            </svg>
          </div>
          
          <div className="absolute bottom-0 right-0 transform translate-x-8 translate-y-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
              <rect x="30" width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
              <rect x="60" width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
              <rect y="30" width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
              <rect x="30" y="30" width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
              <rect x="60" y="30" width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
              <rect y="60" width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
              <rect x="30" y="60" width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
              <rect x="60" y="60" width="20" height="20" rx="5" fill="#3B82F6" fillOpacity="0.2"/>
            </svg>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100 relative z-10">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                <path d="M10.6324 5.64879C13.1536 2.27547 16.2375 0.5 20.2822 0.5C22.3636 0.5 24.2443 1.02322 25.9574 2.11686C27.7286 3.13326 29.1285 4.6224 30.2351 6.60153C31.3417 8.58066 31.8533 10.753 31.8533 13.1652C31.8533 16.5385 30.8048 19.4341 28.7234 21.9011C26.6419 24.3108 24.0054 25.5156 20.8138 25.5156C18.7323 25.5156 17.0192 24.7803 15.6593 23.3097C14.3575 21.839 13.7085 20.1369 13.7085 18.1578C13.7085 16.3429 14.2783 14.7536 15.4731 13.3957C16.668 12.0378 18.2636 11.3025 20.2369 11.3025C20.7685 11.3025 21.4178 11.4153 22.1852 11.6408C21.5361 9.34129 20.1762 8.24765 18.1529 8.24765C17.0463 8.24765 16.008 8.77088 15.0378 9.7873C14.0677 10.8038 13.2503 12.2744 12.6013 14.2535C11.9522 16.2326 11.6503 18.2116 11.6503 20.2479C11.6503 23.9957 12.6014 27.0669 14.5037 29.5339C16.406 31.9437 19.0034 33.1484 22.2379 33.1484C25.6856 33.1484 28.6514 31.8311 31.086 29.1528C33.5206 26.4745 34.7516 23.1013 34.7516 19.1512C34.7516 14.0854 33.1029 9.86471 29.8634 6.43878C26.624 3.01285 22.1852 0.950153 16.6046 0.5C17.5166 0.725089 18.3039 1.18728 19.0034 1.96252C19.7029 2.73777 20.2068 3.6871 20.5087 4.66625C18.2636 4.66625 16.3914 4.98782 14.8919 5.63094C13.3923 6.19683 11.9522 7.24319 10.6324 5.64879ZM36.4193 5.64879C38.9405 2.27547 42.0245 0.5 46.0691 0.5C48.1506 0.5 50.0312 1.02322 51.7443 2.11686C53.5156 3.13326 54.9155 4.6224 56.0221 6.60153C57.1287 8.58066 57.6403 10.753 57.6403 13.1652C57.6403 16.5385 56.5918 19.4341 54.5103 21.9011C52.4289 24.3108 49.7924 25.5156 46.6008 25.5156C44.5193 25.5156 42.8062 24.7803 41.4463 23.3097C40.1444 21.839 39.4954 20.1369 39.4954 18.1578C39.4954 16.3429 40.0653 14.7536 41.2601 13.3957C42.455 12.0378 44.0506 11.3025 46.0239 11.3025C46.5554 11.3025 47.2047 11.4153 47.9722 11.6408C47.3231 9.34129 45.9632 8.24765 43.9399 8.24765C42.8333 8.24765 41.795 8.77088 40.8248 9.7873C39.8546 10.8038 39.0373 12.2744 38.3882 14.2535C37.7392 16.2326 37.4373 18.2116 37.4373 20.2479C37.4373 23.9957 38.3884 27.0669 40.2907 29.5339C42.193 31.9437 44.7904 33.1484 48.0249 33.1484C51.4726 33.1484 54.4384 31.8311 56.873 29.1528C59.3076 26.4745 60.5386 23.1013 60.5386 19.1512C60.5386 14.0854 58.8899 9.86471 55.6504 6.43878C52.411 3.01285 47.9722 0.950153 42.3916 0.5C43.3036 0.725089 44.0909 1.18728 44.7904 1.96252C45.4899 2.73777 45.9938 3.6871 46.2957 4.66625C44.0506 4.66625 42.1783 4.98782 40.6788 5.63094C39.1793 6.19683 37.7392 7.24319 36.4193 5.64879Z" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeOpacity="0.5"/>
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-blue-100">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-lg text-gray-700 mb-6">
                  "{testimonials[activeIndex].text}"
                </blockquote>

                <div>
                  <h4 className="font-bold text-gray-900">{testimonials[activeIndex].name}</h4>
                  <p className="text-blue-600">{testimonials[activeIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
