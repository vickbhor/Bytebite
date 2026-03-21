import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-32 px-4 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-black text-gray-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">Oops! The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-[#ff6b00] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}