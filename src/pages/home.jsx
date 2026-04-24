import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from 'lucide-react';
const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // state للتحكم في عرض القائمة على الموبايل

  const handleGetStarted = () => navigate("/login");
  const handleLearnMore = () => navigate("/about");
  const handleUploadMRI = () => navigate("/diagnosis");
  const handleLearnMoreAbout = () => navigate("/about");

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">

      {/* NAVBAR (ثابت) */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-3 md:space-y-0">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/images/logo brain toumer 1.svg"
              alt="Brainalyze Logo"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold text-gray-900">Brainalyze</h1>
          </div>

          {/* Hamburger Button للموبايل */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none text-2xl"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>

          {/* Links */}
          <ul
            className={`flex flex-col md:flex-row md:space-x-10 text-gray-800 font-semibold text-lg transition-all duration-300 ${
              isOpen ? "block" : "hidden"
            } md:flex`}
          >
            <li>
              <Link to="/" className="text-blue-700 block py-2 md:py-0">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-700 block py-2 md:py-0">About</Link>
            </li>
            <li>
              <Link to="/diagnosis" className="hover:text-blue-700 block py-2 md:py-0">Diagnosis</Link>
            </li>
            <li>
              <Link to="/results" className="hover:text-blue-700 block py-2 md:py-0">Results</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-700 block py-2 md:py-0">Contact Us</Link>
            </li>
          </ul>

          {/* Login / Sign Up */}
          <div className="flex flex-col md:flex-row items-center md:space-x-4 mt-2 md:mt-0">
            <Link
              to="/login"
              className="px-5 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium mb-2 md:mb-0"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 text-white bg-gradient-to-r from-[#0B6CF6] to-[#4F8BFF] rounded-lg hover:opacity-90 transition font-medium shadow-md"
            >
              Sign Up
            </Link>
          </div>

        </div>
      </nav>


      {/* MAIN CONTENT */}
      <main>
        {/* --- HERO SECTION START --- */}
<section className="relative w-full h-screen flex items-center justify-center overflow-hidden font-['Poppins']">
  
  {/* 1. الصورة الخلفية - مجبرة تملا الشاشة من أولها لآخرها بدون فراغات */}
  <img 
    src="/images/home1.svg" 
    alt="Brain AI" 
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
  />

  {/* 2. طبقة الألوان - خفيفة جداً عشان جمال الصورة يظهر */}
  <div className="absolute inset-0 z-10 bg-blue-600/10 backdrop-brightness-90"></div>

  {/* 3. المحتوى المركزي */}
  <div className="relative z-20 w-full max-w-[1200px] px-6">
    
    {/* الصندوق الزجاجي الشفاف جداً */}
     <div className="relative backdrop-blur-[2px] bg-white/5 border border-white/10 rounded-[40px] p-12 md:p-20 text-center">
      <h1 className="text-white text-5xl md:text-7xl font-black mb-8 leading-tight drop-shadow-lg">
        AI-Powered Brain Tumor <br /> Diagnosis
      </h1>

      <p className="max-w-[750px] mx-auto text-white text-xl md:text-2xl font-['Rubik'] font-medium leading-relaxed mb-12 drop-shadow-md">
        Fast, accurate, and secure brain MRI analysis powered by <br className="hidden md:block" /> 
        advanced artificial intelligence technology.
      </p>

      {/* الأزرار - رجعت تشتغل بالدوال بتاعتك */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <button 
          onClick={handleGetStarted} // رجعت تشتغل
          className="w-full sm:w-56 py-4 bg-white text-[#0B6CF6] text-xl font-bold rounded-xl shadow-xl hover:bg-opacity-95 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Get Started
        </button>

        <button 
          onClick={handleLearnMore} // رجعت تشتغل
          className="w-full sm:w-56 py-4 bg-transparent border-2 border-white/70 text-white text-xl font-bold rounded-xl hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Learn More
        </button>
      </div>

    </div>
  </div>

  {/* لمسات إضاءة لإخفاء أي عيوب في أطراف الصورة */}
  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent z-10"></div>
</section>
{/* --- HERO SECTION END --- */}

        {/* HOW IT WORKS */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-bold mb-16">How Brainalyze Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Card 1 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#0B6CF6] to-[#4F8BFF] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12">
                    </path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload MRI Scan</h3>
                <p className="text-gray-600">Securely upload your brain MRI images
                                  through our encrypted platform in just a few clicks.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#0B6CF6] to-[#4F8BFF] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 19V6l12-3v14H9zM3 19V6l12-3v14H3z">
                    </path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-gray-600">Our advanced AI algorithms analyze your
                                             MRI scan with precision and speed using
                                             deep learning technology.
                                           <p>"Built on EfficientNet-B3 Architecture".</p></p>  
              </div>

              {/* Card 3 */}
              <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#0B6CF6] to-[#4F8BFF] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12h6m-6 4h6m-5 3v-8a2 2 0 012-2h4a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2z">
                    </path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Results & Report</h3>
                <p className="text-gray-600">Receive detailed analysis results and
                                             comprehensive reports within minutes for immediate review.</p>
              </div>

            </div>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-bold mb-16">Why Choose Brainalyze</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Fast Analysis</h3>
                <p className="text-gray-600">Get results in minutes, not hours or days</p>
              </div>

              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">High Accuracy</h3>
                <p className="text-gray-600">98% accuracy rate validated by medical professionals</p>
              </div>

              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a3 3 0 003-3v-4a3 3 0 00-3-3h-12a3 3 0 00-3 3v4a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Secure & Private</h3>
                <p className="text-gray-600">HIPAA compliant with end-to-end encryption</p>
              </div>

              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Easy Access</h3>
                <p className="text-gray-600">Simple, intuitive interface accessible anywhere</p>
              </div>

            </div>

          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-bold mb-4">Trusted by Medical Professionals</h2>
            <p className="text-xl text-gray-600 mb-16">
              Leading doctors and radiologists rely on Brainalyze for accurate diagnosis
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-left">
                <div className="flex items-center space-x-4 mb-4">
                  <img src="images/img1.svg" alt="" className="w-16 h-16 rounded-full" />
                  <div>
                    <p className="text-lg font-semibold">Dr. Samar Hisham</p>
                    <p className="text-sm text-gray-600">Project Supervisor</p>
                  </div>
                </div>
                <p className="text-gray-700">
                " Brainalyze has revolutionized our
                  diagnostic process. The accuracy and
                  speed are remarkable."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-left">
                <div className="flex items-center space-x-4 mb-4">
                  <img src="images/img2.svg" alt="" className="w-16 h-16 rounded-full" />
                  <div>
                    <p className="text-lg font-semibold">Dr. Mayar Ali</p>
                    <p className="text-sm text-gray-600">Project Supervisor</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  " The AI analysis provides insights that
                  complement our clinical expertise
                  perfectly."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-left">
                <div className="flex items-center space-x-4 mb-4">
                  <img src="images/Dr.rodina.svg" alt="" className="w-16 h-16 rounded-full" />
                  <div>
                    <p className="text-lg font-semibold">Dr. Rodaina</p>
                    <p className="text-sm text-gray-600">Project Supervisor</p>
                  </div>
                </div>
                <p className="text-gray-700">
                 " Brainalyze helps us make faster, more
                   confident decisions for our patients."
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-[#0B6CF6] to-[#4F8BFF] text-center text-white">

          <h2 className="text-4xl font-bold mb-4">Start your diagnosis today with Brainalyze</h2>
          <p className="text-xl mb-10">Join thousands of medical professionals using AI-powered brain tumor analysis</p>

          <button
            onClick={handleUploadMRI}
            className="px-8 py-4 bg-white text-blue-400 font-semibold rounded-lg shadow-xl hover:bg-gray-100"
          >
            Upload MRI Scan
          </button>
        </section>

        {/* ABOUT */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">

            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">About Brainalyze</h2>

              <p className="text-lg text-gray-600">
                We're on a mission to democratize access to advanced medical imaging analysis through artificial intelligence. Our team of medical professionals and AI experts work together to create tools that save lives.
              </p>
              <p className="text-lg text-gray-600">
                 "Developed by a dedicated research team at EELU, utilizing state-of-the-art Deep Learning technology."
              </p>

              <button
                onClick={handleLearnMoreAbout}
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Learn More About Us
              </button>
            </div>

            <div className="lg:w-1/2">
              <img src="images/home.svg" className="w-full rounded-xl shadow-xl" alt="" />
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
         </div>
       );
     };

export default Home;
