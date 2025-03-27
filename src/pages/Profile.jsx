
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { UserCircle, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { currentUser, signOut } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio || '');

  const handleSaveBio = () => {
    // Update user in local storage with new bio
    const updatedUser = { ...currentUser, bio };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Show success toast
    toast({
      title: "Profile updated",
      description: "Your bio has been saved successfully",
      variant: "success",
    });
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setBio(currentUser?.bio || '');
    setIsEditing(false);
  };

  // Get user's listings from localStorage
  const getUserListings = () => {
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    return allProducts.filter(product => product.seller?.id === currentUser?.id);
  };

  const userListings = getUserListings();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
              >
                Sign Out
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
                  {currentUser?.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle size={80} className="text-gray-400" />
                  )}
                </div>
              </div>
              
              <div className="flex-grow space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
                  <p className="text-gray-600">{currentUser?.email}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">About Me</h3>
                    {!isEditing ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsEditing(true)}
                        className="text-marketplace-accent hover:text-marketplace-accent/80"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleCancelEdit}
                        >
                          <X size={16} className="mr-1" />
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleSaveBio}
                        >
                          <Save size={16} className="mr-1" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent"
                      rows={4}
                      placeholder="Tell others about yourself..."
                    />
                  ) : (
                    <p className="text-gray-600">
                      {currentUser?.bio || "No bio yet. Click 'Edit Profile' to add one."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* My Listings Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">My Listings</h2>
          
          {userListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 h-48">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-marketplace-accent font-semibold mt-1">${product.price}</p>
                    <p className="text-sm text-gray-500 mt-1">{product.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">You haven't listed any items yet.</p>
              <Button 
                variant="default" 
                className="mt-4"
                onClick={() => window.location.href = '/sell'}
              >
                Sell an Item
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
