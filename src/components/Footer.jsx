// import React from 'react'

// import {cu} from "react-router-dom";
import { Link } from 'react-router-dom'
import React, { useState, useEffect, Icons } from "react";

import { FaAngleRight } from "react-icons/fa6";

import { FaApple } from "react-icons/fa6";
import { AiFillAndroid } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";


import { FaFacebookF } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import image37 from"./image/image37.png";
import image40 from "./image/image40.png"


const Footer = () => {
  return (
    <div>
        <div className='h-165 w-full bg-gray-200'>
          <div className="flex justify-center">
              <div className="h-80 w-160 bg-white rounded mt-15">
                <div className="text-xl text-center mt-6">💎 DEV Diamond Sponsors</div>
                <div className="text-gray-600 mt-5 text-center">Thank you to our Diamond Sponsors for supporting the DEV Community</div>

                <div className="flex w-50 mt-10 gap-5 ml-20">
                    <img src={image37} alt="" />
                    <img src={image40} alt="" />
                </div>

                <div className="flex w-130 mt-10 gap-5 ml-20 text-center">
                    <div className="text-gray-60 text-sm">Neon is the official database partner of DEV</div>
                    <div className="text-gray-600 text-sm">Algolia is the official search partner of DEV</div>
                </div>
              </div>
          </div>

          <div className="text-gray-600 flex justify-center mt-10">DEV Community — A space to discuss and keep up software development and manage your software career</div>

    <div className="flex mt-3 justify-center">
              <div className="text-blue-600 flex ">Home <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">DEV++ <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">Podcast <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">Video <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex "> Tags<GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">Dev Help <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">Forem Shop <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">Advertise on Dev <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">DEVchallangr <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex "> DEVSowcase<GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex "> About<GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">Contact <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex ">Free database <GoDotFill className='mt-2 ml-2 text-black'/></div>
            
    </div>
    <div className="text-blue-600 flex justify-center mt-3 ">Software Comparesion</div>

    <div className="flex mt-3 justify-center">
              <div className="text-blue-600 flex text-center">code of conduct <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex text-center">privacy and policy <GoDotFill className='mt-2 ml-2 text-black'/></div>
              <div className="text-blue-600 flex text-center">teams of use <GoDotFill className='mt-2 ml-2 text-black'/></div>
        </div>
        <div className=" text-center mt-3">Built on Forem — the open source software that powers DEV and other inclusive communities.</div>
        <div className=" text-center">Made with love and Ruby on Rails. DEV Community © 2016 - 2025.</div>
        </div>

</div>
  )
  
}


export default Footer