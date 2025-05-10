import { useState, useEffect } from 'react'
import './App.css'
import ChatBot from './components/ChatBot'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Close mobile menu when navigating to a section
  useEffect(() => {
    const handleHashChange = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    // Add click event listeners to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleHashChange);
    });
    
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleHashChange);
      });
    };
  }, [mobileMenuOpen]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.licenseType) {
      newErrors.licenseType = 'Please select a license type';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } else {
      setErrors(validationErrors);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className={`fixed w-full z-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-md transition-colors duration-300`}>
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold">SoftSell</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors duration-200">How It Works</a>
            <a href="#why-choose-us" className="hover:text-blue-600 transition-colors duration-200">Why Us</a>
            <a href="#Clients" className="hover:text-blue-600 transition-colors duration-200">Clients</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors duration-200">Contact</a>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-all duration-300`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 mr-3 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} transition-all duration-300`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${mobileMenuOpen ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : ''}`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className="transition-opacity duration-300"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" className="transition-opacity duration-300"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? 'max-h-64 opacity-100 shadow-lg' 
              : 'max-h-0 opacity-0'
          } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          aria-hidden={!mobileMenuOpen}
          role="menu"
        >
          <div className="px-6 py-4 space-y-4">
            <a 
              href="#how-it-works" 
              onClick={closeMobileMenu} 
              className={`block py-2 px-4 rounded-md transition-all duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700 active:bg-gray-600' 
                  : 'hover:bg-gray-100 active:bg-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              role="menuitem"
            >
              How It Works
            </a>
            <a 
              href="#why-choose-us" 
              onClick={closeMobileMenu} 
              className={`block py-2 px-4 rounded-md transition-all duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700 active:bg-gray-600' 
                  : 'hover:bg-gray-100 active:bg-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              role="menuitem"
            >
              Why Us
            </a>
            <a 
              href="#Clients" 
              onClick={closeMobileMenu} 
              className={`block py-2 px-4 rounded-md transition-all duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700 active:bg-gray-600' 
                  : 'hover:bg-gray-100 active:bg-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              role="menuitem"
            >
              Clients
            </a>
            <a 
              href="#contact" 
              onClick={closeMobileMenu} 
              className={`block py-2 px-4 rounded-md transition-all duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700 active:bg-gray-600' 
                  : 'hover:bg-gray-100 active:bg-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              role="menuitem"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <section id="hero" className={`pt-28 pb-20 px-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-50'}`}>
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex flex-col items-start">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transform Your Unused Software Licenses Into Cash
            </h1>
            <p className="text-xl mb-8 opacity-90">
              SoftSell makes it easy to resell your unused software licenses securely and for the best price on the market.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#contact" 
                className={`px-8 py-3 rounded-lg font-semibold ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
              >
                Sell Your Licenses
              </a>
              <a 
                href="#how-it-works" 
                className={`px-8 py-3 rounded-lg font-semibold ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} transition-colors`}
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
              alt="Software License Management" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className={`py-20 px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`flex flex-col items-center p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white`}>
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload License</h3>
              <p className="text-center">
                Submit your software license details through our secure portal for quick evaluation.
              </p>
            </div>
            
            <div className={`flex flex-col items-center p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white`}>
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Valuation</h3>
              <p className="text-center">
                Receive a competitive market valuation within 24 hours based on current demand.
              </p>
            </div>
            
            <div className={`flex flex-col items-center p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
              <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-6 ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white`}>
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Paid</h3>
              <p className="text-center">
                Accept the offer and receive payment through your preferred method within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className={`py-20 px-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="text-blue-600 text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Best Market Rates</h3>
              <p>We leverage our extensive network to get you the highest possible price for your licenses.</p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="text-blue-600 text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Secure Transfers</h3>
              <p>Our proprietary transfer system ensures complete security and compliance during the entire process.</p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="text-blue-600 text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Fast Turnaround</h3>
              <p>From valuation to payment, complete the entire process in as little as 72 hours.</p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
              <div className="text-blue-600 text-3xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p>Our team of licensing specialists guides you through every step of the selling process.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="Clients" className={`py-20 px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} shadow-lg`}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>CTO, TechDynamics Inc.</p>
                </div>
              </div>
              <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                "SoftSell made the process of selling our unused enterprise licenses incredibly smooth. We received 30% more than expected and the payment was processed within 2 days. Highly recommend!"
              </p>
            </div>
            
            <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} shadow-lg`}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-xl font-semibold">Michael Chen</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>IT Director, GlobalServe Solutions</p>
                </div>
              </div>
              <p className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                "After downsizing our operations, we had over 200 unused software licenses. SoftSell's team not only helped us value them correctly but also handled all compliance documentation. The process couldn't have been easier."
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`py-20 px-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-50'}`}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16">Get In Touch</h2>
          <div className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            {submitSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" role="alert">
                <p className="font-bold">Success!</p>
                <p>Your message has been sent. We'll get back to you shortly.</p>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : ''} ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : ''} ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="company" className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Company Name *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.company ? 'border-red-500' : ''} ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50'}`}
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>
                
                <div>
                  <label htmlFor="licenseType" className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>License Type *</label>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.licenseType ? 'border-red-500' : ''} ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50'}`}
                  >
                    <option value="">Select license type</option>
                    <option value="enterprise">Enterprise Software</option>
                    <option value="saas">SaaS Subscription</option>
                    <option value="desktop">Desktop Applications</option>
                    <option value="cloud">Cloud Services</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.licenseType && <p className="text-red-500 text-sm mt-1">{errors.licenseType}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className={`block mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows="5"
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-50'}`}
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className={`py-8 px-6 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-white'}`}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">SoftSell</h3>
              <p className="text-sm opacity-75">The easiest way to sell software licenses</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm opacity-75">
            <p>© {new Date().getFullYear()} SoftSell. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add ChatBot Component */}
      <ChatBot darkMode={darkMode} />
    </div>
  )
}

export default App
