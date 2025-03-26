
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { ArrowLeft, Star, MapPin, Calendar, MessageCircle } from 'lucide-react';
import ProductSection from '../components/products/ProductSection';

const SellerProfile = () => {
  const { sellerId } = useParams();
  const [seller, setSeller] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch seller data from API
    const mockSeller = {
      id: 123,
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/300?img=12',
      rating: 4.9,
      memberSince: 'January 2022',
      responseRate: '98%',
      responseTime: 'Under 1 hour',
      location: 'West Campus',
      verified: true,
      bio: 'Computer Science student passionate about technology. I sell items I no longer need in good condition. Fast response and fair prices guaranteed!',
      reviews: [
        { id: 1, reviewer: 'Michael', rating: 5, comment: 'Great seller, item was exactly as described!', date: '2 weeks ago' },
        { id: 2, reviewer: 'Sarah', rating: 5, comment: 'Very quick responses and easy transaction.', date: '1 month ago' },
        { id: 3, reviewer: 'David', rating: 4, comment: 'Good condition item, slightly delayed shipping.', date: '2 months ago' },
      ]
    };
    
    // Mock seller products
    const mockProducts = [
      {
        id: 1,
        title: 'MacBook Pro 2019',
        description: 'Great condition, barely used',
        price: 1100,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
        condition: 'Like New',
        location: 'West Campus',
        timeAgo: '2 days ago',
        rating: 4.9
      },
      {
        id: 4,
        title: 'Sony WH-1000XM4 Headphones',
        description: 'Noise cancelling, great for studying',
        price: 220,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80',
        condition: 'Like New',
        location: 'Engineering Building',
        timeAgo: '3 days ago',
        rating: 5.0
      },
      {
        id: 8,
        title: 'Study Desk Lamp',
        description: 'Adjustable brightness, USB port',
        price: 28,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        condition: 'Like New',
        location: 'South Apartments',
        timeAgo: '6 hours ago',
        rating: 4.8
      }
    ];
    
    setTimeout(() => {
      setSeller(mockSeller);
      setSellerProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, [sellerId]);

  if (loading) {
    return (
      <Layout showCategories={false}>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-40 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!seller) {
    return (
      <Layout showCategories={false}>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-marketplace-600 mb-3">Seller Not Found</h2>
          <p className="text-marketplace-400 mb-6">The seller you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">Go Back to Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-marketplace-400 hover:text-marketplace-accent text-sm transition duration-200">
            <ArrowLeft size={16} className="mr-2" /> Back to listings
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={seller.avatar} 
                  alt={seller.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap items-center mb-2">
                  <h1 className="text-2xl font-semibold text-marketplace-600 mr-3">
                    {seller.name}
                  </h1>
                  {seller.verified && (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-yellow-400 mb-4">
                  <Star size={16} fill="currentColor" className="mr-1" />
                  <span className="text-marketplace-500 font-medium">{seller.rating}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-marketplace-400 text-sm">{seller.reviews.length} reviews</span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-marketplace-400">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{seller.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>Member since {seller.memberSince}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Link 
                  to={`/chat/${sellerId}/product/1`} 
                  className="btn-primary inline-flex items-center"
                >
                  <MessageCircle size={18} className="mr-2" /> Message
                </Link>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-marketplace-600 mb-3">About</h2>
              <p className="text-marketplace-500">{seller.bio}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-marketplace-600 mb-4">
            Current Listings ({sellerProducts.length})
          </h2>
          <ProductSection 
            products={sellerProducts}
            emptyMessage="This seller doesn't have any active listings"
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-marketplace-600 mb-4">
              Reviews ({seller.reviews.length})
            </h2>
            
            {seller.reviews.length > 0 ? (
              <div className="space-y-4">
                {seller.reviews.map(review => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-marketplace-500">{review.reviewer}</div>
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-400 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < review.rating ? "currentColor" : "none"} 
                              className="mr-0.5" 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-marketplace-400">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-marketplace-500">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-marketplace-400">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerProfile;
