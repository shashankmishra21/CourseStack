import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [learnerOpen, setLearnerOpen] = useState(false);
  const [creatorOpen, setCreatorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const learnerRef = useRef();
  const creatorRef = useRef();

  useEffect(() => {
    const learnerToken = localStorage.getItem('token');
    const creatorToken = localStorage.getItem('creatorToken');
    setIsLoggedIn(!!learnerToken || !!creatorToken);
  }, [location]);

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
    localStorage.removeItem('creatorToken');
    toast.success("Logged out successfully");
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="w-full bg-opacity-80 backdrop-blur-md px-4 sm:px-6 md:px-12 py-3 pt-5 pb-5">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo_cs.png" alt="CourseStack Logo" className="w-8 h-8 rounded-full" />
          <h1 className="text-xl sm:text-2xl font-bold text-purple-800">
            Course<span className="text-yellow-400">Stack</span>
          </h1>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border border-purple-300 text-purple-700 font-medium hover:bg-purple-100 transition duration-200"
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
                  className="px-4 py-2 rounded-md bg-transparent text-purple-900 font-semibold border border-purple-700 hover:bg-purple-300 transition duration-200"
                >
                  Learner
                </button>
                {learnerOpen && (
                  <div className="absolute top-12 right-0 w-32 bg-white border rounded-md shadow-lg z-20">
                    <Link to="/Signin" className="block px-4 py-2 text-purple-800 hover:bg-purple-100" onClick={() => setLearnerOpen(false)}>Sign In</Link>
                    <Link to="/Signup" className="block px-4 py-2 text-purple-800 hover:bg-purple-100" onClick={() => setLearnerOpen(false)}>Sign Up</Link>
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
                  className="px-4 py-2 rounded-md bg-transparent text-purple-900 font-semibold border border-purple-700 hover:bg-purple-300 transition duration-200"
                >
                  Creator
                </button>
                {creatorOpen && (
                  <div className="absolute top-12 right-0 w-32 bg-white border rounded-md shadow-lg z-20">
                    <Link to="/creator/signin" className="block px-4 py-2 text-purple-800 hover:bg-purple-100" onClick={() => setCreatorOpen(false)}>Sign In</Link>
                    <Link to="/creator/signup" className="block px-4 py-2 text-purple-800 hover:bg-purple-100" onClick={() => setCreatorOpen(false)}>Sign Up</Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden bg-transparent fill-gray-700">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-3 flex flex-col gap-2">
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-2 rounded-md border border-purple-300 text-purple-700 font-medium hover:bg-purple-100"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/Signin"
                className="block px-4 py-2 rounded-md bg-yellow-300 text-purple-900 hover:bg-yellow-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Learner Sign In
              </Link>
              <Link
                to="/Signup"
                className="block px-4 py-2 rounded-md bg-yellow-300 text-purple-900 hover:bg-yellow-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Learner Sign Up
              </Link>
              <Link
                to="/creator/signin"
                className="block px-4 py-2 rounded-md bg-yellow-300 text-purple-900 hover:bg-yellow-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creator Sign In
              </Link>
              <Link
                to="/creator/signup"
                className="block px-4 py-2 rounded-md bg-yellow-300 text-purple-900 hover:bg-yellow-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Creator Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
