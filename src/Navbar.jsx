import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-5">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="Brainalyze" className="w-6 h-6" />
          <span className="font-bold text-xl text-gray-900">Brainalyze</span>
        </div>
        <ul className="flex space-x-6 text-gray-800 font-semibold text-lg">
          <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
          <li><Link to="/diagnosis" className="hover:text-blue-700">Diagnosis</Link></li>
          <li><Link to="/about" className="hover:text-blue-700">About</Link></li>
          <li><Link to="/results" className="hover:text-blue-700">Results</Link></li>
          <li><Link to="/contact" className="text-blue-700 font-bold">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
