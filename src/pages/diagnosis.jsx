import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
const Diagnosis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [scanDate, setScanDate] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'dcm'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Please upload a valid file (JPG, PNG, or DICOM)');
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  // ✅ Updated Start Analysis
  const handleStartAnalysis = () => {

    if (!selectedFile || !patientName || !patientId || !scanDate) {
      alert("Please complete patient information and upload a file first.");
      return;
    }

    navigate('/processing', { 
      state: { 
        fileName,
        patientName,
        patientId,
        scanDate
      } 
    });
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileName('');
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
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
            <Link to="/about" className="hover:text-blue-700">About</Link>
          </li>
          <li>
            <Link to="/diagnosis" className="text-blue-700">Diagnosis</Link>
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
     

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto bg-gray-50 px-6 py-16 text-center mt-0">
        <h1 className="text-4xl font-bold mb-2">Upload Your Brain MRI Scan</h1>
        <p className="text-slate-600 mb-1">Get AI-powered analysis in minutes</p>
        <p className="text-xs text-slate-400">Supported formats: .jpg, .png, .dcm • Your data is encrypted & secure</p>

        {/* ================= Patient Information ================= */}
<div className="bg-white rounded-2xl shadow-md p-8 mt-10 text-left">
  
  <div className="flex items-center gap-2 mb-6">
    <svg xmlns="http://www.w3.org/2000/svg" 
         className="w-6 h-6 text-blue-600" 
         fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
    <h3 className="text-lg font-semibold">Patient Information</h3>
  </div>

  <div className="grid md:grid-cols-3 gap-6">
    
    {/* Patient Name */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Patient Name
      </label>
      <input
        type="text"
        placeholder="Enter full name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Patient ID */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Patient ID
      </label>
      <input
        type="text"
        placeholder="e.g., MRN-123456"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Date of Scan */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Date of Scan
      </label>
      <input
        type="date"
        value={scanDate}
        onChange={(e) => setScanDate(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

  </div>
</div>


        {/* UPLOAD BOX */}
        <div 
          className={`mt-10 p-10 rounded-xl border-2 border-dashed ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
          } transition-all duration-300 cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h10a3 3 0 000-6 5 5 0 10-9.9.9" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v10" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7l4-4 4 4" />
            </svg>
          </div>

          {selectedFile ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-green-600">File Selected Successfully!</h3>
              <p className="text-sm text-slate-600 mt-1">{fileName}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="mt-3 text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove File
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-medium">Drag and drop your MRI scan here</h3>
              <p className="text-sm text-slate-500">or click to browse files</p>

              <label htmlFor="fileInput" className="cursor-pointer inline-block mt-6">
                <div className="px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#2563EB] to-[#9333EA] hover:opacity-90 transition duration-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Choose File
                </div>
              </label>
            </>
          )}

          <input 
            id="fileInput" 
            type="file" 
            className="hidden" 
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.dcm"
          />
        </div>

        {/* Start Analysis Button */}
<button
  onClick={() => {
    if (!selectedFile) {
      alert("Please choose a file before starting the analysis.");
      return;
    }
    handleStartAnalysis();
  }}
  className="mt-10 flex items-center justify-center gap-2 mx-auto px-6 py-3 
             text-white font-semibold rounded-lg transition duration-300
             bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] hover:opacity-90 cursor-pointer"
>

  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="white">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
      d="M14.752 11.168l-6.518-3.76A1 1 0 007 8.12v7.758a1 1 0 001.234.97l6.518-1.737a1 1 0 00.75-.97v-4.973a1 1 0 00-.75-.058z"/>
  </svg>
  Start Analysis
</button>


        {/* زر تجريبي للاختبار فقط */}
        <button 
          onClick={() => navigate('/processing', { state: { fileName: 'test_file.dcm' } })}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
        >
          🧪 Test - Go to Processing (Without File)
        </button>

        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h4 className="font-semibold">Upload Scan</h4>
            <p className="text-sm text-slate-600 mt-2">Securely upload your brain MRI scan in supported formats</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h4 className="font-semibold">AI Analysis</h4>
            <p className="text-sm text-slate-600 mt-2">Our advanced AI algorithms analyze your scan for potential abnormalities</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="font-semibold">Results & Report</h4>
            <p className="text-sm text-slate-600 mt-2">Securely upload your brain MRI scan in supported formats </p>
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
          
        
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Diagnosis;