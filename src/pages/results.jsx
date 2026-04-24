import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone, MapPin } from 'lucide-react';
export default function Results() {
  const location = useLocation();
  const [status, setStatus] = useState("no_tumor");
  const [resultData, setResultData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState("");

  useEffect(() => {
    if (location.state?.resultData) {
      const incomingData = location.state.resultData;
      setResultData(incomingData);

      if (incomingData.type === "failed" || incomingData.result === "failed") {
        setStatus("failed");
      } else if (incomingData.result === "tumor") {
        setStatus("tumor");
      } else {
        setStatus("no_tumor");
      }

      setIsProcessing(false);
      return;
    }

    const fallbackData = {
      type: "success",
      result: "no_tumor",
      patient: {
        name: "",
        patientId: "",
        scanDate: "",
        scanType: ""
      },
      detectionProbability: 0,
      metrics: {
        sensitivity: 0,
        specificity: 0
      },
      tumorType: "",
      tumorClassification: ""
    };

    setResultData(fallbackData);
    setStatus("no_tumor");
    setIsProcessing(false);
  }, [location.state]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-gray-900 flex flex-col">

      {/* TEMP BUTTONS TO PREVIEW RESULTS */}
      <div className="flex gap-3 p-4 bg-gray-100 border mb-5">
        <button 
          onClick={() => setStatus("no_tumor")} 
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Show NO TUMOR
        </button>
        <button 
          onClick={() => setStatus("tumor")} 
          className="px-4 py-2 bg-yellow-600 text-white rounded"
        >
          Show TUMOR
        </button>
        <button 
          onClick={() => setStatus("failed")} 
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Show FAILED
        </button>
      </div>

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo brain toumer 1.svg"
              alt="Brainalyze Logo"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold text-gray-900">Brainalyze</h1>
          </div>

          <ul className="hidden md:flex space-x-10 text-gray-800 font-semibold text-lg mx-auto">
            <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-700">About</Link></li>
            <li><Link to="/diagnosis" className="hover:text-blue-700">Diagnosis</Link></li>
            <li><Link to="/results" className="text-blue-700">Results</Link></li>
            <li><Link to="/contact" className="hover:text-blue-700">Contact Us</Link></li>
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 text-2xl focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col items-center bg-white w-full space-y-2 py-4">
            <li><Link to="/" className="hover:text-blue-700 py-2 block">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-700 py-2 block">About</Link></li>
            <li><Link to="/diagnosis" className="hover:text-blue-700 py-2 block">Diagnosis</Link></li>
            <li><Link to="/results" className="text-blue-700 py-2 block">Results</Link></li>
            <li><Link to="/contact" className="hover:text-blue-700 py-2 block">Contact Us</Link></li>
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow container mx-auto px-6 py-8">
   {/* NO TUMOR SECTION - FINAL REFINED LAYOUT */}
{status === "no_tumor" && (
  <div className="max-w-7xl mx-auto px-12 xl:px-20 py-14 bg-[#f8fafc] min-h-screen font-['Rubik']">
    
    {/* Header */}
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
      <p className="text-gray-500 mt-2 text-base">Comprehensive brain scan analysis completed</p>
    </div>

    {/* الصف الأول: المريض (شمال) والتشخيص (يمين) */}
    <div className="grid lg:grid-cols-12 gap-8 mb-8 items-stretch">
      
      {/* كارت المريض (شمال) - 4 أعمدة */}
      <div className="lg:col-span-4 bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center h-full">
        <h2 className="text-base font-semibold text-gray-800 mb-6">Patient Information</h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex justify-between"><span>Name:</span><span className="font-medium text-gray-900">{resultData?.patient?.name}</span></div>
          <div className="flex justify-between"><span>Patient ID:</span><span className="font-medium text-gray-900">{resultData?.patient?.patientId}</span></div>
          <div className="flex justify-between"><span>Scan Date:</span><span className="font-medium text-gray-900">{resultData?.patient?.scanDate}</span></div>
          <div className="flex justify-between"><span>Scan Type:</span><span className="font-medium text-gray-900">{resultData?.patient?.scanType}</span></div>
        </div>
      </div>

      {/* كارت النتيجة/التشخيص (يمين) - 8 أعمدة */}
      <div className="lg:col-span-8 bg-white p-10 rounded-xl border border-gray-200 shadow-sm relative text-center flex flex-col justify-center h-full">
        <span className="absolute top-6 right-6 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Scan Complete</span>
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Tumor Detected</h2>
        <p className="text-sm text-gray-500 mb-6">Negative: AI Preliminary Classification</p>
        <div className="bg-green-100 text-green-700 px-5 py-3 rounded-lg text-sm">
          AI Confidence Score indicates high probability of healthy tissue. Clinical validation required.
        </div>
      </div>
    </div>

    {/* الصف الثاني: النسبة (شمال) والدكتور (يمين) */}
    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
      
      {/* كارت النسبة والـ Metrics (شمال) - 4 أعمدة */}
      <div className="lg:col-span-4 bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[450px]">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Detection Probability</h2>
        <div className="text-center mb-8">
          <p className="text-6xl font-bold text-green-600 leading-tight">{resultData?.detectionProbability}%</p>
          <p className="text-base text-gray-500 mt-2">Probability of tumor presence</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2 font-medium">
            <span>Confidence Level</span>
            <span className="text-green-600 bg-green-50 px-4 py-1.5 rounded-full text-sm">High</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{width: `${resultData?.detectionProbability}%`}} />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-5">
          <p className="font-semibold text-gray-900 mb-4 text-base">Analysis Metrics</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm"><span className="text-gray-600">Sensitivity:</span><span className="font-semibold text-gray-900">{resultData?.metrics?.sensitivity}%</span></div>
            <div className="flex items-center gap-2 text-sm"><span className="text-gray-600">Specificity:</span><span className="font-semibold text-gray-900">{resultData?.metrics?.specificity}%</span></div>
          </div>
        </div>
      </div>

      {/* كارت الدكتور (يمين) - 8 أعمدة */}
      <div className="lg:col-span-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full min-h-[450px]">
        <h2 className="text-base font-semibold text-gray-800 mb-6">Doctor's Clinical Validation</h2>
        <textarea
          value={clinicalNotes}
          onChange={(e) => setClinicalNotes(e.target.value)}
          className="w-full flex-grow border border-gray-200 rounded-lg p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none font-normal"
          placeholder="Enter clinical observations..."
        />
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2.5 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">Export as PDF</button>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md transition-all">Save & Finalize Report</button>
        </div>
      </div>
    </div>
  </div>
)}
       {/* TUMOR SECTION - RESTORED LAYOUT WITH REFINED FONTS */}
{status === "tumor" && (
  <div className="max-w-7xl mx-auto px-12 xl:px-20 py-14 bg-[#f8fafc] min-h-screen font-['Rubik']">
    
    {/* 1. Header Section */}
    <div className="mb-12">
      <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
      <p className="text-gray-500 mt-2 text-base font-normal">Comprehensive brain scan analysis completed</p>
    </div>

    {/* 2. Analysis Outcome Card - رجع لوحده فوق بعرض كامل */}
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 py-10 px-6 mb-8 text-center relative">
      <span className="absolute top-6 left-8 text-sm text-gray-400 font-normal">Analysis Outcome</span>
      <span className="absolute top-6 right-8 bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider">High Priority</span>
      
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-red-600 text-3xl">⚠️</span>
      </div>
      
      <h2 className="text-2xl font-semibold text-[#ef4444] mb-3">Tumor Detected</h2>
      
      <div className="text-base text-gray-600 mb-6 space-y-1 font-normal">
        <p>Tumor Type: <span className="text-gray-800 font-medium">{resultData?.tumor_type}</span></p>
        <p>Classification: 
          <span className={`font-semibold uppercase ml-1 ${
            resultData?.classification?.toLowerCase().includes('malignant') 
            ? 'text-red-600' 
            : 'text-[#f59e0b]' /* برتقالي للحميد */
          }`}>
            {resultData?.classification}
          </span>
        </p>
      </div>

      <div className="bg-[#fff1f1] text-[#d93025] px-6 py-3 rounded-lg text-sm border border-[#fbd5d5] inline-flex items-center gap-2 font-normal">
        <span className="bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">i</span>
        Immediate consultation with a neurologist is recommended. AI Preliminary Classification.
      </div>
    </div>

    {/* 3. Main Content Grid - المريض والدكتور جنب بعض تحت */}
    <div className="grid lg:grid-cols-3 gap-8">
      
      {/* العمود الأيسر: بيانات المريض والشريط */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[300px]">
          <h2 className="text-base font-semibold text-gray-800 mb-6">Patient Information</h2>
          <div className="space-y-4 text-sm text-gray-600 font-normal">
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span>Name:</span><span className="font-medium text-gray-900">{resultData?.patient_name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span>Patient ID:</span><span className="font-medium text-gray-900">{resultData?.patient_id}</span>
            </div>
            <div className="flex justify-between border-b border-gray-50 pb-2">
              <span>Scan Date:</span><span className="font-medium text-gray-900">{resultData?.scan_date}</span>
            </div>
            <div className="flex justify-between">
              <span>Scan Type:</span><span className="font-medium text-gray-900">{resultData?.scan_type}</span>
            </div>
          </div>
        </div>

        {/* كارت النسبة: يظهر فقط للخبيث */}
        {resultData?.classification?.toLowerCase().includes("malignant") && (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Detection Probability</h2>
            <p className="text-6xl font-bold text-red-600 mb-4">{resultData?.probability}%</p>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-4">
              <div className="bg-red-500 h-full" style={{ width: `${resultData?.probability}%` }} />
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500">
              <span>Confidence</span>
              <span className="text-red-600">{Number(resultData?.probability) >= 70 ? "High" : "Low"}</span>
            </div>
          </div>
        )}
      </div>

      {/* العمود الأيمن: كارت الدكتور */}
      <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-[450px]">
        <h2 className="text-base font-semibold text-gray-800 mb-6">Doctor's Clinical Validation</h2>
        <textarea 
          className="w-full flex-grow border border-gray-200 rounded-lg p-4 text-sm bg-[#fafafa] outline-none resize-none text-gray-600 font-normal focus:bg-white focus:ring-2 focus:ring-blue-500" 
          placeholder="Enter clinical observations..." 
          value={clinicalNotes} 
          onChange={(e) => setClinicalNotes(e.target.value)} 
        />
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2.5 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50">
            Export as PDF
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md">
            Save & Finalize Report
          </button>
        </div>
      </div>

    </div>
  </div>
)}
        {/* FAILED */}
        {status === "failed" && (
          <div className="flex justify-center mt-10">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl text-center">
              <img src="/images/result.svg" alt="Analysis Failed Icon" className="w-48 h-48 mx-auto mb-6" />
              <h2 className="text-4xl font-extrabold text-red-600 mb-4">Analysis Failed</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                We encountered an issue while processing your MRI scan. Please check your file format and try again.
              </p>
              <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-3 rounded-lg mb-10 w-full max-w-md flex items-center justify-center mx-auto">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                <span className="font-medium text-sm">Error Code: 502 – Server Timeout</span>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-8 w-full justify-center">
                <button className="px-8 py-3 rounded-xl text-white font-semibold transition bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-lg">
                  <i className="fas fa-redo-alt mr-2"></i> Retry Analysis
                </button>
                <Link to="/diagnosis" className="px-8 py-3 rounded-xl text-blue-600 font-semibold border-2 border-blue-600 hover:bg-blue-50 transition">
                  <i className="fas fa-arrow-left mr-2"></i> Go Back to Diagnosis
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                If the issue persists, contact our support team at 
                <a href="mailto:support@brainalyze.com" className="text-blue-600 hover:underline ml-1">support@brainalyze.com</a>
              </p>
            </div>
          </div>
        )}
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
}
