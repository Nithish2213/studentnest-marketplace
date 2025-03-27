
import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/products/ProductCard';
import { PackageOpen } from 'lucide-react';

const RecentItems = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get all products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Sort products by timeAgo (most recent first)
    // This is a simplified sorting - in a real app you'd use timestamps
    const sortedProducts = [...storedProducts].sort((a, b) => {
      // Simple string comparison for now (not perfect but works for demo)
      const aTime = parseInt(a.timeAgo?.split(' ')[0]) || 0;
      const bTime = parseInt(b.timeAgo?.split(' ')[0]) || 0;
      
      if (a.timeAgo?.includes('hour') && b.timeAgo?.includes('day')) return -1;
      if (a.timeAgo?.includes('day') && b.timeAgo?.includes('hour')) return 1;
      
      return aTime - bTime;
    });
    
    setRecentProducts(sortedProducts);
    setIsLoading(false);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-marketplace-600 mb-6">
          Recent Listings
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-marketplace-accent"></div>
          </div>
        ) : recentProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <PackageOpen size={40} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500">No recent listings available</h3>
            <p className="text-gray-400 mt-1">
              Be the first to list an item
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecentItems;
