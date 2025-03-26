
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { 
  User, 
  Settings, 
  Package, 
  Heart, 
  MessageCircle, 
  LogOut, 
  Star, 
  Edit, 
  ShoppingBag,
  ChevronRight
} from 'lucide-react';

// Mock user data
const userData = {
  id: 123,
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatar: 'https://i.pravatar.cc/300?img=12',
  university: 'State University',
  program: 'Computer Science',
  year: 'Junior',
  memberSince: 'January 2022',
  listingsCount: 8,
  soldCount: 5,
  boughtCount: 12,
  favoriteCount: 24,
  rating: 4.9,
  responseRate: '98%',
  responseTime: 'Under 1 hour',
  verified: true,
  bio: 'Computer Science student interested in tech gadgets, books, and outdoor gear. Always looking for good deals on campus!'
};

// Mock active listings
const activeListings = [
  {
    id: 1,
    title: 'MacBook Pro 2019',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
    condition: 'Like New',
    postedDate: '2023-06-15',
    viewCount: 142,
    messageCount: 8
  },
  {
    id: 2,
    title: 'Physics Textbook',
    price: 45,
    image: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80',
    condition: 'Good',
    postedDate: '2023-06-10',
    viewCount: 57,
    messageCount: 3
  },
  {
    id: 3,
    title: 'Desk Lamp',
    price: 28,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    condition: 'Like New',
    postedDate: '2023-06-05',
    viewCount: 89,
    messageCount: 5
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const user = userData; // In a real app, this would come from a user context or API

  const handleLogout = () => {
    // In a real app, this would handle the logout process
    console.log('Logout clicked');
  };

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-gray-400">
                    <User size={40} />
                  </div>
                )}
                <h1 className="text-xl font-display font-semibold text-marketplace-600">
                  {user.name}
                </h1>
                <p className="text-marketplace-400 text-sm mt-1">{user.university}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-yellow-400">
                    <Star size={14} fill="currentColor" className="mr-1" />
                    <span className="text-marketplace-500">{user.rating}</span>
                  </div>
                  {user.verified && (
                    <div className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      Verified
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <p className="text-sm text-marketplace-500">{user.bio}</p>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-marketplace-400">Program:</span>
                    <span className="text-marketplace-600 font-medium">{user.program}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-marketplace-400">Year:</span>
                    <span className="text-marketplace-600 font-medium">{user.year}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-marketplace-400">Member since:</span>
                    <span className="text-marketplace-600 font-medium">{user.memberSince}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-marketplace-400">Response rate:</span>
                    <span className="text-marketplace-600 font-medium">{user.responseRate}</span>
                  </div>
                </div>
              </div>
              
              <button className="btn-secondary w-full flex items-center justify-center">
                <Edit size={16} className="mr-2" /> Edit Profile
              </button>
            </div>
            
            {/* User Stats */}
            <div className="glass-card p-6 mb-6">
              <h2 className="text-lg font-semibold text-marketplace-600 mb-4">Activity</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <ShoppingBag size={16} className="text-marketplace-400 mr-2.5" />
                    <span className="text-marketplace-500">Active Listings</span>
                  </div>
                  <span className="text-marketplace-600 font-medium">{user.listingsCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Package size={16} className="text-marketplace-400 mr-2.5" />
                    <span className="text-marketplace-500">Items Sold</span>
                  </div>
                  <span className="text-marketplace-600 font-medium">{user.soldCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Package size={16} className="text-marketplace-400 mr-2.5" />
                    <span className="text-marketplace-500">Items Purchased</span>
                  </div>
                  <span className="text-marketplace-600 font-medium">{user.boughtCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart size={16} className="text-marketplace-400 mr-2.5" />
                    <span className="text-marketplace-500">Favorites</span>
                  </div>
                  <span className="text-marketplace-600 font-medium">{user.favoriteCount}</span>
                </div>
              </div>
            </div>
            
            {/* Account Menu */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold text-marketplace-600 mb-4">Account</h2>
              <div className="space-y-2">
                <Link to="/settings" className="flex justify-between items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent transition duration-200">
                  <div className="flex items-center">
                    <Settings size={16} className="mr-2.5" />
                    <span>Settings</span>
                  </div>
                  <ChevronRight size={16} />
                </Link>
                <Link to="/messages" className="flex justify-between items-center py-2.5 text-marketplace-500 hover:text-marketplace-accent transition duration-200">
                  <div className="flex items-center">
                    <MessageCircle size={16} className="mr-2.5" />
                    <span>Messages</span>
                  </div>
                  <ChevronRight size={16} />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left py-2.5 text-red-500 hover:text-red-600 transition duration-200"
                >
                  <LogOut size={16} className="mr-2.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('listings')}
                className={`px-6 py-3 text-sm font-medium transition duration-200 ${
                  activeTab === 'listings'
                    ? 'border-b-2 border-marketplace-accent text-marketplace-accent'
                    : 'text-marketplace-400 hover:text-marketplace-500'
                }`}
              >
                Active Listings
              </button>
              <button
                onClick={() => setActiveTab('sold')}
                className={`px-6 py-3 text-sm font-medium transition duration-200 ${
                  activeTab === 'sold'
                    ? 'border-b-2 border-marketplace-accent text-marketplace-accent'
                    : 'text-marketplace-400 hover:text-marketplace-500'
                }`}
              >
                Sold Items
              </button>
              <button
                onClick={() => setActiveTab('purchases')}
                className={`px-6 py-3 text-sm font-medium transition duration-200 ${
                  activeTab === 'purchases'
                    ? 'border-b-2 border-marketplace-accent text-marketplace-accent'
                    : 'text-marketplace-400 hover:text-marketplace-500'
                }`}
              >
                Purchases
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-6 py-3 text-sm font-medium transition duration-200 ${
                  activeTab === 'favorites'
                    ? 'border-b-2 border-marketplace-accent text-marketplace-accent'
                    : 'text-marketplace-400 hover:text-marketplace-500'
                }`}
              >
                Favorites
              </button>
            </div>
            
            {/* Active Listings Tab */}
            {activeTab === 'listings' && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-display font-semibold text-marketplace-600">Active Listings</h2>
                  <Link 
                    to="/sell" 
                    className="btn-primary text-sm py-2 px-3 flex items-center"
                  >
                    <ShoppingBag size={16} className="mr-1.5" /> New Listing
                  </Link>
                </div>
                
                {activeListings.length > 0 ? (
                  <div className="space-y-4">
                    {activeListings.map(listing => (
                      <div key={listing.id} className="glass-card p-4 flex flex-col sm:flex-row">
                        <div className="sm:w-32 flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                          <Link to={`/product/${listing.id}`}>
                            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                              <img 
                                src={listing.image} 
                                alt={listing.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between mb-2">
                            <Link to={`/product/${listing.id}`} className="font-medium text-marketplace-600 hover:text-marketplace-accent">
                              {listing.title}
                            </Link>
                            <span className="font-semibold text-marketplace-accent">${listing.price}</span>
                          </div>
                          <div className="flex flex-wrap text-xs text-marketplace-400 mb-3 gap-2">
                            <span>Condition: {listing.condition}</span>
                            <span>•</span>
                            <span>Posted on: {listing.postedDate}</span>
                          </div>
                          <div className="flex flex-wrap justify-between items-center">
                            <div className="flex space-x-3 text-xs text-marketplace-500">
                              <span className="flex items-center">
                                <User size={14} className="mr-1" /> {listing.viewCount} views
                              </span>
                              <span className="flex items-center">
                                <MessageCircle size={14} className="mr-1" /> {listing.messageCount} messages
                              </span>
                            </div>
                            <div className="flex space-x-2 mt-2 sm:mt-0">
                              <Link to={`/edit/${listing.id}`} className="text-sm py-1.5 px-3 bg-gray-100 text-marketplace-500 rounded-lg hover:bg-gray-200 transition duration-200">
                                Edit
                              </Link>
                              <button className="text-sm py-1.5 px-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition duration-200">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-marketplace-600 mb-2">No active listings</h3>
                    <p className="text-marketplace-400 mb-6">You don't have any items for sale at the moment.</p>
                    <Link to="/sell" className="btn-primary">Create a Listing</Link>
                  </div>
                )}
              </div>
            )}
            
            {/* Placeholder for other tabs */}
            {activeTab === 'sold' && (
              <div className="text-center py-12 bg-gray-50 rounded-xl animate-fade-in">
                <Package size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-marketplace-600 mb-2">No sold items yet</h3>
                <p className="text-marketplace-400">Items you sell will appear here.</p>
              </div>
            )}
            
            {activeTab === 'purchases' && (
              <div className="text-center py-12 bg-gray-50 rounded-xl animate-fade-in">
                <Package size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-marketplace-600 mb-2">No purchases yet</h3>
                <p className="text-marketplace-400">Items you buy will appear here.</p>
              </div>
            )}
            
            {activeTab === 'favorites' && (
              <div className="text-center py-12 bg-gray-50 rounded-xl animate-fade-in">
                <Heart size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-marketplace-600 mb-2">No favorites yet</h3>
                <p className="text-marketplace-400 mb-6">Items you like will appear here for easy access.</p>
                <Link to="/" className="btn-primary">Browse Listings</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
