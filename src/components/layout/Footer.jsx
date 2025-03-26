
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-lg font-display font-semibold text-marketplace-600">StudentNest</h2>
            <p className="text-marketplace-400 text-sm">The premier marketplace for students to buy and sell items, services, and more within their university community.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-marketplace-400 hover:text-marketplace-accent transition duration-200" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-marketplace-400 hover:text-marketplace-accent transition duration-200" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-marketplace-400 hover:text-marketplace-accent transition duration-200" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-marketplace-400 hover:text-marketplace-accent transition duration-200" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-marketplace-600 mb-4">Marketplace</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Home</Link></li>
              <li><Link to="/sell" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Sell an Item</Link></li>
              <li><Link to="/favorites" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">My Favorites</Link></li>
              <li><Link to="/profile" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">My Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-marketplace-600 mb-4">Support</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Help Center</a></li>
              <li><a href="#" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Safety Center</a></li>
              <li><a href="#" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Community Guidelines</a></li>
              <li><a href="#" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Report an Issue</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-marketplace-600 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 text-marketplace-400 mt-0.5" />
                <span className="text-sm text-marketplace-400">support@studentnest.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 text-marketplace-400 mt-0.5" />
                <span className="text-sm text-marketplace-400">(123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-marketplace-400 mb-2 md:mb-0">© {new Date().getFullYear()} StudentNest. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Privacy Policy</a>
            <a href="#" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Terms of Service</a>
            <a href="#" className="text-sm text-marketplace-400 hover:text-marketplace-accent transition duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
