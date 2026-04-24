import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ==== Main Pages ====
import Home from "./pages/home";
import About from "./pages/about";
import Diagnosis from "./pages/diagnosis";
import Results from "./pages/results";
import Contact from "./pages/contactus";

// ==== Auth Pages ====
import Login from "./pages/login";
import Signup from "./pages/signup";
import Verification from "./pages/verification";
import ResetPassword from "./pages/ResetPassword"; // متأكدين إنها معمولة Import صح

// ==== Processing ====
import ProcessingScan from "./pages/processingscan";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ==== Home ==== */}
          <Route path="/" element={<Home />} />

          {/* ==== Main App Pages ==== */}
          <Route path="/about" element={<About />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} />

          {/* ==== Auth ==== */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* ==== Verification ==== */}
          <Route path="/verification" element={<Verification />} />

          {/* ==== Processing ==== */}
          <Route path="/processing" element={<ProcessingScan />} />

          {/* ==== Static Simple Pages ==== */}
          <Route path="/privacy" element={<StaticPage title="Privacy Policy" text="Privacy Policy Page - Coming Soon" />} />
          <Route path="/terms" element={<StaticPage title="Terms of Service" text="Terms of Service Page - Coming Soon" />} />
          <Route path="/support" element={<StaticPage title="Support" text="Support Page - Coming Soon" />} />

          {/* ==== تم التعديل هنا لفتح الصفحة الحقيقية ==== */}
          <Route path="/forgot-password" element={<ResetPassword />} />

          {/* ==== 404 ==== */}
          <Route path="*" element={
              <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                  <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Go Back Home</a>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// المكون البسيط للصفحات الثابتة بيفضل زي ما هو
function StaticPage({ title, text }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
}