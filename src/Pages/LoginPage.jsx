
import React, { useState } from 'react';
import { FaAngleLeft, FaRegUserCircle } from 'react-icons/fa';
import { TbTagFilled } from 'react-icons/tb';
import { LiaAccusoft, LiaShoppingCartSolid } from "react-icons/lia";
import { FaAngleRight } from 'react-icons/fa6';
import { LuLockKeyhole } from "react-icons/lu";
import axios from 'axios'; // Import Axios for making API requests

// import React, { useState } from "react";
// import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {


  }
  return (
   <div></div>
  );
};

export default LoginPage;



