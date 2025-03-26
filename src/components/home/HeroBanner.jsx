
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-marketplace-600 leading-tight mb-4">
              Buy & Sell Within Your <span className="text-marketplace-accent">Campus Community</span>
            </h1>
            <p className="text-lg text-marketplace-500 mb-6 max-w-lg">
              The easiest way to find what you need or sell what you don't. Exclusive marketplace for university students.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/sell" className="btn-primary flex items-center">
                <ShoppingBag size={18} className="mr-2" /> Start Selling
              </Link>
              <a href="#trending" className="btn-secondary flex items-center">
                <TrendingUp size={18} className="mr-2" /> Trending Items
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-slide-in-right">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Students using the marketplace"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-marketplace-accent/10 rounded-full -z-10"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-marketplace-accent2/10 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
