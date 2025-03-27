import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student'); // 'student' or 'admin'
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

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
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Create a unique ID for this user
    const userId = Date.now().toString();
    
    // Create user data with profile information
    const userData = {
      id: userId,
      name,
      email,
      type: userType,
      isAuthenticated: true,
      university: userType === 'student' ? 'KG College' : 'KG Institute of Technology',
      program: 'Computer Science',
      year: 'Junior',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      bio: '',
    };
    
    // Store user information in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Initialize an empty profile for this user
    const profileData = {
      id: userId,
      name,
      email,
      avatar: null,
      university: userData.university,
      program: userData.program,
      year: userData.year,
      memberSince: userData.memberSince,
      bio: '',
      listingsCount: 0,
      soldCount: 0,
      boughtCount: 0,
      favoriteCount: 0,
      rating: 4.8,
      responseRate: '95%',
      responseTime: 'Under 1 hour',
      verified: true
    };
    
    // Save profile to localStorage
    localStorage.setItem('userProfile_' + email, JSON.stringify(profileData));
    
    // Show success message
    toast({
      title: "Account created!",
      description: "Your account has been created successfully",
      variant: "success",
    });
    
    // Redirect based on user type
    if (userType === 'admin') {
      navigate('/admin');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-marketplace-600">
            StudentNest
          </h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-marketplace-accent hover:text-marketplace-accent/90">
              Sign in
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
                ? 'Use your @kgkite.ac.in email to register' 
                : 'Use your @kgisl.ac.in email to register'}
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="py-2.5 pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-marketplace-accent focus:ring focus:ring-marketplace-accent/20 focus:ring-opacity-50"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
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
                  autoComplete="new-password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="py-2.5 pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-marketplace-accent focus:ring focus:ring-marketplace-accent/20 focus:ring-opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-marketplace-accent hover:bg-marketplace-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marketplace-accent"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
