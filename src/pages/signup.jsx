import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [licenseFile, setLicenseFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ======================= HANDLE INPUT CHANGE =======================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // ======================= HANDLE FILE UPLOAD =======================
  const handleLicenseUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLicenseFile(file);

    if (errors.license) {
      setErrors(prev => ({ ...prev, license: "" }));
    }
  };

  // ======================= FORM VALIDATION =======================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!licenseFile) newErrors.license = "Medical License / ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ======================= HANDLE FORM SUBMIT =======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // حفظ البيانات في localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.fullName);
      localStorage.setItem("verificationStatus", "pending");

      // الانتقال للصفحة التالية
      navigate('/verification');

    } catch (error) {
      setErrors({ submit: 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // ======================= EXTERNAL HANDLERS =======================
  const handleGoogleSignUp = () => {};
  const handleLinkedInSignUp = () => {};
  const handlePrivacyPolicy = () => navigate('/privacy');
  const handleTermsOfService = () => navigate('/terms');
  const handleSupport = () => navigate('/support');

  // ======================= RENDER =======================
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">

      {/* HEADER */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/images/logo brain toumer 1.svg" alt="Brainalyze Logo" className="w-8 h-8" />
          <span className="font-bold text-xl text-gray-700">Brainalyze</span>
        </div>
        <Link 
          to="/login" 
          className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition"
        >
          Login
        </Link>
      </header>

      {/* MAIN */}
      <main className="flex flex-1 justify-center items-center px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">

          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 rounded-xl overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden">
              <img
                src="/images/signup.svg"
                alt="Brain Analysis"
                className="w-full h-64 md:h-full object-cover object-top block"
              />
            </div>
            <div className="p-6 bg-blue-50 -mt-12">
              <h2 className="font-semibold text-lg text-gray-900">AI-Powered Brain Analysis</h2>
              <p className="text-gray-600 text-sm mt-1">Advanced technology for accurate brain tumor detection and analysis</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 text-center">Create Account</h1>
            <p className="text-gray-600 mb-8 text-center">Register as a Healthcare Provider</p>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm text-center">{errors.submit}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="Enter your full name" 
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 ${
                    errors.fullName ? 'border-red-500 bg-red-50 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
                  }`} 
                />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 bg-red-50 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
                  }`} 
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Create a password" 
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 bg-red-50 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
                  }`} 
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm your password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
                  }`} 
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
              </div>

              {/* Medical License / ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical License / ID</label>
                <label className={`w-full flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-lg cursor-pointer transition ${
                  errors.license ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50 hover:bg-blue-50 hover:border-blue-400"
                }`}>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{licenseFile ? licenseFile.name : "Upload Medical License / ID"}</p>
                  <p className="text-xs text-gray-500 mt-1">Required for verification • PDF, JPG or PNG (Max 10MB)</p>
                  <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleLicenseUpload} />
                </label>
                {errors.license && <p className="text-red-500 text-xs mt-1">{errors.license}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : 'Sign Up'}
              </button>
            </form>

            <div className="mt-4 text-center text-gray-500 text-sm">or continue with</div>

            {/* GOOGLE + LINKEDIN */}
            <div className="flex flex-col items-center mt-3 space-y-3">
              <button onClick={handleGoogleSignUp} className="flex items-center justify-center w-64 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp" className="w-5 h-5 mr-2" alt="Google logo" />
                Continue with Google
              </button>
              <button onClick={handleLinkedInSignUp} className="flex items-center justify-center w-64 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-5 h-5 mr-2" alt="LinkedIn logo" />
                Continue with LinkedIn
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in</Link>
            </p>
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
    </div>
  );
};

export default SignUp;
