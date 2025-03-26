
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Categories = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categoriesRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const categories = [
    'All',
    'Books',
    'Electronics',
    'Furniture',
    'Clothing',
    'Accessories',
    'Sports',
    'Transportation',
    'Services',
    'Tickets',
    'Housing',
    'Entertainment',
    'Tutoring'
  ];

  useEffect(() => {
    const checkScroll = () => {
      if (!categoriesRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const ref = categoriesRef.current;
    checkScroll();
    
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (!categoriesRef.current) return;
    
    const scrollAmount = 200;
    const currentScroll = categoriesRef.current.scrollLeft;
    categoriesRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="relative bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Left Scroll Button */}
          {showLeftScroll && (
            <button 
              onClick={() => scroll('left')} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow-sm border border-gray-100"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} className="text-marketplace-500" />
            </button>
          )}
          
          {/* Categories */}
          <div 
            ref={categoriesRef}
            className="flex overflow-x-auto py-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-2 px-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`category-pill whitespace-nowrap ${activeCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Scroll Button */}
          {showRightScroll && (
            <button 
              onClick={() => scroll('right')} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow-sm border border-gray-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} className="text-marketplace-500" />
            </button>
          )}
          
          {/* Gradient Fades */}
          {showLeftScroll && (
            <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          )}
          {showRightScroll && (
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
