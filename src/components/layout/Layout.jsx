
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, showCategories = false }) => {
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
