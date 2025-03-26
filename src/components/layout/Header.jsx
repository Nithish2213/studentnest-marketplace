
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Heart, UserCircle, ShoppingBag, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
            <Link to="/favorites" className="text-marketplace-500 hover:text-marketplace-accent transition duration-200" aria-label="Favorites">
              <Heart size={22} />
            </Link>
            <button className="text-marketplace-500 hover:text-marketplace-accent transition duration-200" aria-label="Notifications">
              <Bell size={22} />
            </button>
            <Link to="/sell" className="px-4 py-2 bg-marketplace-accent text-white font-medium rounded-lg shadow-sm transition-all duration-200 hover:bg-opacity-90 hover:translate-y-[-1px] active:translate-y-[0px]">
              <ShoppingBag size={18} className="inline mr-1.5" /> Sell
            </Link>
            <Link to="/profile" className="text-marketplace-500 hover:text-marketplace-accent transition duration-200" aria-label="Profile">
              <UserCircle size={24} />
            </Link>
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
            <Link 
              to="/favorites" 
              className="flex items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart size={18} className="mr-3" /> Favorites
            </Link>
            <Link 
              to="/" 
              className="flex items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Bell size={18} className="mr-3" /> Notifications
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
