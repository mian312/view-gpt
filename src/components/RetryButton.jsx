import React from 'react';
import { FaRedoAlt } from 'react-icons/fa';

const RetryButton = ({ onRetry }) => {
  return (
    <div className="text-center">
      <p className="text-red-500">Failed to process. Please try again.</p>
      <button
        onClick={onRetry}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center"
      >
        <FaRedoAlt className="mr-2" /> Retry
      </button>
    </div>
  );
};

export default RetryButton;
