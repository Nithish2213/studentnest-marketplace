
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import { PackageOpen } from 'lucide-react';

const TrendingItems = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get all products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const initialProducts = [
      // ... This would normally fetch from an API
      // For now, we'll simulate by filtering the products we get from localStorage
    ];
    
    // Combine stored products with initial products, avoiding duplicates by ID
    const combinedProducts = [...storedProducts];
    
    // Sort by rating (trending items are usually highly rated)
    const sortedProducts = combinedProducts.sort((a, b) => {
      return (b.rating || 0) - (a.rating || 0);
    });
    
    setTrendingProducts(sortedProducts);
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-marketplace-600 mb-6">
          Trending Items
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-marketplace-accent"></div>
          </div>
        ) : trendingProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <PackageOpen size={40} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500">No trending items available</h3>
            <p className="text-gray-400 mt-1">
              Check back later for trending items
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrendingItems;
