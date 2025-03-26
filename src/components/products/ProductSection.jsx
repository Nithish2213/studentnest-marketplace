
import React from 'react';
import ProductCard from './ProductCard';
import { ChevronRight } from 'lucide-react';

const ProductSection = ({ title, viewAllLink, products }) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-display font-semibold text-marketplace-600">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-marketplace-accent text-sm font-medium flex items-center hover:underline">
              View all <ChevronRight size={16} className="ml-1" />
            </a>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
