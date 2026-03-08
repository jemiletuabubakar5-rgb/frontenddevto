// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
    <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-100"></div>
    <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce delay-200"></div>
  </div>
);

export default LoadingSpinner;