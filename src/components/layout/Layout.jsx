
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Categories from '../categories/Categories';

const Layout = ({ children, showCategories = true }) => {
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showCategories && <Categories />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
