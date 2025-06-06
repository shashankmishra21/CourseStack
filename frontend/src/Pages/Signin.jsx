import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signin",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);  // <-- Store JWT token here!
        console.log("JWT Token stored:", token);

        toast.success(response.data.message || "Signed in successfully");
        navigate("/dashboard"); // Redirect user after login (e.g. homepage or dashboard)
      } else {
        toast.error("Token not received. Please try again.");
      }
    } catch (error) {
      console.error("Signin error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        setErrorMessage(error.response.data.message);
      } else {
        toast.error("Something went wrong. Try again later.");
        setErrorMessage("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className='bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white'>
      <div className='min-h-screen container mx-auto'>

        {/* Header */}
        <header className='flex justify-between items-center p-6'>
          <div className="flex items-center gap-2">
            <img src='/logo_cs.png' alt='CourseStack Logo' className="w-10 h-10 rounded-full" />
            <h1>
              <span className="text-2xl text-white font-bold">Course</span>
              <span className="text-2xl text-yellow-400 font-bold">Stack</span>
            </h1>
          </div>

          <div className="flex gap-4">
            <Link
              to={"/signup"}
              className="bg-transparent text-white font-bold py-2 px-4 border border-white rounded hover:bg-white hover:text-purple-700 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </header>

        {/* Signin Card */}
        <div className="flex justify-center items-center mt-20">
          <div className="bg-gradient-to-br from-purple-800 via-purple-600 to-yellow-400 p-8 rounded-2xl shadow-2xl w-[500px] border-2 border-white">
            <h2 className="text-3xl font-bold mb-4 text-center text-white">
              Sign in to your account
              <h5 className='text-base font-normal text-center text-white'>Access your dashboard, courses, and more.</h5>
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="********"
                  autoComplete="new-password"
                  required
                />
              </div>

              {/* Error message display */}
              {errorMessage && (
                <div className="mb-4 font-semibold text-red-700 text-center">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-400 text-purple-800 font-bold py-3 rounded-md hover:bg-yellow-300 transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signin;
