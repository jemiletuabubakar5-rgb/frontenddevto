import React from 'react';

const Overview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">Total Sales</h2>
        <p className="text-2xl">$10,000</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">Total Products</h2>
        <p className="text-2xl">150</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">Total Orders</h2>
        <p className="text-2xl">75</p>
      </div>
    </div>
  );
};

export default Overview;
























