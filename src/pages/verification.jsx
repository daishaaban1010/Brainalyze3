import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();

  // ==== تعريف الدوال المطلوبة للـ Footer ====
  const handlePrivacyPolicy = () => navigate("/privacy");
  const handleTermsOfService = () => navigate("/terms");
  const handleSupport = () => navigate("/support");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center px-6">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/images/logo brain toumer 1.svg"
              alt="Brainalyze Logo"
              className="w-10 h-10"
            />
            <h1 className="text-xl font-bold text-gray-900">
              Brainalyze
            </h1>
          </div>

        </div>
      </nav>
      {/* ================= END NAV ================= */}


      {/* ================= MAIN ================= */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">

        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full text-center">

          {/* Icon ثابت بدون دوران */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-6-8.485"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Verification in Progress
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for registering with Brainalyze.
            Your medical credentials are currently under review
            by our verification team.
          </p>

          {/* زر العودة للصفحة الرئيسية مع أيقونة بيت زرقاء */}
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl w-full flex items-center justify-center gap-2 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9.5l9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
            Back to Home
          </button>

          <div className="mt-8 text-sm text-gray-500">
            Need assistance? Contact our support team at
            <br />
            <span className="text-blue-600 font-medium">
              support@brainalyze.com
            </span>
          </div>

        </div>
      </div>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
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

export default Verification;
