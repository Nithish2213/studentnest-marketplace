
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

const ProductCard = ({ product }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const productIsFavorite = isFavorite(product.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
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
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-sm transition-colors duration-200 ${
            productIsFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
          }`}
          aria-label={productIsFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={18} fill={productIsFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-marketplace-600 line-clamp-1">{product.title}</h3>
          <span className="font-semibold text-marketplace-accent">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-marketplace-400 mt-1 line-clamp-1">{product.description}</p>
        {product.condition && (
          <span className="text-xs font-medium text-marketplace-600 mt-2 inline-block">
            {product.condition}
          </span>
        )}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-sm text-marketplace-400">
            <span>{product.location}</span>
            <span className="mx-1.5">•</span>
            <span>{product.timeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
