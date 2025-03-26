
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <div className="relative mx-auto w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <span className="text-7xl font-display font-bold text-marketplace-accent">404</span>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-red-100 rounded-full opacity-70"></div>
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-100 rounded-full opacity-70"></div>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold text-marketplace-600 mb-3">Page Not Found</h1>
        <p className="text-marketplace-400 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center animate-fade-in"
        >
          <ArrowLeft size={18} className="mr-2" /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
