import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* Inline SVG logo instead of imported image */}
              <div className="h-10 w-10 bg-[#ddffe7]/20 p-1 rounded flex items-center justify-center">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                  <path d="M10 17L15 12L10 7V17Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-bold text-2xl">Sportomic</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Play Any Sport. Any Time. Any Where. Sportomic is the easiest way to book sports venues and join games across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#ddffe7]/10 flex items-center justify-center hover:bg-[#ddffe7]/20 transition backdrop-blur-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#ddffe7]/10 flex items-center justify-center hover:bg-[#ddffe7]/20 transition backdrop-blur-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#ddffe7]/10 flex items-center justify-center hover:bg-[#ddffe7]/20 transition backdrop-blur-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#ddffe7]/10 flex items-center justify-center hover:bg-[#ddffe7]/20 transition backdrop-blur-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-200">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
              <li><Link to="/venues" className="text-gray-300 hover:text-white transition">Venues</Link></li>
              <li><Link to="/sports" className="text-gray-300 hover:text-white transition">Sports</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-200">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition">Help Center</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/refund" className="text-gray-300 hover:text-white transition">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-200">Download Our App</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center border border-blue-400/30 bg-blue-900/50 backdrop-blur-sm hover:bg-blue-800/50 transition rounded-xl px-4 py-3">
                <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5227 7.39674C17.4042 7.29767 16.9501 7.07763 16.2603 7.07763C15.338 7.07763 14.0052 7.42773 12.8526 8.15413C12.8752 8.04933 12.9007 7.93296 12.9289 7.80453C12.9571 7.6761 12.9881 7.54767 13.0191 7.41924C13.4297 6.01961 13.8998 4.34648 13.0079 3.03296C12.6833 2.55569 12.1729 2.21844 11.5346 2.05492C11.0043 1.92248 10.4739 1.94207 10.0632 2.01452C9.65851 2.08629 9.23449 2.22268 8.86227 2.41057C8.46301 2.61266 8.06376 2.88438 7.75762 3.19773C7.40985 3.55177 6.9655 4.08159 6.81633 4.80799C6.59155 5.83686 6.74072 6.98159 7.13604 8.16824C7.22168 8.45377 7.31919 8.75244 7.42055 9.05112C7.38376 9.06677 7.34888 9.08242 7.31209 9.09807C6.37445 9.47786 3.40928 10.8971 3.35791 13.5155C3.34025 14.0775 3.45743 14.6394 3.69707 15.1543C3.94064 15.6692 4.29233 16.1244 4.75135 16.4894C5.18324 16.8347 5.71678 17.0738 6.30688 17.1952C6.82575 17.3088 7.37023 17.3127 7.91864 17.2363C8.66309 17.1363 9.46803 16.8732 10.0632 16.5749C10.6584 16.273 11.3082 15.8514 11.7962 15.3522C12.1943 14.9424 12.6077 14.419 12.9172 13.8414C13.1568 13.3932 13.3501 12.8895 13.4886 12.3192C13.5578 12.0288 13.6035 11.7187 13.6328 11.3889C14.5164 11.3792 15.2912 11.4712 15.9471 11.651C17.1458 11.9688 17.6901 12.5484 17.9071 13.0094C18.2009 13.6184 18.1204 14.2275 17.9071 14.5336C17.6252 14.9326 17.1185 15.1169 16.5629 15.0681C15.9941 15.0192 15.3967 14.7739 14.9833 14.4403C14.8135 14.3012 14.6831 14.148 14.5952 14.0168C14.5045 13.8817 14.4645 13.7778 14.4645 13.7163C14.4645 13.577 14.5782 13.4654 14.7217 13.4654C14.7865 13.4654 14.8527 13.4848 14.912 13.5197C14.9528 13.5449 14.9937 13.5741 15.0478 13.6132C15.3392 13.8376 15.8525 14.0501 16.3658 14.0954C16.8497 14.1384 17.2111 14.0034 17.3834 13.7582C17.5356 13.5391 17.5908 13.1343 17.3834 12.7079C17.0924 12.0876 16.2856 11.5924 15.1954 11.3156C14.4377 11.1163 13.5825 11.0187 12.6056 11.0675C12.6526 10.5058 12.6291 9.92242 12.529 9.31722C12.4362 8.75526 12.2743 8.15808 12.0364 7.5228C12.9642 6.70998 14.145 6.38097 15.0184 6.38097C15.5847 6.38097 16.0359 6.54717 16.1939 6.61526C16.2999 6.66266 16.4086 6.67631 16.4925 6.67631C16.6883 6.67631 16.8475 6.56358 16.8947 6.38892C16.9182 6.30861 16.9277 6.12865 16.8063 5.94335C16.5508 5.55163 16.0359 5.24222 15.3767 5.06226C14.7482 4.8823 14.0186 4.84285 13.3292 4.95559C13.3222 4.94592 13.3138 4.93757 13.3069 4.9279C13.1343 4.70855 12.9774 4.48989 12.8352 4.26491C12.4343 3.61335 12.1506 2.89831 12.2006 2.12777C12.2297 1.69104 12.4197 1.3446 12.6733 1.09122C12.9359 0.831138 13.2896 0.678627 13.7151 0.64111C14.1699 0.599795 14.6516 0.704666 15.0878 0.926025C15.7733 1.26543 16.1742 1.85228 16.3467 2.52705C16.5134 3.17861 16.4192 3.97959 16.1361 4.80589C16.0661 5.00867 15.9885 5.21489 15.9081 5.42179C15.9516 5.4387 15.9984 5.45773 16.0445 5.4767C16.8529 5.76472 17.4638 6.25365 17.8213 6.84707C18.0857 7.26421 18.0857 7.69024 17.5227 7.39674Z"/>
                  <path d="M3.33948 15.9454C2.35518 15.194 2.51221 13.6342 2.50063 13.5724C2.49095 13.5237 2.50452 13.4731 2.53748 13.438C2.57044 13.4029 2.61981 13.3863 2.66723 13.396C2.71561 13.4058 5.25626 13.7614 6.06121 15.0988C6.58008 15.9259 6.51316 17.2699 6.50735 17.3434C6.50444 17.3922 6.48698 17.4371 6.45305 17.4683C6.42009 17.4995 6.37267 17.5122 6.32914 17.5044C6.28077 17.4966 4.75342 17.1937 3.33948 15.9454Z"/>
                </svg>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center border border-blue-400/30 bg-blue-900/50 backdrop-blur-sm hover:bg-blue-800/50 transition rounded-xl px-4 py-3">
                <svg className="w-7 h-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.5 3.398C5.5 2.6516 5.5 2.27841 5.67582 2.11058C5.75387 2.0383 5.85118 1.99449 5.95555 1.98509C6.20693 1.96349 6.50553 2.18914 7.10274 2.64043L19.7834 12.0762C20.1743 12.3691 20.3697 12.5155 20.4304 12.695C20.4803 12.8486 20.4803 13.0166 20.4304 13.1702C20.3697 13.3497 20.1743 13.4962 19.7834 13.7891L7.10274 23.2248C6.50553 23.6761 6.20693 23.9018 5.95555 23.8802C5.85118 23.8708 5.75387 23.827 5.67582 23.7547C5.5 23.5868 5.5 23.2137 5.5 22.4673V3.398Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>© 2024 Sportomic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
