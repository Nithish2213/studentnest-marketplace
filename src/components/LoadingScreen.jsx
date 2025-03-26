
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div className="h-14 w-14 rounded-full border-4 border-marketplace-accent/20 border-t-marketplace-accent animate-spin"></div>
        <h2 className="mt-4 text-xl font-display font-medium text-marketplace-500">Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
