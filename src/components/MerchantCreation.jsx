import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MerchantCreation = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    phones: "",
    store_name: "",
    descp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.descp.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.store_name.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please fill in all fields");
      return; // Stop further execution
    }

    try {
      const res = await axios.post(
        "http://ecommerce.reworkstaging.name.ng/v2/merchants",
        formData
      );

      console.log("API Response:", res); // Log the full response for debugging

      if (res.status === 200 && res.data.adminId) {
        alert("Merchant created successfully");
        localStorage.setItem("admin", res.data.adminId.id); // Save merchant_id
        // const adminId = JSON.parse(localStorage.getItem("admin"));
        navigate("/Login"); // Redirect to the login page
      } else {
        setError(res.data.msg || "Failed to create merchant. Please try again.");
      }
    } catch (err) {
      console.error("API Error:", err.response || err); // Log the error for debugging
      setError(
        err.response?.data?.msg ||
          "An error occurred while creating the merchant."
      );
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
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Doe"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ap@gmail.com"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel" // Use "tel" for phone numbers
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0901234567"
            required
          />
        </div>

        {/* Store Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Store Name</label>
          <input
            type="text"
            name="store_name"
            value={formData.store_name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nicolas Aluminium"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="descp"
            value={formData.descp}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="All is well that ends well"
            required
          />
        </div>

        {/* Additional Phone Numbers */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Additional Phone Numbers
          </label>
          <input
            type="tel" // Use "tel" for phone numbers
            name="phones"
            value={formData.phones}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Phone 1"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder=""
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <Link to="/Login" className="flex justify-end hover:text-red-600 text-sm mb-2">
          !I don't have an account
        </Link>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default MerchantCreation;