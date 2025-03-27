
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HeroBanner from '../components/home/HeroBanner';
import ProductSection from '../components/products/ProductSection';
import Categories from '../components/categories/Categories';

// Mock data for trending products
const initialProducts = [
  {
    id: 1,
    title: 'MacBook Pro 2019',
    description: 'Great condition, barely used',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80',
    condition: 'Like New',
    location: 'West Campus',
    timeAgo: '2 days ago',
    rating: 4.9,
    isFavorite: false,
    category: 'Electronics'
  },
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
    isFavorite: true,
    category: 'Books'
  },
  {
    id: 3,
    title: 'Desk Chair - Ergonomic',
    description: 'Perfect for studying long hours',
    price: 85,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    condition: 'Good',
    location: 'North Dorms',
    timeAgo: '1 day ago',
    rating: 4.5,
    isFavorite: false,
    category: 'Furniture'
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
    rating: 5.0,
    isFavorite: false,
    category: 'Electronics'
  },
  {
    id: 5,
    title: 'Bike - Trek FX 2',
    description: 'Great for getting around campus',
    price: 350,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80',
    condition: 'Good',
    location: 'Recreation Center',
    timeAgo: '4 days ago',
    rating: 4.6,
    isFavorite: false,
    category: 'Transportation'
  },
  {
    id: 6,
    title: 'Mini Fridge',
    description: 'Perfect for dorm rooms',
    price: 75,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    condition: 'Good',
    location: 'East Hall',
    timeAgo: '1 hour ago',
    rating: 4.2,
    isFavorite: false,
    category: 'Electronics'
  },
  {
    id: 7,
    title: 'Physics Lab Manual',
    description: 'For PHYS 2211',
    price: 20,
    image: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80',
    condition: 'Fair',
    location: 'Science Building',
    timeAgo: '3 hours ago',
    rating: 4.0,
    isFavorite: false,
    category: 'Books'
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
    rating: 4.8,
    isFavorite: false,
    category: 'Electronics'
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
    isFavorite: true,
    category: 'Entertainment'
  },
  {
    id: 10,
    title: 'Dorm Room Rug 5x7',
    description: 'Soft and cozy',
    price: 40,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    condition: 'Good',
    location: 'West Residence',
    timeAgo: '1 day ago',
    rating: 4.3,
    isFavorite: false,
    category: 'Furniture'
  }
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredTrending, setFilteredTrending] = useState([]);
  const [filteredRecent, setFilteredRecent] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Load products from localStorage and combine with initial products
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    // Combine stored products with initial products, avoiding duplicates by ID
    const combinedProducts = [...storedProducts];
    
    initialProducts.forEach(product => {
      if (!combinedProducts.some(p => p.id === product.id)) {
        combinedProducts.push(product);
      }
    });
    
    setAllProducts(combinedProducts);
  }, []);

  // Filter products by category
  useEffect(() => {
    if (allProducts.length > 0) {
      if (selectedCategory === 'All') {
        // For trending, use first few products
        setFilteredTrending(allProducts.slice(0, 5));
        // For recent, prioritize stored products (which are newer)
        setFilteredRecent(allProducts.slice(0, 5));
      } else {
        // Filter by selected category
        const categoryProducts = allProducts.filter(product => 
          product.category === selectedCategory ||
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
        
        setFilteredTrending(categoryProducts.slice(0, 5));
        setFilteredRecent(categoryProducts.slice(0, 5));
      }
    }
  }, [selectedCategory, allProducts]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <HeroBanner />
      
      <div className="container mx-auto px-4 py-4">
        <Categories onCategoryChange={handleCategoryChange} />
      </div>
      
      <div id="trending">
        <ProductSection 
          title={`${selectedCategory === 'All' ? 'Trending Now' : selectedCategory + ' Trending'}`}
          viewAllLink="/category/trending" 
          products={filteredTrending} 
          emptyMessage={`No trending ${selectedCategory.toLowerCase()} items available`}
        />
      </div>
      
      <ProductSection 
        title={`${selectedCategory === 'All' ? 'Recent Listings' : selectedCategory + ' Listings'}`}
        viewAllLink="/category/recent" 
        products={filteredRecent} 
        emptyMessage={`No recent ${selectedCategory.toLowerCase()} listings available`}
      />
      
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-marketplace-600 mb-3">Ready to sell your items?</h2>
          <p className="text-marketplace-500 mb-6 max-w-2xl mx-auto">
            Reach thousands of students at your university. Listing is free and takes less than 2 minutes!
          </p>
          <Link to="/sell" className="btn-primary inline-flex items-center">
            Create Listing
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
