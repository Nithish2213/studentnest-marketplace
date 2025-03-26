
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Heart, UserCircle, ShoppingBag, Menu, X, LogOut } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getFavoritesCount } = useFavorites();
  const { currentUser, signOut, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search functionality here
    console.log('Searching for:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
    setIsProfileMenuOpen(false);
  };

  const favoritesCount = getFavoritesCount();

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-display font-bold text-marketplace-600 animate-fade-in">
              StudentNest
            </h1>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full py-2.5 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent transition duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-marketplace-400 hover:text-marketplace-accent transition duration-200"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {isAuthenticated() ? (
              <>
                <Link to="/favorites" className="text-marketplace-500 hover:text-marketplace-accent transition duration-200 relative" aria-label="Favorites">
                  <Heart size={22} />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
                <Link to="/notifications" className="text-marketplace-500 hover:text-marketplace-accent transition duration-200 relative" aria-label="Notifications">
                  <Bell size={22} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    5
                  </span>
                </Link>
                <Link to="/sell" className="px-4 py-2 bg-marketplace-accent text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:translate-y-[-1px] active:translate-y-[0px]">
                  <ShoppingBag size={18} className="inline mr-1.5" /> Sell
                </Link>
                <div className="relative">
                  <button 
                    onClick={toggleProfileMenu}
                    className="text-marketplace-500 hover:text-marketplace-accent transition duration-200"
                    aria-label="Profile"
                  >
                    <UserCircle size={24} />
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">{currentUser?.name || 'User'}</div>
                        <div className="text-xs text-gray-500 truncate">{currentUser?.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="inline mr-2" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-marketplace-500 hover:text-marketplace-accent font-medium">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-marketplace-accent text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:translate-y-[-1px] active:translate-y-[0px]">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-marketplace-500 hover:text-marketplace-accent transition duration-200"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="md:hidden py-2">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full py-2 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent transition duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-marketplace-400 hover:text-marketplace-accent transition duration-200"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm animate-fade-in">
          <div className="container px-4 py-4 space-y-4">
            {isAuthenticated() ? (
              <>
                <Link 
                  to="/favorites" 
                  className="flex items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart size={18} className="mr-3" /> 
                  Favorites
                  {favoritesCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/notifications" 
                  className="flex items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Bell size={18} className="mr-3" /> Notifications
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    5
                  </span>
                </Link>
                <Link 
                  to="/sell" 
                  className="flex items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag size={18} className="mr-3" /> Sell Item
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserCircle size={18} className="mr-3" /> Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
                >
                  <LogOut size={18} className="mr-3" /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="flex items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="flex items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
