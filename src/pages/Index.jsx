
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  
  useEffect(() => {
    // Check if user is authenticated
    if (isAuthenticated()) {
      // Redirect based on user type
      if (isAdmin()) {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } else {
      // Redirect to signin page if not authenticated
      navigate('/signin');
    }
  }, [navigate, isAuthenticated, isAdmin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to StudentNest</h1>
        <p className="text-xl text-gray-600">Redirecting you...</p>
      </div>
    </div>
  );
};

export default Index;
