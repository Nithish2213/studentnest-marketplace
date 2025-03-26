
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { 
  Heart, 
  Share2, 
  MessageCircle, 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  UserCircle
} from 'lucide-react';

// Mock product data
const productData = {
  id: 1,
  title: 'MacBook Pro 2019 - 16" - i7 - 16GB - 512GB',
  description: 'This MacBook Pro is in excellent condition, barely used. Comes with charger and original box. Great for students who need a powerful laptop for design work, programming, or video editing. Battery health is at 92%, which is excellent for a laptop that\'s been used for a few years.',
  fullDescription: 'This MacBook Pro is in excellent condition, barely used. It features a stunning 16-inch Retina display, powerful Intel i7 processor, 16GB of RAM, and 512GB of fast SSD storage. Perfect for demanding applications like video editing, programming, and design work.\n\nSpecifications:\n- 16" Retina Display\n- Intel Core i7 processor\n- 16GB RAM\n- 512GB SSD\n- AMD Radeon Pro 5300M Graphics\n- Battery Health: 92%\n- macOS Monterey (latest version)\n\nIncluded in the sale:\n- Original box and packaging\n- 96W USB-C power adapter\n- USB-C charging cable\n- User manual\n\nMinimal signs of use, no scratches or dents. Keyboard and trackpad work perfectly. Battery lasts about 8-9 hours of regular use. I\'m selling it because I\'ve upgraded to the newer M1 Max model for my graduate studies.',
  price: 1100,
  images: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  ],
  condition: 'Like New',
  category: 'Electronics',
  location: 'West Campus',
  postedDate: '2023-06-15T14:30:00Z',
  timeAgo: '2 days ago',
  seller: {
    id: 123,
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/300?img=12',
    rating: 4.9,
    memberSince: 'January 2022',
    responseRate: '98%',
    responseTime: 'Under 1 hour',
    verified: true
  },
  viewCount: 142,
  isFavorite: false
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch product by ID from an API
    // For demo purposes, we'll use our mock data
    setProduct(productData);
    setIsFavorite(productData.isFavorite);
    setLoading(false);
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, this would make an API call to save the favorite status
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const selectImage = (index) => {
    setActiveImage(index);
  };

  if (loading) {
    return (
      <Layout showCategories={false}>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout showCategories={false}>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-marketplace-600 mb-3">Product Not Found</h2>
          <p className="text-marketplace-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary">Go Back to Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <Link to="/" className="flex items-center text-marketplace-400 hover:text-marketplace-accent text-sm transition duration-200">
            <ArrowLeft size={16} className="mr-2" /> Back to listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden aspect-square bg-gray-100">
              <img 
                src={product.images[activeImage]} 
                alt={product.title} 
                className="w-full h-full object-cover animate-fade-in"
              />
              
              {/* Image Navigation Controls */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/70 backdrop-blur-sm text-marketplace-600 hover:bg-white transition duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/70 backdrop-blur-sm text-marketplace-600 hover:bg-white transition duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`relative rounded-md overflow-hidden flex-shrink-0 w-16 h-16 border-2 transition duration-200 ${
                      activeImage === index ? 'border-marketplace-accent' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`${product.title} - view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-2xl md:text-3xl font-display font-semibold text-marketplace-600 animate-fade-in">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full transition duration-200 ${
                      isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
                    }`}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart size={22} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                  <button 
                    className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition duration-200"
                    aria-label="Share this listing"
                  >
                    <Share2 size={22} />
                  </button>
                </div>
              </div>
              <p className="text-3xl font-display font-semibold text-marketplace-accent mt-2">
                ${product.price.toFixed(2)}
              </p>
              
              {/* Product Meta Information */}
              <div className="flex flex-wrap items-center text-sm text-marketplace-400 mt-3 gap-3">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>Posted {product.timeAgo}</span>
                </div>
                <div className="flex items-center">
                  <Shield size={14} className="mr-1" />
                  <span>Condition: {product.condition}</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-marketplace-600 mb-2">Description</h2>
              <p className="text-marketplace-500 whitespace-pre-line">
                {product.fullDescription}
              </p>
            </div>
            
            {/* Seller Information */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <div className="flex items-center mb-3">
                <div className="flex-shrink-0">
                  {product.seller.avatar ? (
                    <img 
                      src={product.seller.avatar} 
                      alt={product.seller.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle size={48} className="text-gray-400" />
                  )}
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <h3 className="font-medium text-marketplace-600">
                      {product.seller.name}
                    </h3>
                    {product.seller.verified && (
                      <div className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-1 text-sm">
                    <div className="flex items-center text-yellow-400">
                      <Star size={14} fill="currentColor" className="mr-1" />
                      <span className="text-marketplace-500 mr-1">{product.seller.rating}</span>
                    </div>
                    <span className="text-marketplace-400">• Member since {product.seller.memberSince}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="btn-primary flex-1 flex justify-center items-center">
                  <MessageCircle size={18} className="mr-2" /> Chat with Seller
                </button>
                <button className="btn-secondary flex-1 flex justify-center items-center">
                  Buy Now
                </button>
              </div>
            </div>
            
            {/* Safety Tips */}
            <div className="rounded-xl p-4 border border-amber-200 bg-amber-50">
              <div className="flex items-start">
                <AlertTriangle size={20} className="flex-shrink-0 text-amber-500 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-medium text-marketplace-600 mb-1">Safety Tips</h3>
                  <ul className="text-sm text-marketplace-500 space-y-1.5">
                    <li>• Meet in a public, well-lit place</li>
                    <li>• Don't pay or deposit before seeing the item</li>
                    <li>• Check the item condition before purchase</li>
                    <li>• Report suspicious users or activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
