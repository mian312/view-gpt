import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-2 text-gray-600">Processing...</p>
    </div>
  );
};

export default LoadingIndicator;
