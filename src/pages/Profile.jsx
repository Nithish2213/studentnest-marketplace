
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
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
  ChevronRight,
  Save,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const { currentUser, signOut } = useAuth();
  const { toast } = useToast();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedBio, setEditedBio] = useState('');
  const [activeListings, setActiveListings] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  
  // Load user data from current user in auth context
  useEffect(() => {
    if (!currentUser) return;
    
    // Get existing profile data or initialize new one
    const storedUserData = localStorage.getItem('userProfile_' + currentUser.email);
    let profileData;
    
    if (storedUserData) {
      profileData = JSON.parse(storedUserData);
    } else {
      // Use currentUser data
      profileData = {
        id: currentUser.id || Date.now().toString(),
        name: currentUser.name || '',
        email: currentUser.email || '',
        avatar: currentUser.avatar || null,
        university: currentUser.university || 'KG College',
        program: currentUser.program || 'Computer Science',
        year: currentUser.year || 'Junior',
        memberSince: currentUser.memberSince || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        bio: currentUser.bio || '',
        listingsCount: 0,
        soldCount: 0,
        boughtCount: 0,
        favoriteCount: 0,
        rating: 4.8,
        responseRate: '95%',
        responseTime: 'Under 1 hour',
        verified: true
      };
      
      // Save to localStorage for future use
      localStorage.setItem('userProfile_' + currentUser.email, JSON.stringify(profileData));
    }
    
    setUserData(profileData);
    setEditedBio(profileData.bio || '');
    
    // Load products
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Active listings are products created by this user
    const userListings = allProducts.filter(product => 
      product.seller && product.seller.id === profileData.id
    );
    
    setActiveListings(userListings);
    
    // For demo purposes, we'll use some of these as "sold" items
    setSoldItems(userListings.slice(0, Math.min(2, userListings.length)));
    
    // For demo purposes, use other products as "purchased" items
    setPurchasedItems(allProducts.filter(product => 
      !product.seller || product.seller.id !== profileData.id
    ).slice(0, 2));
    
    // Update counts
    profileData.listingsCount = userListings.length;
    profileData.soldCount = Math.min(2, userListings.length);
    profileData.boughtCount = Math.min(2, allProducts.length);
    
    // Save updated counts
    localStorage.setItem('userProfile_' + currentUser.email, JSON.stringify(profileData));
    
  }, [currentUser]);

  const handleLogout = () => {
    signOut();
  };
  
  const startEditMode = () => {
    setEditMode(true);
    setEditedBio(userData.bio || '');
  };
  
  const cancelEdit = () => {
    setEditMode(false);
  };
  
  const saveProfile = () => {
    // Update user data
    const updatedUserData = {
      ...userData,
      bio: editedBio
    };
    
    // Save to localStorage
    localStorage.setItem('userProfile_' + currentUser.email, JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    setEditMode(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
      variant: "success",
    });
  };

  if (!userData) {
    return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>;
  }

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                {userData.avatar ? (
                  <img 
                    src={userData.avatar} 
                    alt={userData.name} 
                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-gray-400">
                    <User size={40} />
                  </div>
                )}
                <h1 className="text-xl font-display font-semibold text-marketplace-600">
                  {userData.name || currentUser.email.split('@')[0]}
                </h1>
                <p className="text-marketplace-400 text-sm mt-1">{userData.email}</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-yellow-400">
                    <Star size={14} fill="currentColor" className="mr-1" />
                    <span className="text-marketplace-500">{userData.rating}</span>
                  </div>
                  {userData.verified && (
                    <div className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      Verified
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {editMode ? (
                  <div className="space-y-3">
                    <label htmlFor="bio" className="block text-sm font-medium text-marketplace-500">Biography</label>
                    <Textarea
                      id="bio"
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="w-full min-h-[100px] border-gray-300 rounded-md shadow-sm focus:border-marketplace-accent focus:ring focus:ring-marketplace-accent/20"
                    />
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={saveProfile}
                        className="flex-1 btn-primary text-sm py-2 flex items-center justify-center"
                      >
                        <Save size={16} className="mr-1.5" /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center"
                      >
                        <X size={16} className="mr-1.5" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-marketplace-500">{userData.bio || "No bio yet. Click Edit Profile to add one."}</p>
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-marketplace-400">Email:</span>
                        <span className="text-marketplace-600 font-medium">{userData.email}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-marketplace-400">University:</span>
                        <span className="text-marketplace-600 font-medium">{userData.university}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-marketplace-400">Program:</span>
                        <span className="text-marketplace-600 font-medium">{userData.program}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-marketplace-400">Year:</span>
                        <span className="text-marketplace-600 font-medium">{userData.year}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-marketplace-400">Member since:</span>
                        <span className="text-marketplace-600 font-medium">{userData.memberSince}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {!editMode && (
                <button onClick={startEditMode} className="btn-secondary w-full flex items-center justify-center">
                  <Edit size={16} className="mr-2" /> Edit Profile
                </button>
              )}
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
                  <span className="text-marketplace-600 font-medium">{activeListings.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Package size={16} className="text-marketplace-400 mr-2.5" />
                    <span className="text-marketplace-500">Items Sold</span>
                  </div>
                  <span className="text-marketplace-600 font-medium">{soldItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Package size={16} className="text-marketplace-400 mr-2.5" />
                    <span className="text-marketplace-500">Items Purchased</span>
                  </div>
                  <span className="text-marketplace-600 font-medium">{purchasedItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart size={16} className="text-marketplace-400 mr-2.5" />
                    <span className="text-marketplace-500">Favorites</span>
                  </div>
                  <span className="text-marketplace-600 font-medium">{userData.favoriteCount}</span>
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
                            <span>Posted on: {listing.postedDate || 'Recently'}</span>
                          </div>
                          <div className="flex flex-wrap justify-between items-center">
                            <div className="flex space-x-3 text-xs text-marketplace-500">
                              <span className="flex items-center">
                                <User size={14} className="mr-1" /> {listing.viewCount || 0} views
                              </span>
                              <span className="flex items-center">
                                <MessageCircle size={14} className="mr-1" /> {listing.messageCount || 0} messages
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
            
            {/* Sold Items Tab */}
            {activeTab === 'sold' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-marketplace-600 mb-6">Items You've Sold</h2>
                
                {soldItems.length > 0 ? (
                  <div className="space-y-4">
                    {soldItems.map(item => (
                      <div key={item.id} className="glass-card p-4 flex flex-col sm:flex-row">
                        <div className="sm:w-32 flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                              <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">SOLD</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between mb-2">
                            <span className="font-medium text-marketplace-600">{item.title}</span>
                            <span className="font-semibold text-marketplace-accent">${item.price}</span>
                          </div>
                          <div className="flex flex-wrap text-xs text-marketplace-400 mb-3 gap-2">
                            <span>Sold on: {new Date().toLocaleDateString()}</span>
                            <span>•</span>
                            <span>To: Anonymous Buyer</span>
                          </div>
                          <div className="flex justify-end">
                            <button className="text-sm py-1.5 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-200">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Package size={48} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-marketplace-600 mb-2">No sold items yet</h3>
                    <p className="text-marketplace-400">Items you sell will appear here.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Purchases Tab */}
            {activeTab === 'purchases' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-marketplace-600 mb-6">Items You've Purchased</h2>
                
                {purchasedItems.length > 0 ? (
                  <div className="space-y-4">
                    {purchasedItems.map(item => (
                      <div key={item.id} className="glass-card p-4 flex flex-col sm:flex-row">
                        <div className="sm:w-32 flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between mb-2">
                            <span className="font-medium text-marketplace-600">{item.title}</span>
                            <span className="font-semibold text-marketplace-accent">${item.price}</span>
                          </div>
                          <div className="flex flex-wrap text-xs text-marketplace-400 mb-3 gap-2">
                            <span>Purchased on: {new Date().toLocaleDateString()}</span>
                            <span>•</span>
                            <span>From: {item.seller?.name || 'Unknown Seller'}</span>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button className="text-sm py-1.5 px-3 bg-gray-100 text-marketplace-500 rounded-lg hover:bg-gray-200 transition duration-200">
                              Contact Seller
                            </button>
                            <button className="text-sm py-1.5 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-200">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Package size={48} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-marketplace-600 mb-2">No purchases yet</h3>
                    <p className="text-marketplace-400">Items you buy will appear here.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Favorites Tab */}
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
