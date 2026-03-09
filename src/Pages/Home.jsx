

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
import { useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthModal from '../modals/AuthModal';
import { useState } from "react";

// import image1 from "../assets/images/image1.png";
import image1 from './image/image1.png';
import image2 from './image/image2.png';
import image5 from './image/image5.png';
import image19 from './image/image19.jpg';
import image23 from './image/image23.jpeg';
import image27 from './image/image27.jpeg';
import image29 from './image/image29.png';
import image37 from './image/image37.png';
import image39 from './image/image39.png';
import image40 from './image/image40.png';
import image3 from './image/image3.png';

const Home = () => {
  const {  
    postError, 
    user,
    currentPage,
    totalPages
  } = useData();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

    const { fetchPosts, posts, isLoading } = useData();
  
  useEffect(() => {
    const loadPosts = async () => {
      try {
        await fetchPosts(); // This should now work
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    };
    
    loadPosts();
  }, [fetchPosts]);


  const handlePageChange = (newPage) => {
    fetchPosts(newPage);
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex w-full bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="bg-gray-100 h-800 w-80">
        <div className="bg-white h-90 w-66 mt-5 ml-4 rounded pl-3">
          <div className="text-2xl font-bold">DEV Community is a community of 3,140,474 amazing developers</div>
          <div className="text-gray-500 text-xl mt-5">We're a place where coders share, stay up-to-date and grow their careers.</div>

          {user ? (
            <Link to="/create-post" className="mt-6 inline-block border border-blue-400 text-blue-600 hover:border-blue-600 rounded px-14 py-3 bg-white font-bold">
              Create Post
            </Link>
          ) : (
            <>
              <button 
                onClick={() => setShowSignupModal(true)}
                className="mt-6 border border-blue-400 text-blue-600 hover:border-blue-600 rounded px-14 py-3 bg-white font-bold"
              >
                Create account
              </button>
              <div className='mt-4 ml-20'>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>

        <div className="h-290 w-60 ml-8 mt-8">
          <div className="text-xl mb-3">🏠 Home</div>
          <div className="text-xl flex gap-2"> 
            <img className='h-4 w-7 mt-3' src={image29} alt="DEV++" />
            DEV++
          </div>
          <div className="text-xl mt-3">🎙️ Podcasts</div>
          <div className="text-xl mt-3">🎥 Video</div>
          <div className="text-xl mt-3">🏷️ Tags</div>
          <div className="text-xl mt-3">💡 Dev Help</div>
          <div className="text-xl mt-3">🛍️ Forem Shop</div>
          <div className="text-xl mt-3">❤️ Advertise on DEV</div>
          <div className="text-xl mt-3">🏆 DEV Challenges</div>
          <div className="text-xl mt-3">✨ DEV Showcase</div>
          <div className="text-xl mt-3">😎 About</div>
          <div className="text-xl mt-3">🎺 Contact</div>
          <div className="text-xl mt-3">🐘 Free Postgres Database</div>
          <div className="text-xl mt-3">🫢 Software comparison</div>
          
          <div className="text-xl font-bold mt-7">Other</div>
          <div className="text-xl mt-3">✌️ Code of conduct</div>
          <div className="text-xl mt-3">😎 Privacy Policy</div>
          <div className="text-xl mt-3">👀 Terms of use</div>

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

          <div>
            <div className="text-xl font-bold mt-10">Popular Tags</div>
            <div className="max-h-60 overflow-y-auto">
              <div className="text-gray-500 text-xl mt-3">#webdev</div>
              <div className="text-gray-500 text-xl mt-3">#programming</div>
              <div className="text-gray-500 text-xl mt-3">#javascript</div>
              <div className="text-gray-500 text-xl mt-3">#beginners</div>
              <div className="text-gray-500 text-xl mt-3">#ai</div>
              <div className="text-gray-500 text-xl mt-3">#tutorial</div>
              <div className="text-gray-500 text-xl mt-3">#productivity</div>
              <div className="text-gray-500 text-xl mt-3">#python</div>
              <div className="text-gray-500 text-xl mt-3">#develops</div>
              <div className="text-gray-500 text-xl mt-3">#react</div>
            </div>
          </div>
        </div>

        <div className="bg-white h-115 w-68 mt-10 ml-4 rounded pl-3">
          <div className="text-xl font-bold pt-4">💎 DEV Diamond</div>
          <div className="text-xl font-bold">Sponsors</div>
          <div className="w-60 mt-3 text-gray-600">Thank you to our Diamond Sponsors for supporting the DEV Community</div>
          <div className="mt-12">
            <img className='w-50 h-12' src={image37} alt="Neon" />
            <div className="w-60 text-center text-gray-600">Neon is the official database partner of DEV</div>
          </div>
          <div className="mt-12">
            <img className='w-45 h-10' src={image40} alt="Algolia" />
            <div className="w-60 text-center text-gray-600">Algolia is the official search partner of DEV</div>
          </div>
        </div>

        <div className="bg-white h-90 w-68 mt-5 ml-4 rounded pl-3 pt-4">
          <div className="text-gray-600">DEV Community</div>
          <img className='w-60 mt-3' src={image3} alt="DEV Community" />
        </div>

        <div className="t">
          <div className='mt-5'>DEV Community A space to discuss and keep up software development and manage your software career</div>
          <div className='mt-5'>Built on Forem — the open source software that powers DEV and other inclusive communities.</div>
          <div className='mt-5'> Made with love and Ruby on Rails. DEV Community © 2016 - 2025.</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 h-800 w-190">
        <div className="flex gap-5 pt-5">
          <div className="text-black hover:text-blue-600 text-xl font-bold">Relevants</div>
          <div className="text-gray-500 text-xl font-bold">Latest</div>
          <div className="text-gray-500 text-xl font-bold">Top</div>
        </div>

        {/* DEV Challenge Banner */}
        <div className="bg-white h-160 w-full rounded mt-3 border border-gray-300">
          <div className="flex pt-5 pl-4 justify-between">
            <div className="text-gray-600">👋 DEV Challenges</div>
            <div className="flex gap-3 pt-4 pr-6 text-2xl"><BsThreeDots/><BsXLg/></div>
          </div>
          <img className='h-65 w-155 rounded ml-15 mt-4' src={image1} alt="DEV Challenge" />
          <div className="text-2xl w-155 ml-15 font-bold">Build an AI agent or system powered by real-time web data</div>
          <div className="h-40 w-155 bg-white ml-15 mt-2 rounded border border-gray-300">
            <div className='flex'>
              <FaDev className='text-6xl pl-5 pt-5'/>
              <div className="text-2xl pl-5 mt-5 w-130 font-bold">Join the Bright Data Real-Time AI Agents Challenge: $3,000 in Prizes!</div>
            </div>
            <div className="text-gray-600 font-bold ml-20">dev.to staff for The DEV Team • May 7</div>
            <div className="flex gap-2 ml-20 text-gray-500">
              <div>#brightdatachallenge</div>
              <div>#devchallenge</div>
              <div>#ai</div>
              <div>#webdev</div>
            </div>
          </div>
          <div className="text-xl pt-6 pl-15">Happy Coding 💙</div>
        </div>

        {/* Posts List */}
        {isLoading && posts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : postError ? (
          <div className="bg-white p-4 rounded-lg shadow-md text-center my-4">
            <p className="text-red-500 mb-4">{postError}</p>
            <button 
              onClick={fetchPosts}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : (
          posts.map(post => (
            <div key={post._id || post.id} className="bg-white rounded-lg shadow mb-4 overflow-hidden">
              <Link to={`/post/${post._id || post.id}`} className="block">
              {post.image && (
  <div className="h-48 w-full overflow-hidden">
    <img
      src={`https://backend-2-production-0f74.up.railway.app/uploads/${post.image}`}
      alt={post.title}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = image23;
      }}
    />
  </div>
)}
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <img 
                      src={post.author?.avatar || image23}
                      alt="Author"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h4 className="font-medium">{post.author?.name || 'Anonymous'}</h4>
                      <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories?.map((cat, i) => (
                      <span key={i} className="text-sm text-blue-600">
                        #{typeof cat === 'object' ? cat.name : cat}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.likes || 0} reactions</span> 
                    <span>{post.comments?.length || 0} comments</span>
                    <span>{Math.ceil(post.content?.length / 1000) || 1} min read</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center my-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="bg-gray-100 h-800 w-90">
        <div className="bg-white h-116 w-85 ml-5 rounded mt-3 border border-gray-300">
          <div className="flex pt-4 pl-3 justify-between">
            <div className="text-gray-600">👋 What's happening this week</div>
            <div className="flex gap-5 pr-6 text-xl"><BsThreeDots/></div>
          </div>
          <div className="text-2xl font-bold ml-4 mt-1">Challenges 🤗</div>
          <div className="h-80 w-76 bg-white ml-4 border-3 border-black rounded-lg mt-2">
            <div className="text-lg text-gray-700 mt-3 ml-3">Happening Now 🌟</div>
            <img className='w-70 h-30 rounded ml-2 mt-2' src={image2} alt="Challenge" />
            <div className="text-lg mt-3 ml-2">Bright Data Real-Time AI Agents Challenge</div>
            <div className="text-lg mt-3 ml-2">Submissions Due May 25.</div>
          </div>
          <div className="text-xl mt-4 ml-5 font-bold">Have a great week ❤️</div>
        </div>

        <div className="bg-white h-135 w-85 ml-5 rounded mt-3 border border-gray-300">
          <div className="text-xl mt-2 ml-3 font-bold">#discuss</div>
          <div className="text-gray-600 ml-3 mt-1 text-sm">Discussion threads targeting the whole community</div>
          <div className="post">
            <div className="text-lg ml-3 mt-6">What was your win this week??</div>
            <div className="ml-3 mt-1 text-gray-500">49 comments</div> 
          </div>
          <div className="post">
            <div className="text-lg ml-3 mt-6">Transport Layer in CN</div>
            <div className="ml-3 mt-1 text-gray-500">New</div>
          </div>
          <div className="post">
            <div className="text-lg ml-3 mt-6">Did AI just kill 6,000 tech jobs?</div>
            <div className="ml-3 mt-1 text-gray-500">2 comments</div>
          </div>
          <div className="post">
            <div className="text-lg ml-3 mt-6">Which JavaScript Loop Do You Use the Most and Why?</div>
            <div className="ml-3 mt-1 text-gray-500">6 comments</div>
          </div>
          <div className="post">
            <div className="text-lg ml-3 mt-6">Why modern software feels broken and why we keep shipping it anyway</div>
            <div className="ml-3 mt-1 text-gray-500">1 comment</div>
          </div>
        </div>

        <div className="bg-white h-40 w-85 ml-5 rounded mt-3 border border-gray-300">
          <div className="text-xl mt-2 ml-3 font-bold">#watercooler</div>
          <div className="text-gray-600 ml-3 mt-1 text-sm">Light, and off-topic conversation.</div>
          <div className="post">
            <div className="text-lg ml-3 mt-6">How I built my first SaaS as a 13 year old</div>
            <div className="ml-3 mt-1 text-gray-500">1 comment</div> 
          </div>
        </div>

        <div className="trend">
          <div className="text-lg mt-10 ml-6">trending guides/resources</div>
          <div className="text-gray-600 text-lg mt-6 ml-10">Stop Using AWS</div>
          <div className="text-gray-600 text-lg mt-6 ml-10">Cursor is now free for students</div>
          <div className="text-gray-600 text-lg mt-6 ml-10 w-70">30+ MCP Ideas with Complete Source Code</div>
          <div className="text-gray-600 text-lg mt-6 ml-10 w-75">Every Developer Needs to Self-Host</div>
          <div className="text-gray-600 text-lg mt-6 ml-10 w-70">How I'd Build a SaaS in 2025</div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => {
          setShowLoginModal(false);
          toast.success('Logged in successfully!');
          fetchPosts();
        }}
      />

      <AuthModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignupSuccess={() => {
          setShowSignupModal(false);
          toast.success('Account created! Please login');
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default Home;