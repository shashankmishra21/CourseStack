import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [learnerOpen, setLearnerOpen] = useState(false);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const learnerRef = useRef();
  const creatorRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (learnerRef.current && !learnerRef.current.contains(e.target)) {
        setLearnerOpen(false);
      }
      if (creatorRef.current && !creatorRef.current.contains(e.target)) {
        setCreatorOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logged out successfully");
    setIsLoggedIn(false);
    navigate('/signin');
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 md:px-12 bg-opacity-80 backdrop-blur-md">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img src="/logo_cs.png" alt="CourseStack Logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-2xl font-bold text-purple-800">
          Course<span className="text-yellow-400">Stack</span>
        </h1>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-md border border-purple-300 text-purple-700 font-medium hover:bg-purple-100 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            {/* Learner Dropdown */}
            <div className="relative" ref={learnerRef}>
              <button
                onClick={() => {
                  setLearnerOpen(!learnerOpen);
                  setCreatorOpen(false);
                }}
                className="px-5 py-2 rounded-md bg-yellow-300 text-purple-900 font-semibold hover:bg-yellow-400 transition duration-200"
              >
                Learner
              </button>
              {learnerOpen && (
                <div className="absolute top-12 right-0 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <Link
                    to="/Signin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setLearnerOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/Signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setLearnerOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Creator Dropdown */}
            <div className="relative" ref={creatorRef}>
              <button
                onClick={() => {
                  setCreatorOpen(!creatorOpen);
                  setLearnerOpen(false);
                }}
                className="px-5 py-2 rounded-md bg-yellow-300 text-purple-900 font-semibold hover:bg-yellow-400 transition duration-200"
              >
                Creator
              </button>
              {creatorOpen && (
                <div className="absolute top-12 right-0 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <Link
                    to="/Creator/signin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setCreatorOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/creator/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setCreatorOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
