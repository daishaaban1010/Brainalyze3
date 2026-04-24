import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // صفحة الوجهة بعد تسجيل الدخول (إذا جا من زرار Get Started)
  const redirectTo = location.state?.redirectTo || '/diagnosis';

  // لو المستخدم مسجل دخول مسبقًا
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, redirectTo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // محاكاة API

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);

      navigate(redirectTo, { replace: true });

    } catch (error) {
      setErrors({ submit: 'Login failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    
    }
    

  };

  const handleGoogleLogin = () => console.log('Google login clicked');
  const handleLinkedInLogin = () => console.log('LinkedIn login clicked');
  const handleForgotPassword = () => navigate('/forgot-password');
  const handlePrivacyPolicy = () => navigate('/privacy');
  const handleTermsOfService = () => navigate('/terms');
  const handleSupport = () => navigate('/support');

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="flex items-center space-x-2">
          <img src="/images/logo brain toumer 1.svg" alt="Brainalyze Logo" className="w-8 h-8" />
          <span className="font-bold text-xl text-gray-700">Brainalyze</span>
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
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/login.svg" 
                  alt="AI-Powered Brain Tumor Analysis" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-2 text-center">
                <h2 className="text-gray-900 text-3xl font-poppins font-bold">
                  AI-Powered Brain Tumor Analysis
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Advanced artificial intelligence technology for accurate brain tumor detection and analysis, 
                  helping medical professionals make informed decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 p-12 space-y-8">
            <div className="text-center space-y-1">
              <h1 className="text-gray-900 text-3xl font-poppins font-bold">Welcome Back</h1>
              <p className="text-gray-600 text-base">Log in to your Brainalyze account</p>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm text-center">{errors.submit}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="space-y-2">
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-left input-brainalyze px-3 transition ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-left input-brainalyze px-3 transition ${
                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    name="rememberMe"
                    type="checkbox" 
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-600">Remember me</label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-medium text-blue-600 hover:text-blue-500 transition"
                >
                  Forgot password?
                </button>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full p-3 text-white bg-blue-gradient hover:opacity-90 rounded-lg font-medium transition duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : 'Log In'}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">Or log in with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-4">
              <button onClick={handleGoogleLogin} className="w-full p-3 flex items-center justify-center space-x-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150 transform hover:scale-105">
                <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp" className="w-5 h-5 mr-2" alt="Google logo" />
                <span className="font-medium">Continue with Google</span>
              </button>
              <button onClick={handleLinkedInLogin} className="w-full p-3 flex items-center justify-center space-x-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150 transform hover:scale-105">
                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zM8 19h-3v-11h3v11zM6.5 6.75c-.96 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zM20 19h-3v-5.61c0-3.36-4-3.1-4 0v5.61h-3v-11h3v1.76c1.39-2.52 7-2.31 7 3.52v5.72z"/>
                </svg>
                <span className="font-medium">Continue with LinkedIn</span>
              </button>
            </div>

            <div className="text-center pt-4">
              <span className="text-gray-600 text-sm">Don't have an account?</span>
              <Link to="/signup" className="text-blue-600 font-medium text-sm hover:underline ml-1">Sign up here</Link>
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
        .input-brainalyze { padding-top: 0.6rem; padding-bottom: 0.6rem; border-width: 1px; }
      `}</style>
    </div>
  );
};

export default Login;
