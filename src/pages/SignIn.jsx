import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student'); // 'student' or 'admin'
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    // Simple email validation
    if (!email.includes('@')) return false;
    
    // Check domain based on user type
    if (userType === 'admin' && !email.endsWith('@kgisl.ac.in')) {
      setError('Admin accounts must use @kgisl.ac.in email');
      return false;
    }
    
    if (userType === 'student' && !email.endsWith('@kgkite.ac.in')) {
      setError('Student accounts must use @kgkite.ac.in email');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Extract name from email (before @)
    const name = email.split('@')[0];
    
    // Create user data
    const userData = {
      id: Date.now().toString(),
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      email,
      type: userType,
      isAuthenticated: true
    };
    
    // Use the signIn function from AuthContext
    signIn(userData);
    
    // Show success toast
    toast({
      title: "Sign in successful!",
      description: "Welcome to StudentNest!",
      variant: "success",
    });
    
    // Redirect to home
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-marketplace-600">
            StudentNest
          </h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-marketplace-accent hover:text-marketplace-accent/90">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`flex-1 py-2 px-4 rounded-md ${
                  userType === 'student'
                    ? 'bg-marketplace-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 py-2 px-4 rounded-md ${
                  userType === 'admin'
                    ? 'bg-marketplace-accent text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Admin
              </button>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              {userType === 'student' 
                ? 'Use your @kgkite.ac.in email to sign in' 
                : 'Use your @kgisl.ac.in email to sign in'}
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2.5 pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-marketplace-accent focus:ring focus:ring-marketplace-accent/20 focus:ring-opacity-50"
                  placeholder={userType === 'student' ? 'student@kgkite.ac.in' : 'admin@kgisl.ac.in'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-2.5 pl-10 pr-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-marketplace-accent focus:ring focus:ring-marketplace-accent/20 focus:ring-opacity-50"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-marketplace-accent focus:ring-marketplace-accent border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-marketplace-accent hover:text-marketplace-accent/90">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marketplace-accent hover:bg-marketplace-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marketplace-accent"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
