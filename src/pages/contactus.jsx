import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      }, 1500);
    }
  };

  // Handle social media clicks
  const handleSocialMediaClick = (platform) => {
    const socialLinks = {
      linkedin: 'https://linkedin.com/company/brainalyze',
      twitter: 'https://twitter.com/brainalyze',
      github: 'https://github.com/brainalyze'
    };
    const url = socialLinks[platform];
    if (url) {
      window.open(url, '_blank');
    } else {
      console.warn(`No social link for ${platform}`);
    }
  };

  // Handle map click
  const handleMapClick = () => {
    console.log('Map clicked');
    // يمكنك فتح خريطة جوجل أو أي خدمة خرائط
    // window.open('https://maps.google.com/?q=Cairo,Egypt', '_blank');
  };

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
              {/* NAVBAR (ثابت) */}
              <nav className="bg-white shadow-sm py-5 sticky top-0 z-50 transition-all duration-300">
                <div className="container mx-auto flex items-center justify-between px-6">
              
                  {/* Logo - على اليسار */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo brain toumer 1.svg"
            alt="Brainalyze Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold text-gray-900">Brainalyze</h1>
        </div>

        {/* Links - تظهر في الوسط على الديسكتوب */}
        <ul className="hidden md:flex space-x-10 text-gray-800 font-semibold text-lg mx-auto">
          <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-700">About</Link></li>
          <li><Link to="/diagnosis" className="hover:text-blue-700">Diagnosis</Link></li>
          <li><Link to="/results" className="hover:text-blue-700">Results</Link></li>
          <li><Link to="/contact" className="text-blue-700">Contact Us</Link></li>
        </ul>

        {/* Hamburger - يظهر على الموبايل */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Links الموبايل - تظهر عند الضغط على الهامبورجر */}
      <ul className={`md:hidden flex flex-col items-center bg-white w-full space-y-2 mt-2 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
        <li><Link to="/" className="hover:text-blue-700 py-2 block">Home</Link></li>
        <li><Link to="/about" className="hover:text-blue-700 py-2 block">About</Link></li>
        <li><Link to="/diagnosis" className="hover:text-blue-700 py-2 block">Diagnosis</Link></li>
        <li><Link to="/results" className="hover:text-blue-700 py-2 block">Results</Link></li>
        <li><Link to="/contact" className="text-blue-700 py-2 block">Contact Us</Link></li>
      </ul>
                
              </nav>
              
    
      {/* Main Content */}
      <main className="py-8">
        {/* Hero Section */}
        <div className="bg-blue-50 py-12 text-center shadow-sm mt-0">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Get in Touch with Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're here to help you with any questions or support you need. Our team is ready to assist you.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="container mx-auto px-6 mt-12">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white shadow-md rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Send us a Message</h3>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows="5"
                    className={`w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="send-btn w-full text-white py-3 rounded-lg text-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#2563eb',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#1d4ed8';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(37, 99, 235, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#2563eb';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white shadow-md rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start space-x-4">
                    <div 
                      className="bg-blue-50 p-3 rounded-md text-blue-600 mt-1 icon-hover"
                      style={{ transition: 'all 0.3s ease' }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600">Email</p>
                      <p>support@brainalyze.com</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div 
                      className="bg-blue-50 p-3 rounded-md text-blue-600 mt-1 icon-hover"
                      style={{ transition: 'all 0.3s ease' }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600">Phone</p>
                      <p>+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Fri from 8am to 6pm</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div 
                      className="bg-blue-50 p-3 rounded-md text-blue-600 mt-1 icon-hover"
                      style={{ transition: 'all 0.3s ease' }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600">Location</p>
                      <p>Cairo, Egypt</p>
                      <p className="text-sm text-gray-500">Global headquarters</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="bg-white shadow-md rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Follow Us</h3>
                <div className="flex space-x-6 text-2xl">
                  <button 
                    onClick={() => handleSocialMediaClick('linkedin')}
                    className="icon-hover text-blue-700"
                    style={{ transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <i className="fab fa-linkedin"></i>
                  </button>
                  <button 
                    onClick={() => handleSocialMediaClick('twitter')}
                    className="icon-hover text-blue-400"
                    style={{ transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button 
                    onClick={() => handleSocialMediaClick('github')}
                    className="icon-hover text-gray-800"
                    style={{ transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <i className="fab fa-github"></i>
                  </button>
                </div>
              </div>

              {/* Headquarters */}
              <div className="bg-white shadow-md rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Headquarters</h3>
                <div className="text-center">
                  <div className="text-blue-600 text-3xl mb-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <p className="font-medium text-gray-800">Cairo, Egypt</p>
                  <p className="text-gray-500 mb-5">Global Hub - Serving healthcare worldwide</p>
                  <button 
                    onClick={handleMapClick}
                    className="map-hover text-blue-500 cursor-pointer inline-block"
                    style={{ transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => {
                      e.target.style.color = '#2563eb';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = '#3b82f6';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="fas fa-map text-2xl mb-2 block"></i>
                    <p className="font-semibold">Interactive Map</p>
                    <p className="text-gray-500 text-sm">Click to view our location</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
            <footer className="bg-gray-900 text-gray-200 py-10 mt-12">
              <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center mr-2">
                      <img src="/images/logo brain toumer 1.svg" alt="Brainalyze Logo" className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold">Brainalyze</h3>
                  </div>
                  <p className="text-sm text-gray-300 max-w-md">
                    Revolutionizing medical diagnostics with AI-powered brain tumor detection.
                    Empowering healthcare professionals worldwide with accurate, fast, and reliable analysis.
                  </p>
                </div>
      
                <div>
                  <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    </li>
                    <li>
                      <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    </li>
                    <li>
                      <Link to="/diagnosis" className="hover:text-white transition-colors">Diagnosis</Link>
                    </li>
                    <li>
                      <Link to="/results" className="hover:text-white transition-colors">Results</Link>
                    </li>
                    <li>
                      <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                    </li>
                  </ul>
                </div>
      
                {/* 3. Contact (الجزء المتعدل بنفس الحجم والمسافات) */}
    <div>
      <h4 className="font-semibold mb-4 text-white">Contact</h4>
      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-blue-500" />
          <span className="text-gray-300">contact@brainalyze.com</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-blue-500" />
          <span className="text-gray-300">+1 (555) 123-4567</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-blue-500" />
          <span className="text-gray-300">Cairo , Egypt</span>
        </div>
      </div>
    </div>
  </div>
      
              <div className="container mx-auto px-6 mt-8 pt-6 border-t border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-sm text-gray-400 mb-4 md:mb-0">
                    © 2025 Brainalyze. All rights reserved.
                  </div>
                  <div className="text-sm text-gray-400">
                    Made with <span className="text-red-500">❤</span> for better healthcare
                  </div>
                </div>
              </div>
            </footer>
          
    </div>
  );
};

export default ContactUs;