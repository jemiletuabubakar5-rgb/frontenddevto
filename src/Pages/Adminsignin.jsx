
import "react-toastify/dist/ReactToastify.css";
import image28 from "./image/image28.PNG"
import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { PiXLogoBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
const Adminsignin = () => {




  return (
   <div>
    <div className="h-250 w-full bg-white justify-center">
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

<div className=" flex justify-center text-gray-500">  <div className="text-center mt-10 pb-4 border-b border-gray-500 w-120 flex">By signing up, you are agreeing to our privacy
     policy, terms of use and code of conduct.</div></div>

     <div className="text-gray-500 mt-6 flex justify-center">Already have an account? <Link to="/Login" className="text-blue-600"> Log in.</Link> </div>
    </div>
   </div>
   
  );
};

export default Adminsignin;

