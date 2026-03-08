
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">E-Commerce Dashboard</h2>
      <ul>
        <li><Link to="/" className="block py-2">Overview</Link></li>
        <li><Link to="/view-products" className="block py-2">View products</Link></li>
        {/* <li><Link to="/orders" className="block py-2">Orders</Link></li> */}
        <li><Link to="/user" className="block py-2">CreateUsers</Link></li>
        {/* <li><Link to="/Tshop" className="block py-2">tshop</Link></li> */}
        <li><Link to="/use" className="block py-2">View users</Link></li>
        {/* <li><Link to="/certegory" className="block py-2">certegory</Link></li> */}
        <li><Link to="/product" className="block py-2">CreateProduct</Link></li>
        <li><Link to="/category" className="block py-2">category list</Link></li>
        <li><Link to="/CategoriesPage" className="block py-2">Createcategoy</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;