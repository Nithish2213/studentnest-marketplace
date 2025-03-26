
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const FavoritesContext = createContext();

// Create a provider component
export const FavoritesProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add or remove item from favorites
  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const existingIndex = prevFavorites.findIndex(item => item.id === product.id);
      
      if (existingIndex >= 0) {
        // Remove from favorites
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        // Add to favorites
        return [...prevFavorites, {...product, isFavorite: true}];
      }
    });
  };

  // Check if product is in favorites
  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  // Get count of favorites
  const getFavoritesCount = () => {
    return favorites.length;
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
