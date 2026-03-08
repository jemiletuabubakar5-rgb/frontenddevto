


import React from 'react';

const BrandsSection = ({ isOpen, onClose, title, children }) => {
  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-5">
          <h2 className="text-lg font-bold">{title}</h2>
          <div>{children}</div>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
            Close
          </button>
        </div>
      </div>
    ) : null
  );
};

export default BrandsSection;