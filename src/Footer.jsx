import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-12">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <h3 className="text-xl font-bold">Brainalyze</h3>
          </div>
          <p className="text-sm text-gray-300 max-w-md">
            Revolutionizing medical diagnostics with AI-powered brain tumor detection.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/diagnosis" className="hover:text-white">Diagnosis</a></li>
            <li><a href="/results" className="hover:text-white">Results</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/login" className="hover:text-white">Login</a></li>
            <li><a href="/signup" className="hover:text-white">Sign Up</a></li>
          </ul>
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
  );
};

export default Footer;
