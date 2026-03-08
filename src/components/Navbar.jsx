

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';
import image41 from './image/image41.jpg';
import { CiSearch } from 'react-icons/ci';
import AuthModal from '../modals/AuthModal';

const Navbar = () => {
  const { user, logout } = useData(); // Now properly wrapped in DataProvider
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoginClick = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthModalTab('signup');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    navigate('/');
  };

  return (
    <>
      <div className="bg-white h-22 w-full shadow-lg p-6 rounded-lg gap-6 justify-center">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <img className="h-10 rounded w-20" src={image41} alt="Brand Logo" />
          </Link>
          
          <form onSubmit={handleSearch} className="flex border border-gray-300 rounded-lg overflow-hidden shadow-md w-full h-12">
            <CiSearch className='text-3xl mt-2 font-bold' /> 
            <input
              type="text"
              className="flex-grow border-none rounded-l focus:outline-none focus:ring-2 focus:ring-blue-600 px-2"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-white text-black rounded-r-lg flex items-center justify-center px-2"
            >
              <span className='text-sm'>Powered by Algoria</span>
            </button>
          </form>

          <div className="flex items-center space-x-4 w-150 pl-60">
            {user ? (
              <>
                <Link to="/create-post">
                  <button className="border border-blue-400 text-blue-600 hover:border-blue-600 rounded px-5 py-3 bg-white font-bold">
                    Create Post
                  </button>
                </Link>
                <Link to={`/user/${user._id}`}>
                  <div className="h-10 w-10 pt-2 bg-green-500 rounded-full text-center text-white font-bold cursor-pointer">
                    {user.first_name?.charAt(0) || 'U'}
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Login
                </button>
                <button 
                  onClick={handleSignupClick}
                  className="border border-blue-400 text-blue-600 hover:border-blue-600 rounded px-5 py-3 bg-white font-bold"
                >
                  Create account
                </button>
                <Link to="/">
                  <button className="border border-blue-400 text-blue-600 hover:border-blue-600 rounded px-5 py-3 bg-white font-bold">
                    Blog
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Navbar;