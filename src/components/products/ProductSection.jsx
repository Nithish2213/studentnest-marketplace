
import React from 'react';
import ProductCard from './ProductCard';
import { ChevronRight, PackageOpen } from 'lucide-react';

const ProductSection = ({ title, viewAllLink, products, emptyMessage = "No products available" }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-display font-semibold text-marketplace-600">{title}</h2>
          {viewAllLink && products.length > 0 && (
            <a href={viewAllLink} className="text-marketplace-accent text-sm font-medium flex items-center hover:underline">
              View all <ChevronRight size={16} className="ml-1" />
            </a>
          )}
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <PackageOpen size={40} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500">{emptyMessage}</h3>
            <p className="text-gray-400 mt-1">
              Check back later or try a different category
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
