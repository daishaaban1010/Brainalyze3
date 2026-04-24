import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSupport = () => navigate('/support');
  const handlePrivacyPolicy = () => navigate('/privacy');
  const handleTermsOfService = () => navigate('/terms');

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/images/logo brain toumer 1.svg" alt="Brainalyze Logo" className="w-8 h-8" />
          <span className="font-bold text-xl text-gray-700 font-poppins">Brainalyze</span>
        </div>
        <Link 
          to="/signup" 
          className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition transform hover:scale-105"
        >
          Sign Up
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Side - Image Section */}
          <div className="lg:w-1/2 p-4 lg:p-0 bg-brain-gradient flex items-center justify-center relative">
            <div className="p-8 space-y-6">
              <div className="rounded-xl overflow-hidden shadow-lg bg-white p-2">
                <img 
                  src="/images/login.svg" 
                  alt="Reset Password Illustration" 
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2 text-center">
                <h2 className="text-gray-900 text-3xl font-poppins font-bold">
                  AI-Powered Brain Tumor Analysis
                </h2>
                <p className="text-gray-600 text-base leading-relaxed font-rubik">
                  Advanced artificial intelligence technology for accurate brain tumor detection and analysis, 
                  helping medical professionals make informed decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Reset Form */}
          <div className="lg:w-1/2 p-12 flex flex-col justify-center space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-4">
                 <img src="/images/logo brain toumer 1.svg" alt="Logo" className="w-10 h-10" />
                 <span className="text-gray-900 text-2xl font-poppins font-bold">Brainalyze</span>
              </div>
              <h1 className="text-gray-900 text-3xl font-poppins font-bold">Reset Password</h1>
              <p className="text-gray-600 text-base font-inter">
                Enter the email address associated with your account and we will send you a link to reset your password.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="block text-gray-700 text-sm font-semibold ml-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input 
                    type="email" 
                    placeholder="Email address"
                    className="w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 p-3 pl-10 transition font-rubik"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full p-3 text-white bg-blue-gradient hover:opacity-90 rounded-lg font-medium transition duration-150 shadow-md flex items-center justify-center gap-2"
              >
                Send Reset Link
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>

            <div className="text-center">
              <Link 
                to="/login" 
                className="text-blue-600 font-medium text-sm hover:underline flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <img src="/images/logo brain toumer 1.svg" alt="Brainalyze Logo" className="w-9 h-9 rounded-sm" />
            <div className="text-white text-xl font-poppins font-bold">Brainalyze</div>
          </div>
          <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 my-2 md:my-0">
            <button onClick={handlePrivacyPolicy} className="hover:text-white transition">Privacy Policy</button>
            <button onClick={handleTermsOfService} className="hover:text-white transition">Terms of Service</button>
            <button onClick={handleSupport} className="hover:text-white transition">Support</button>
          </div>
          <div className="mt-2 md:mt-0">© Brainalyze 2025. All rights reserved.</div>
        </div>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-rubik { font-family: 'Rubik', sans-serif; }
        .bg-brain-gradient { background-image: linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%); }
        .bg-blue-gradient { background-image: linear-gradient(90deg, #1C64F2 0%, #4F8BFF 100%); }
      `}</style>
    </div>
  );
};

export default ResetPassword;