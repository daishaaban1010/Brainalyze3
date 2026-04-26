import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
const ProcessingScan = () => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isProcessing, setIsProcessing] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const fileName = location.state?.fileName || 'MRI_Scan.dcm';
  const scanId = location.state?.scanId || 12345;
  const patientData = useMemo(() => location.state?.patientData || {}, [location.state?.patientData]);

  const isCancelledRef = useRef(false); // flag لمنع استدعاء API بعد الإلغاء

  // ================================
  // 📌 دالة لجلب النتيجة من الـ API
  // ================================
  const fetchResultFromAPI = useCallback(async () => {
    if (isCancelledRef.current) return;

    try {
      const response = await fetch(`https://your-backend-api.com/analyze/${scanId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_name: fileName, patient_data: patientData, scan_id: scanId })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      let apiResponse;
      try {
        apiResponse = await response.json();
      } catch {
        throw new Error("Failed to parse API response");
      }

      const resultData = {
        patient_name: apiResponse.patient?.name || patientData.name || "N/A",
        patient_id: apiResponse.patient?.id || patientData.id || "N/A",
        scan_date: apiResponse.scan_date || new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }),
        scan_type: apiResponse.scan_type || "MRI T1-weighted",
        confidence: apiResponse.confidence_score || apiResponse.probability || 0,
        result: apiResponse.detection_result || apiResponse.result, 
        tumor_type: apiResponse.tumor_type || "Brain Tumor",
        location: apiResponse.location || apiResponse.detected_in || "Brain region",
        priority: apiResponse.priority_level || (apiResponse.detection_result === "tumor" ? "High Priority" : "Normal"),
        metrics: apiResponse.metrics || { sensitivity: apiResponse.sensitivity || "94.2%", specificity: apiResponse.specificity || "91.8%" },
        recommendations: apiResponse.recommendations || (
          apiResponse.detection_result === "tumor"
            ? [
                "Immediate Neurological Consultation - Schedule appointment within 48-72 hours",
                "Additional Imaging - Consider contrast-enhanced MRI for detailed characterization",
                "Follow-up Protocol - Establish monitoring schedule based on specialist recommendations"
              ]
            : [
                "Routine Check-up - Schedule regular visits every 6–12 months",
                "Healthy Lifestyle - Maintain balanced diet and mental wellness",
                "Preventive Screening - Repeat MRI if any new symptoms arise"
              ]
        ),
        error: apiResponse.error,
        error_message: apiResponse.error_message,
        error_code: apiResponse.error_code
      };

      navigate('/results', { state: { resultData, fileName, scanId, originalResponse: apiResponse } });

    } catch (error) {
      console.error('Error fetching analysis result:', error);

      const errorData = {
        type: "failed",
        title: "Analysis Failed",
        status: "Error",
        errorCode: "502",
        errorMessage: "Unable to analyze scan. Please try again.",
        patientName: patientData.name || "N/A",
        patientId: patientData.id || "N/A",
        scanDate: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }),
        scanType: "MRI",
        recommendations: ["Check your file format and try again", "Contact support if issue persists"],
        color: "gray",
        icon: "❌"
      };

      navigate('/results', { state: { resultData: errorData, isError: true } });
    }
  }, [scanId, fileName, patientData, navigate]);

  // ================================
  // 📌 Progress + Countdown
  // ================================
  useEffect(() => {
    if (!isProcessing) return;

    const totalTime = 30; // seconds
    let elapsed = 0;

    const timer = setInterval(() => {
      if (isCancelledRef.current) {
        clearInterval(timer);
        return;
      }

      elapsed += 1;
      setTimeRemaining(prev => Math.max(0, prev - 1));
      setProgress(Math.min(100, (elapsed / totalTime) * 100));

      if (elapsed >= totalTime) {
        clearInterval(timer);
        setTimeout(fetchResultFromAPI, 1200);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isProcessing, fetchResultFromAPI]);

  // ================================
  // 📌 Cancel Analysis
  // ================================
  const handleCancel = () => {
    isCancelledRef.current = true;
    setIsProcessing(false);
    setProgress(100);
    setTimeRemaining(0);

    const cancelData = {
      type: "failed",
      title: "Analysis Cancelled",
      status: "Cancelled by User",
      errorMessage: "Analysis was cancelled by the user.",
      patientName: patientData.name || "N/A",
      scanDate: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }),
      recommendations: ["You can upload another scan to try again", "Contact support if you need assistance"],
      color: "gray",
      icon: "⏹️"
    };

    setTimeout(() => navigate('/results', { state: { resultData: cancelData, isCancelled: true } }), 500);
  };

  const steps = [
    { name: 'Image Preprocessing', status: progress > 0 },
    { name: 'AI Analysis', status: progress > 33 },
    { name: 'Result Generation', status: progress > 66 }
  ];

  // ================================
  // JSX
  // ================================
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      {/* NAV */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img src="/images/logo brain toumer 1.svg" alt="Brainalyze Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold text-gray-900">Brainalyze</h1>
          </div>
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-10 text-gray-800 font-semibold text-lg">
              <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-700">About</Link></li>
              <li><Link to="/diagnosis" className="text-blue-700">Diagnosis</Link></li>
              <li><Link to="/results" className="hover:text-blue-700">Results</Link></li>
              <li><Link to="/contact" className="hover:text-blue-700">Contact Us</Link></li>
            </ul>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 text-2xl focus:outline-none">
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
        <ul className={`md:hidden flex flex-col items-center bg-white w-full space-y-2 mt-2 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
          <li><Link to="/" className="hover:text-blue-700 py-2 block">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-700 py-2 block">About</Link></li>
          <li><Link to="/diagnosis" className="text-blue-700 py-2 block">Diagnosis</Link></li>
          <li><Link to="/results" className="hover:text-blue-700 py-2 block">Results</Link></li>
          <li><Link to="/contact" className="hover:text-blue-700 py-2 block">Contact Us</Link></li>
        </ul>
      </nav>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 bg-gradient-to-b from-blue-50 to-blue-100 rounded-full flex items-center justify-center shadow-inner">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2c1.1 0 2 .9 2 2v1h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v1" />
                    <circle cx="8" cy="12" r="1" fill="currentColor"/>
                    <circle cx="16" cy="12" r="1" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-3 h-3 bg-blue-400 rounded-full opacity-80"></div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
            Your MRI Scan is Being Analyzed...
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            Our AI system is processing your brain MRI using deep learning models. Please wait a few moments.
          </p>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg max-w-md mx-auto text-left">
            <p className="text-sm text-blue-700"><span className="font-semibold">File:</span> {fileName}</p>
            {patientData.name && <p className="text-sm text-blue-700 mt-1"><span className="font-semibold">Patient:</span> {patientData.name}</p>}
          </div>

          {/* Progress */}
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-wave"></div>
              </div>
            </div>
            <div className="mt-4 text-center text-slate-400 text-sm">
              <span>Estimated Time Remaining: {timeRemaining} second{timeRemaining !== 1 ? 's' : ''}...</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              onClick={handleCancel}
              disabled={!isProcessing}
              className={`px-5 py-2 border border-blue-600 text-blue-600 rounded-lg transition transform hover:-translate-y-0.5 ${isProcessing ? 'hover:bg-blue-50 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
            >
              {isProcessing ? 'Cancel Analysis' : 'Analysis Cancelled'}
            </button>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${step.status ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <p className={`text-sm font-medium ${step.status ? 'text-green-600' : 'text-gray-400'}`}>{step.name}</p>
              </div>
            ))}
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
        

      <style jsx>{`
        @keyframes wave { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-wave { animation: wave 2s linear infinite; }
      `}</style>
    </div>
  );
};

export default ProcessingScan;
