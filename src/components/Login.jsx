

import "react-toastify/dist/ReactToastify.css";
import image28 from "./image/image28.png"
import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { PiXLogoBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import React, { useState } from 'react';
const Login = () => {

   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simulated login logic
        if (email === 'user@example.com' && password === 'password') {
            alert('Login Successful');
        } else {
            setError('Invalid email or password');
        }
    };


  return (
   <div>
    <div className="h-330 w-full bg-white justify-center">
    <div className="flex justify-center pt-30">
        <img className="justify-center w-18 h-14 flex rounded" src={image28} alt="" />
    </div>

    <div className="flex justify-center text-4xl font-bold mt-8">Join the DEV Community</div>
    <div className="text-gray-600 flex justify-center mt-6 text-xl">DEV Community is a community of 3,172,154 amazing developers</div>
  <form action="">
    <div className="flex justify-center mt-5">
      <button className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg">
      <FaApple className="w-10 text-2xl"/>
      <div className="w-240">Sign up with Apple</div>
    </button>
    </div>


      <div className="flex justify-center mt-5">
      <button className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg">
      <FaSquareFacebook className="w-10 text-2xl text-blue-600"/>
      <div className="w-240">Sign up with Facebook</div>
    </button>
    </div>

     <div className="flex justify-center mt-5">
      <button className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg">
      <FaApple className="w-10 text-2xl"/>
      <div className="w-240">Sign up with Forem

</div>
    </button>
    </div>

       <div className="flex justify-center mt-5">
      <button className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg">
      <FaGithub className="w-10 text-2xl"/>
      <div className="w-240">Sign up with GitHub</div>
    </button>
    </div>

        <div className="flex justify-center mt-5">
      <button className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg">
      <FcGoogle className="w-10 text-2xl"/>
      <div className="w-240">Sign up with Google</div>
    </button>
    </div>

    
        <div className="flex justify-center mt-5">
      <button className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg">
      <PiXLogoBold className="w-10 text-2xl"/>
      <div className="w-240">Sign up with Twitter (X)</div>
    </button>
    </div>


        <div className="flex justify-center mt-5">
      <button className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg">
      <MdEmail className="w-10 text-2xl"/>
      <div className="w-240">Sign up with Email
</div>
    </button>
    </div>
  </form>



  <div className="flex gap-3 justify-center mt-5">
    <div className=" h-5 w-72  border-b border-gray-400"></div>
    <div className="t">OR</div>
    <div className="h-5 w-72  border-b border-gray-400"></div>
  </div>
           <div className="flex justify-center mt-5">
              <form className="" onSubmit={handleSubmit}>
                <div className="text-xl font-bold">  Email:</div>
                <div className="">
            
                    <label>
                        <input className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="text-xl font-bold"> Password:</div>
                <div className="">
                    <label>
                       
                        <input className="flex p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>

       <div className="flex justify-between ">
                   <label className="flex gap-2 mt-2 ">
        <input className="" type="checkbox" name="remember" id="remember" />
       <div className=""> Remember me</div>
    </label>
     <div className="text-blue-700 mt-3">Forgot password?</div>
       </div>
                <button className="text-white  font-bold bg-blue-600 flex mt-5 p-3 border border-gray-200 gap-10 justify-center w-160 rounded-lg" type="submit">Login</button>
            </form>
           </div>

<div className=" flex justify-center text-gray-500">  <div className="text-center mt-10 pb-4 border-b border-gray-500 w-120 flex">By signing up, you are agreeing to our privacy
     policy, terms of use and code of conduct.</div></div>

     <div className="text-gray-500 mt-6 flex justify-center">New to DEV Community? <Link to="/Adminsignin" className="text-blue-600"> Create account.</Link> </div>
    </div>
   </div>
   
  );
};

export default Login;