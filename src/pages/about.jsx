
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { Mail, Phone, MapPin, Cpu, Users, Lightbulb, Globe, Zap } from 'lucide-react';

const About = () => {
  
  const navigate = useNavigate();
   const [isOpen, setIsOpen] = useState(false);

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handlePrivacyPolicy = () => {
    navigate('/privacy');
  };

  const handleTermsOfService = () => {
    navigate('/terms');
  };

  const handleSupport = () => {
    navigate('/support');
  };

  const handleGetStarted = () => {
    navigate('/login'); // تم التعديل هنا لفتح صفحة Login
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
          <li>
            <Link to="/" className="hover:text-blue-700">Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-blue-700">About</Link>
          </li>
          <li>
            <Link to="/diagnosis" className="hover:text-blue-700">Diagnosis</Link>
          </li>
          <li>
            <Link to="/results" className="hover:text-blue-700">Results</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-700">Contact Us</Link>
          </li>
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

      {/* Links للموبايل - تظهر عند فتح الهامبورجر */}
      <ul
        className={`md:hidden flex flex-col items-center bg-white w-full space-y-2 mt-2 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li>
          <Link to="/" className="hover:text-blue-700 py-2 block">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-700 py-2 block">About</Link>
        </li>
        <li>
          <Link to="/diagnosis" className="text-blue-700 py-2 block">Diagnosis</Link>
        </li>
        <li>
          <Link to="/results" className="hover:text-blue-700 py-2 block">Results</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-blue-700 py-2 block">Contact Us</Link>
        </li>
      </ul>
  
</nav>


      {/* Main Content */}
      <main className="flex-grow">
        {/* Our Mission Section */}
        <section className="bg-gradient-mission-light py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-2">
                Our Mission
              </h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              {/* Text Content */}
              <div className="lg:w-1/2 space-y-8 lg:space-y-10 order-2 lg:order-1">
                <p className="text-xl font-rubik text-gray-700 leading-relaxed">
                  At Brainalyze, we are dedicated to revolutionizing early brain tumor detection through the power of artificial intelligence. Our mission is to bridge the gap between cutting-edge technology and accessible healthcare, ensuring that patients receive timely and accurate diagnoses that can save lives.
                </p>
                <p className="text-xl font-rubik text-gray-600 leading-relaxed">
                  We believe that every person deserves access to the most advanced diagnostic tools available. By combining machine learning algorithms with medical expertise, we're creating a future where brain tumors are detected earlier, treatments are more effective, and patient outcomes are dramatically improved.
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-12 gap-y-6 pt-6 border-t border-gray-300 mt-10">
                  <div className="text-center">
                    <p className="text-3xl font-poppins font-bold text-blue-600">96%</p>
                    <p className="text-sm font-poppins text-gray-600 mt-1">Accuracy Rate</p>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-poppins font-bold text-green-600">50K+</p>
                    <p className="text-sm font-poppins text-gray-600 mt-1">Scans Analyzed</p>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-poppins font-bold text-purple-600">24/7</p>
                    <p className="text-sm font-poppins text-gray-600 mt-1">Availability</p>
                  </div>
                </div>

                {/* Get Started Button */}
                <div className="pt-6">
                  <button 
                    onClick={handleGetStarted}
                    className="px-8 py-3 text-lg font-poppins font-semibold text-white bg-gradient-primary rounded-lg shadow-md hover:opacity-90 transition transform hover:scale-105"
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* Image Content */}
              <div className="lg:w-1/2 flex justify-center order-1 lg:order-2 relative -top-16">
                <div className="relative bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full transform hover:scale-105 transition duration-300">
                  <img 
                    src="/images/about.svg" 
                    alt="AI Brain Scan" 
                    className="w-full h-auto rounded-xl max-h-96 object-cover"
                  />
                  
                  <div className="flex justify-center space-x-8 mt-6 text-sm font-poppins font-medium">
                    <div className="flex items-center space-x-2 text-green-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>FDA Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a3 3 0 003-3v-4a3 3 0 00-3-3h-12a3 3 0 00-3 3v4a3 3 0 003 3z" />
                      </svg>
                      <span>HIPAA Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="py-24 bg-white font-['Poppins']">
          <div className="max-w-[1280px] mx-auto px-6">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-[36px] md:text-[40px] font-bold text-gray-900 mb-4 leading-tight">
                What Sets Us Apart
              </h2>
              <p className="max-w-[740px] mx-auto text-[18px] md:text-[20px] text-gray-600 font-['Rubik'] leading-[28px]">
                Discover the technology, team, and vision that drives our commitment to advancing brain health through AI innovation.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: Our Technology */}
              <div className="bg-gradient-to-br from-[#F0F7FF] to-[#DBEAFE] rounded-[24px] p-8 flex flex-col h-full border border-blue-50">
                <div className="w-16 h-16 bg-[#2563EB] rounded-[16px] flex items-center justify-center mb-8 shadow-lg shadow-blue-200">
                  <Cpu className="text-white w-8 h-8" />
                </div>
                <h3 className="text-[24px] font-bold text-gray-900 mb-4">Our Technology</h3>
                <p className="text-gray-700 text-[16px] font-['Rubik'] leading-[24px] mb-10 flex-grow">
                  Our proprietary AI algorithms utilize deep learning neural networks trained on thousands of medical images. We employ advanced computer vision techniques to achieve unprecedented accuracy.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-[14px] text-gray-600 font-['Rubik'] font-medium">
                    <div className="w-3.5 h-3.5 bg-[#2563EB] rounded-[3px]" />
                    <span>Deep Learning Models</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-gray-600 font-['Rubik'] font-medium">
                    <div className="w-3.5 h-3.5 bg-[#2563EB] rounded-[3px]" />
                    <span>Real-time Processing</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px] text-gray-600 font-['Rubik'] font-medium">
                    <div className="w-3.5 h-3.5 bg-[#2563EB] rounded-[3px]" />
                    <span>Cloud Infrastructure</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Our Team */}
              <div className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-[24px] p-8 flex flex-col h-full border border-green-50">
                <div className="w-16 h-16 bg-[#059669] rounded-[16px] flex items-center justify-center mb-8 shadow-lg shadow-green-200">
                  <Users className="text-white w-8 h-8" />
                </div>
                <h3 className="text-[24px] font-bold text-gray-900 mb-4">Our Team</h3>
                <p className="text-gray-700 text-[16px] font-['Rubik'] leading-[24px] italic">
                  "We are an 8-member team of passionate innovators, combining expertise in UI/UX design, frontend, backend, and artificial intelligence. Together, we built Brainalyze to bridge the gap between technology and healthcare."
                </p>
              </div>

              {/* Card 3: Our Vision */}
              <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] rounded-[24px] p-8 flex flex-col h-full border border-purple-50">
                <div className="w-16 h-16 bg-[#7C3AED] rounded-[16px] flex items-center justify-center mb-8 shadow-lg shadow-purple-200">
                  <Lightbulb className="text-white w-8 h-8" />
                </div>
                <h3 className="text-[24px] font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 text-[16px] font-['Rubik'] leading-[24px] mb-10 flex-grow">
                  "We envision a future where AI becomes a standard companion in every neurology department. Our goal is to streamline the path from scan to surgery."
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-[#7C3AED] rounded-[3px] mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-[16px] font-bold text-gray-900">Global Impact</h4>
                      <p className="text-[14px] text-gray-600 font-['Rubik'] leading-tight">Reaching underserved communities worldwide</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-[#7C3AED] rounded-[3px] mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-[16px] font-bold text-gray-900">Innovation</h4>
                      <p className="text-[14px] text-gray-600 font-['Rubik'] leading-tight">Continuous advancement in AI capabilities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                 
      {/* CSS Styles */}
      <style jsx>{`
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-rubik { font-family: 'Rubik', sans-serif; }

        .bg-gradient-primary {
          background-image: linear-gradient(45deg, #0B6CF6 0%, #4F8BFF 100%);
        }

        .bg-gradient-mission-light {
          background-image: linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%);
        }

        .bg-footer-dark {
          background-color: #111827;
        }

        .bg-gradient-tech { 
          background-image: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); 
        }
        .bg-gradient-team { 
          background-image: linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%); 
        }
        .bg-gradient-vision { 
          background-image: linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 100%); 
        }
      `}</style>
    </div>
  );
};

export default About;
