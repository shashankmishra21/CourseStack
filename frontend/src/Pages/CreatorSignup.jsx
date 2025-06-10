import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatorSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/admin/signup", {
        firstName,
        lastName,
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Signup successful:", response.data);
      toast.success(response.data.message);
      navigate("/creator/signin");
    } catch (error) {
      if (error.response) {
        console.error("Signup error:", error.response.data);
        toast.error(error.response.data.error || "Signup failed");
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
            <h1><span className="text-2xl text-white font-bold">Course</span><span className="text-2xl text-yellow-300 font-bold">Stack</span></h1>
          </div>

        </header>

        {/* Signup Card */}
        <div className="flex justify-center items-center mt-6">
          <div className="bg-gradient-to-br from-purple-800 via-purple-600 to-yellow-400 p-8 rounded-2xl shadow-2xl w-[500px] border-2 border-white">
            <h2 className="text-3xl font-bold mb-2 text-center text-white">
              Welcome <span className="text-white"></span>
            </h2>
            <p className="mb-2 text-base font-normal text-center text-white">Join CourseStack as a Creator</p>

            <form onSubmit={handleSubmit}>

              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="firstname" className="block text-gray-300 mb-1">First Name</label>
                  <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Jane"
                  />
                </div>

                <div className="w-1/2">
                  <label htmlFor="lastname" className="block text-gray-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Doe"
                  />
                </div>
              </div>


              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="creator@example.com"
                />
              </div>


              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="********"
                />
              </div>

              {errorMessage && (
                <div className="mb-4 font-semibold text-2xl text-red-700 text-center">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-400 text-purple-800 font-bold py-3 rounded-md hover:bg-yellow-300 transition"
              >
                Sign Up
              </button>
            </form>


            <p className="mt-4 text-center text-white">
              Already signed up?{' '}
              <Link to="/creator/signin" className="text-yellow-200 font-semibold underline hover:text-white">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorSignup;
