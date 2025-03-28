
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        
        // Only redirect if we're on the signin, signup, or index page
        const authPages = ['/', '/signin', '/signup'];
        if (parsedUser.isAuthenticated && authPages.includes(location.pathname)) {
          if (parsedUser.type === 'admin') {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, [location.pathname, navigate]);

  // Sign in
  const signIn = (userData) => {
    // Determine user type based on email domain
    let userType = 'student';
    if (userData.email && userData.email.endsWith('@kgisl.ac.in')) {
      userType = 'admin';
    } else if (userData.email && userData.email.endsWith('@kgkite.ac.in')) {
      userType = 'student';
    }
    
    // Create user data with type
    const userWithType = {
      ...userData,
      isAuthenticated: true,
      type: userType
    };
    
    setCurrentUser(userWithType);
    localStorage.setItem('user', JSON.stringify(userWithType));
    
    // Show welcome toast
    toast({
      title: `Welcome, ${userData.name || 'User'}!`,
      description: `You've successfully signed in as ${userType}`,
      variant: "success",
    });
    
    // Redirect based on user type
    if (userType === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  // Sign out
  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
      variant: "default",
    });
    
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
