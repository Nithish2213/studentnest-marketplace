
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import { Heart, Filter, ChevronDown } from 'lucide-react';

// Mock favorites data
const favoritesData = [
  {
    id: 2,
    title: 'Calculus Textbook 5th Edition',
    description: 'No highlights or notes',
    price: 45,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    condition: 'Good',
    location: 'Library',
    timeAgo: '5 hours ago',
    rating: 4.7,
    isFavorite: true
  },
  {
    id: 9,
    title: 'Acoustic Guitar',
    description: 'Great for beginners',
    price: 150,
    image: 'https://images.unsplash.com/photo-1558098329-a11cff621064?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80',
    condition: 'Good',
    location: 'Music Building',
    timeAgo: '12 hours ago',
    rating: 4.5,
    isFavorite: true
  },
  {
    id: 12,
    title: 'Desk Organizer Set',
    description: 'Keep your study space tidy',
    price: 25,
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    condition: 'New',
    location: 'Student Center',
    timeAgo: '2 days ago',
    rating: 4.8,
    isFavorite: true
  },
  {
    id: 15,
    title: 'Wireless Earbuds',
    description: 'Great sound quality',
    price: 65,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1378&q=80',
    condition: 'Like New',
    location: 'Engineering Building',
    timeAgo: '3 days ago',
    rating: 4.6,
    isFavorite: true
  }
];

const sortOptions = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch favorites
    setTimeout(() => {
      setFavorites(favoritesData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    
    // Sort the favorites based on selection
    const sortedFavorites = [...favorites];
    
    switch (value) {
      case 'price-low':
        sortedFavorites.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedFavorites.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'recent':
      default:
        // Already sorted by most recent in our mock data
        break;
    }
    
    setFavorites(sortedFavorites);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <Layout showCategories={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-semibold text-marketplace-600 flex items-center">
            <Heart size={24} className="text-red-500 mr-3" /> My Favorites
          </h1>
          
          <div className="flex items-center mt-4 sm:mt-0">
            <div className="flex items-center">
              <label htmlFor="sort" className="hidden sm:inline text-sm text-marketplace-400 mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="py-2 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-marketplace-accent/20 focus:border-marketplace-accent transition duration-200"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={toggleFilters}
              className="ml-3 flex items-center text-sm font-medium text-marketplace-500 hover:text-marketplace-accent py-2 px-3 bg-gray-100 rounded-lg transition duration-200"
            >
              <Filter size={16} className="mr-1.5" />
              Filters
              <ChevronDown size={16} className={`ml-1.5 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-xl mb-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-marketplace-500 mb-1.5">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg"
                  />
                  <span className="text-marketplace-400 flex items-center">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-marketplace-500 mb-1.5">
                  Condition
                </label>
                <select className="w-full p-2 text-sm border border-gray-200 rounded-lg">
                  <option value="">Any Condition</option>
                  <option value="new">New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-marketplace-500 mb-1.5">
                  Category
                </label>
                <select className="w-full p-2 text-sm border border-gray-200 rounded-lg">
                  <option value="">All Categories</option>
                  <option value="books">Books</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="clothing">Clothing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="sm:col-span-2 md:col-span-1 flex items-end">
                <button className="w-full py-2 bg-marketplace-accent text-white text-sm font-medium rounded-lg shadow-sm hover:bg-opacity-90 transition duration-200">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <Heart size={48} className="mx-auto text-gray-300 mb-3" />
            <h2 className="text-xl font-semibold text-marketplace-600 mb-2">No favorites yet</h2>
            <p className="text-marketplace-400 mb-6">Save items you like by clicking the heart icon on products.</p>
            <a href="/" className="btn-primary">Browse Listings</a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
