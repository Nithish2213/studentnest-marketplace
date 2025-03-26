
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign in
  const signIn = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Sign out
  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    navigate('/signin');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!currentUser && currentUser.isAuthenticated;
  };

  // Check if user is admin
  const isAdmin = () => {
    return isAuthenticated() && currentUser.type === 'admin';
  };

  // Check if user is student
  const isStudent = () => {
    return isAuthenticated() && currentUser.type === 'student';
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signOut,
    isAuthenticated,
    isAdmin,
    isStudent
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route component
export const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      navigate('/signin');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated() ? children : null;
};
