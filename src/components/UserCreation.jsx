import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; // Added toast import
import 'react-toastify/dist/ReactToastify.css'; // Added toast CSS

const UserCreation = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submission

    // Validate input fields
    if (
      !userData.first_name.trim() ||
      !userData.last_name.trim() ||
      !userData.email.trim() ||
      !userData.password.trim() ||
      !userData.phone.trim()
    ) {
      setError("Please fill in all fields");
      return; // Prevent further execution
    }

    try {
      const res = await axios.post(
        "http://ecommerce.reworkstaging.name.ng/v2/users",
        userData
      );

      if (res.status === 200 && res.data.id) {
        console.log(res.data.id); // Corrected this line
        
        toast.success('Merchant created successfully');
        // localStorage.setItem("merchant_id", res.data.id); // Save merchant_id
        navigate('/use'); // Change to your desired route
      } else {
        toast.error(res.data.msg || 'Failed to create user.');
      }
    } catch (err) {
      console.error(err); // Log error for debugging
      toast.error('An error occurred while creating user.'); // Notify user of error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Doe"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ap@gmail.com"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0901234567"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
          />
        </div>
        
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <Link to='/use' className="flex justify-end hover:text-red-600 text-sm mb-2">!I don't have an account</Link>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          creat user
        </button>
      
      </form>
    </div>
  );
};

export default UserCreation;