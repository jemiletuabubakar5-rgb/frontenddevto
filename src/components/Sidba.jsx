import React from "react";
import { Link } from "react-router-dom";

const Sidba = () => {
  return (
    <div className="fixed z-50 left-0 h-screen bg-white border border-r-gray-500 border-[0.25] w-[20%]">
      <div className="flex flex-col gap-[90px]">
        <div>
          <div className="px-4 py-2 flex flex-col items-center gap-1 border-b border-gray-500">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-md font-bold">Precious</p>
            <p className="text-sm font-semibold">Gifted@gmail.com</p>
          </div>
          <div>
            <div className="py-4 px-3 border-t border-gray-500 hover:bg-slate-200 cursor-pointer">
            <Link to="/AdminDash">
              <p className="text-md font-semibold">Dashboard</p>
              </Link>
            </div>

            <div className="py-4 px-3 border-t border-gray-500 border-b  hover:bg-slate-200 cursor-pointer">
            <Link to="/ProductSuccess">
            <p className="text-md font-semibold">Products</p>
              </Link>
        
            </div>
            <div className="py-4 px-3 border-t border-gray-500 border-b  hover:bg-slate-200 cursor-pointer">
            <Link to="/CategoriesPage">
            <p className="text-md font-semibold">Category</p>
              </Link>
            </div>
            <div className="py-4 px-3 border-t border-gray-500 border-b  hover:bg-slate-200 cursor-pointer">
              <Link to="/User">
                <p className="text-md font-semibold">User </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-2.5 px-3 text-center border-t border-gray-500">
          <Link to="/Adminlogin">Log Out</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidba;