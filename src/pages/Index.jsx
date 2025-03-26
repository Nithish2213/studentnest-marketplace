
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to signin page
    navigate('/signin');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Marketplace</h1>
        <p className="text-xl text-gray-600">Redirecting you to login...</p>
      </div>
    </div>
  );
};

export default Index;
