
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // In a real app, this would make an API call to save the favorite status
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card block">
      <div className="relative aspect-square overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
        )}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-sm transition-colors duration-200 ${
            isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
        {product.condition && (
          <span className="absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-md bg-white/70 backdrop-blur-sm text-marketplace-600">
            {product.condition}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-marketplace-600 line-clamp-1">{product.title}</h3>
          <span className="font-semibold text-marketplace-accent">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-marketplace-400 mt-1 line-clamp-1">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-sm text-marketplace-400">
            <span>{product.location}</span>
            <span className="mx-1.5">•</span>
            <span>{product.timeAgo}</span>
          </div>
          {product.rating && (
            <div className="flex items-center text-sm">
              <Star size={14} className="text-yellow-400 mr-1" fill="currentColor" />
              <span className="text-marketplace-500">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
