import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
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
      <div className="flex gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-md border border-purple-300 text-purple-700 font-medium hover:bg-purple-100 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/Signin"
              className="px-5 py-2 rounded-md border border-purple-300 text-purple-700 font-medium hover:bg-purple-100 transition duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/Signup"
              className="px-5 py-2 rounded-md bg-yellow-300 text-purple-900 font-semibold hover:bg-yellow-400 transition duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
