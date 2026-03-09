
import React from 'react';
import { Link } from 'react-router-dom';
import image1 from './image/image1.png'
import image36 from "../assets/image36.jpg"
import image2 from './image/image2.png'
import image5 from './image/image5.png'
import image19 from './image/image19.jpg'
import image23 from './image/image23.jpeg'
import image27 from './image/image27.jpeg'
import image29 from './image/image29.png'
import image37 from './image/image37.png'
import image39 from './image/image39.png'
import image40 from './image/image40.png'
import image3 from './image/image3.png'
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { IoLogoFacebook } from "react-icons/io";
import { FaGithub } from "react-icons/fa6";
import { PiXLogo } from "react-icons/pi";
import { PiInstagramLogoFill } from "react-icons/pi";
import { SiMastodon } from "react-icons/si";
import { LuFolderKanban } from "react-icons/lu";
import { PiButterflyFill } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";
import { FaDev } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
const Modal = () => {
  return (
    <div>
    
           <div className="flex w-full bg-gray-100  h-600">
      <div className="bg-gray-100 h-570 w-80">

    
         <div className="h-220 w-60 ml-8 mt-8">
          <div className="text-xl mb-3">🏠 Home</div>
          <div className="text-xl flex gap-2"> <img className='h-4 w-7 mt-3' src={image29} alt="yes" />
            DEV++</div>
          <div className="text-xl mt-3">🎙️ Podcasts</div>
          <div className="text-xl mt-3">🎥 Video</div>
          <div className="text-xl mt-3">🏷️ Tags</div>
          <div className="text-xl mt-3">💡 Dev Help</div>
          <div className="text-xl mt-3">🛍️ Forem Shop</div>
          <div className="text-xl mt-3">❤️ Advertise on DEV</div>
          <div className="text-xl mt-3">🏆 DEV Challanges</div>
          <div className="text-xl mt-3">✨ DEV Showcase</div>
          <div className="text-xl mt-3">😎 About</div>
          <div className="text-xl mt-3">🎺 Contact</div>
          <div className="text-xl mt-3">🐘 Free Postgres Database</div>
          <div className="text-xl mt-3">🫢 Softwere comparision</div>
          <div className="text-xl font-bold mt-7">Other</div>
          <div className="text-xl mt-3">✌️ Code of conduct</div>
          <div className="text-xl mt-3">😎 Privacy Policy</div>
          <div className="text-xl mt-3">👀 Tearms of use</div>
    
    
         <div className="flex mt-8 gap-5 text-7xl">
          <PiXLogo/>
          <IoLogoFacebook/>
          <FaGithub/>
          <LuFolderKanban/>
          <PiInstagramLogoFill/>
         </div>
         <div className="flex mt-2 gap-5 text-3xl">
           <SiMastodon/>
          <PiButterflyFill/>
         </div>

    
         </div>
     <div className="flex gap-30">
        <div className="text-xl font-bold mt-5 ml-5">My Tags</div>
        <div className="mt-7 text-2xl"><IoSettingsOutline /></div>
     </div>
         <div className="bg-white h-115 w-68 mt-10 ml-4 rounded pl-3">
          <div className="text-xl font-bold pt-4">💎  DEV Diamond</div>
          <div className="text-xl font-bold">Sponsors</div>
          <div className="w-60 mt-3 text-gray-600">Thank you to our Diamond Sponsors for supporting the DEV Community</div>
           <div className="mt-12">
            <img className='w-50 h-12' src={image37} alt="" />
            <div className="w-60 text-center text-gray-600">Neon is the official database partner of DEV</div>
           </div>
    
             <div className="mt-12">
            <img className='w-45 h-10' src={image40} alt="" />
            <div className="w-60 text-center text-gray-600">Algolia is the official search partner of DEV</div>
           </div>
         </div>
         
    
          <div className="bg-white h-90 w-68 mt-5 ml-4 rounded pl-3 pt-4">
          <div className="text-gray-600">DEV Community</div>
          <img className='w-60 mt-3' src={image3} alt="" />
         </div>
    
    
         <div className="t">
            <div className='mt-5'>DEV Community A space to discuss and keep up software development and manage your software career</div>
            <div className='mt-5'>Built on Forem — the open source software that powers DEV and other inclusive communities.</div>
          <div className='mt-5'> Made with love and Ruby on Rails. DEV Community © 2016 - 2025.</div>
         </div>
    
     
      </div>
      <div className="bg-gray-100 h-500 w-190">

            
       <div className="">
             <div className="flex border border-gray-300 rounded-lg overflow-hidden  w-full h-12 ">
                
              <input
                type="text"
                className=" p-4 flex-grow  border-none rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="What's on your mind? "
              />
            
            </div>
       </div>

    
        <div className="bg-blue-700 p-10 h-160 w-full rounded mt-3  border border-gray-300">
         <div className="t">
            <img className='h-25 w-25 rounded-lg' src={image36} alt="" />

            <div className="text-5xl mt-2 font-bold">You're now a part of the community!</div>
            <div className="t">SUGGESTED THINGS YOU CAN DO</div>

            <div className="h-16 w-full mt-4 rounded-lg p-5 text-xl text-white bg-blue-600 flex justify-between">
                <div className="f">😊Join the Welcome thread</div>
                <MdArrowForwardIos className='' />
            </div>

             <div className="h-16 w-full mt-4 rounded-lg p-5 text-xl text-white bg-blue-600 flex justify-between">
                <div className="f">✍🏾Write your first DEV Community post</div>
                <MdArrowForwardIos className='' />
            </div>

             <div className="h-16 w-full mt-4 rounded-lg p-5 text-xl text-white bg-blue-600 flex justify-between">
                <div className="f">💅🏼Customize your profile</div>
                <MdArrowForwardIos className='' />
            </div>

              <div className="h-16 w-full mt-4 rounded-lg p-5 text-xl text-white bg-blue-600 flex justify-between">
                <div className="f">🚀Join DEV++</div>
                <MdArrowForwardIos className='' />
            </div>
         </div>
        </div>

         <div className="bg-gray-100 justify-between p-4 h-15 text-2xl w-full rounded flex">

            <div className="flex gap-5">
                <div className="font-bold">Discover</div>
                <div className="t">Following</div>
            </div>

            <HiOutlineDotsHorizontal />
          </div>
    
     
        <div className="bg-white h-133 w-full rounded mt-2 border border-gray-300">
          {/* Each post is wrapped in a Link to navigate to the detail page */}
          <Link to="/Detail/" className="block">
            <img className="rounded-t" src={image39} alt="" />
            <div className="bg-white h-50 w-full">
              <div className="flex">
                <img className='h-10 w-10 rounded-full mt-3 ml-4' src={image23} alt="" />
                <div className="mt-3 ml-3">
                  <div className="t">Basti Ortiz</div>
                  <div className="text-gray text-xs -500">May 15</div>
                </div>
              </div>
              <div className="text-3xl font-bold ml-16">You're silicing your architecture wrong!</div>
              <div className="flex ml-16 gap-6 mt-2">
                <div className="t">#beginners</div>
                <div className="t">#architecture</div>
                <div className="t">#webdev</div>
                <div className="t">#devjournal</div>
              </div>
              <div className="flex gap-6 mt-6 pl-15">
                <div className="t">
                  <div>👋❤️✨💎😎 23 reactions</div>
                </div>
                <div className="flex gap-3"><TbMessageCircle className='mt-1 text-xl' /> 1 comment</div>
                <div className="flex gap-3 ml-45">2 min read<CiBookmark className='mt-1 text-xl' /></div>
              </div>
            </div>
          </Link>
    
          {/* Repeat the Link component for other posts with respective detail page links */}
          <Link to="/Detail/" className="block mt-3">
            <div className="bg-white h-57 w-full rounded border border-gray-200">
              <div className="flex">
                <img className='h-10 w-10 rounded-full mt-3 ml-4' src={image19} alt="" />
                <div className="mt-3 ml-3">
                  <div className="t">Andrea Liliana Griffiths</div>
                  <div className="text-gray text-xs -500">May 15</div>
                </div>
              </div>
              <div className="text-3xl font-bold ml-16 w-160">Speed Up Your C?/CD: ARM 64 Runners for GitHub Actions</div>
              <div className="flex ml-16 gap-6 mt-2">
                <div className="t">#programming</div>
                <div className="t">#githubactions</div>
                <div className="t">#cicd</div>
                <div className="t">#devops</div>
              </div>
              <div className="flex gap-6 mt-6 pl-15">
                <div className="t">
                  <div>👋❤️✨💎😎 13 reactions</div>
                </div>
                <div className="flex gap-3"><TbMessageCircle className='mt-1 text-xl' /> 1 comment</div>
                <div className="flex gap-3 ml-45">2 min read<CiBookmark className='mt-1 text-xl' /></div>
              </div>
            </div>
          </Link>
    
           <Link to="/Detail/" className="block mt-3">
             <div className=" bg-white h-57 w-full mt-3 rounded border border-gray-200">
            <div className="flex">
            <img className='h-10 w-10 rounded-full mt-3 ml-4' src={image5} alt="" />
            <div className="mt-3 ml-3">
              <div className="t">Kamrul Hasan</div>
              <div className="text-gray text-xs -500">May 15</div>
            </div>
            </div>
            <div className="text-3xl font-bold ml-16 w-160">
    Check Docker Installation Details- Part 4</div>
            <div className="flex ml-16 gap-6 mt-2">
              <div className="t">#docker</div>
              <div className="t">#linux</div>
              <div className="t">#container</div>
              <div className="t">#devops</div>
            </div>
    
            <div className="flex gap-6 mt-6 pl-15">
              <div className="t">
              <div >👋❤️✨💎😎  3 reactions</div>
            </div>
            <div className="flex gap-3"><TbMessageCircle className='mt-1 text-xl'/> 1 comment</div>
            <div className="flex gap-3 ml-45">2 min read<CiBookmark className='mt-1 text-xl'/></div>
            </div>
            
    
          
          </div>
          </Link>
    
          <Link to="/Detail/" className="block mt-3">
          
            <div className=" bg-white h-57 w-full mt-3 rounded border border-gray-200">
            <div className="flex">
            <img className='h-10 w-10 rounded-full mt-3 ml-4' src={image27} alt="" />
            <div className="mt-3 ml-3">
              <div className="t">Kevin Naidoo</div>
              <div className="text-gray text-xs -500">May 17</div>
            </div>
            </div>
            <div className="text-3xl font-bold ml-16 w-160">
             The secret to a long-lasting career in Software Engineering</div>
            <div className="flex ml-16 gap-6 mt-2">
              <div className="t">#programming</div>
              <div className="t">#beginners</div>
              <div className="t">#webdev</div>
              <div className="t">#devops</div>
            </div>
    
            <div className="flex gap-6 mt-6 pl-15">
              <div className="t">
              <div >👋❤️✨💎😎  2 reactions</div>
            </div>
            <div className="flex gap-3"><TbMessageCircle className='mt-1 text-xl'/> 5 comment</div>
            <div className="flex gap-3 ml-45">3 min read<CiBookmark className='mt-1 text-xl'/></div>
            </div>
            
    
          
          </div>
          </Link>
    
          {/* Continue wrapping the rest of your posts in Links as done above */}
          
        </div>
      </div>
      <div className="bg-gray-100 h-500 w-90">

         <div className="bg-white h-196 w-85 ml-5 rounded mt-3  border border-gray-300 p-6">
            <div className="text-xl font-bold">Active discussions</div>

            <div className="mt-5">
                <div className="t">Do You Ever Feel Stupid While Learning To Code?</div>
                <div className="text-gray-500 mt-2">22 comments</div>
            </div>

              <div className="mt-5">
                <div className="t">Show us your open-source project</div>
                <div className="text-gray-500 mt-2">19 comments</div>
            </div>


               <div className="mt-5">
                <div className="t">Focus on the product, not the tech stack</div>
                <div className="text-gray-500 mt-2">19 comments</div>
            </div>

                 <div className="mt-5">
                <div className="t">Beware the Evil Twin: Exploring Wi-Fi Impersonation Attacks</div>
                <div className="text-gray-500 mt-2">3 comments</div>
            </div>

                  <div className="mt-5">
                <div className="t">Which JavaScript Loop Do You Use the Most and Why?</div>
                <div className="text-gray-500 mt-2">10 comments</div>
            </div>

                      <div className="mt-5">
                <div className="t">Document Search in .NET with Kernel Memory</div>
                <div className="text-gray-500 mt-2">1 comments</div>
            </div>

                         <div className="mt-5">
                <div className="t">Meme Monday</div>
                <div className="text-gray-500 mt-2">98</div>
            </div>


                             <div className="mt-5">
                <div className="t">The Art of Resource Pooling in Go</div>
                <div className="text-gray-500 mt-2">2</div>
            </div>
         </div>
    
         <div className="bg-white h-116 w-85 ml-5 rounded mt-3  border border-gray-300">
          <div className="flex pt-4 pl-3 justify-between">
            <div className="text-gray-600">👋  What's happening this week</div>
            <div className="flex gap-5  pr-6 text-xl"><BsThreeDots/></div>
          </div>
          <div className="text-2xl font-bold ml-4 mt-1">Challenges 🤗</div>
          <div className="h-80 w-76 bg-white ml-4 border-3 border-black rounded-lg mt-2">
            <div className="text-lg text-gray-700 mt-3 ml-3">Happening Now 🌟</div>
            <img className='w-70 h-30 rounded ml-2 mt-2' src={image2} alt="" />
            <div className="text-lg mt-3 ml-2">Bright Data Real-Time AI Agents Challenge</div>
            <div className="text-lg mt-3 ml-2">Submissions Due May 25.</div>
          </div>
    
       
         <div className="text-xl mt-4 ml-5 font-bold">Have a great week ❤️</div>
        </div>
    
         <div className="bg-white h-135 w-85 ml-5 rounded mt-3  border border-gray-300">
          <div className="text-xl mt-2 ml-3 font-bold">#discuss</div>
          <div className="text-gray-600 ml-3 mt-1 text-sm">Discussion threads targeting the whole community</div>
          <div className="post">
            <div className="text-lg ml-3 mt-6">What was your win this week??</div>
            <div className="ml-3 mt-1 text-gray-500">49 comment</div> 
          </div>
    
            <div className="post">
            <div className="text-lg ml-3 mt-6">Transport Layer in CN</div>
            <div className="ml-3 mt-1 text-gray-500">New</div>
          </div>
    
            <div className="post">
            <div className="text-lg ml-3 mt-6">Did AI just kill 6,000 tech jobs?</div>
            <div className="ml-3 mt-1 text-gray-500">2 comment</div>
          </div>
    
            <div className="post">
            <div className="text-lg ml-3 mt-6">Which JavaScript Loop Do You Use the Most and Why?</div>
            <div className="ml-3 mt-1 text-gray-500">6 comment</div>
          </div>
    
              <div className="post">
            <div className="text-lg ml-3 mt-6">Why modern software feels broken and why we keep shipping it anyway</div>
            <div className="ml-3 mt-1 text-gray-500">1 comment</div>
          </div>
         </div>
    
         
         <div className="bg-white h-40 w-85 ml-5 rounded mt-3  border border-gray-300">
          <div className="text-xl mt-2 ml-3 font-bold">#watercooler</div>
          <div className="text-gray-600 ml-3 mt-1 text-sm">Light, and off-topic conversation.</div>
          <div className="post">
            <div className="text-lg ml-3 mt-6">How I built my first SaaS as a 13 year old</div>
            <div className="ml-3 mt-1 text-gray-500">1 comment</div> 
          </div>
    
         </div>

      </div>
    </div>

    </div>
  );
};

export default Modal;