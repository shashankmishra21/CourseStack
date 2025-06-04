import { Link } from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhyChooseCourseStack from "../components/WhyChooseCourseStack";
import SuccessStories from "../components/successStories";


const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  //  }


  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/course/preview",
          {
            withCredentials: true,
          }
        )
        console.log(response.data.courses);
        setCourses(response.data.courses);
      }
      catch (error) {
        console.log("error in fetchcourses", error)
      }
    }
    fetchCourses();
  }, []
  )

  var settings = {
    dots: true,
    infinite: true, // Changed to true for smoother looping
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000, // Smooth auto-play
    cssEase: "ease-in-out", // For smooth transitions
    responsive: [
      {
        breakpoint: 1280, // Large screens (like desktops)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480, // Mobile phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };



  return (
    <div className='bg-gradient-to-br from-white via-violet-100 to-yellow-50 text-white '>
      <div className='min-h-screen text-white container mx-auto'>

        {/* Header */}
        <Navbar />
        {/* Header */}

        {/* main section */}
        <section className="py-0 px-6 bg-transparent">
          <div className="flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-700">
              <span>Build Skills. </span>
              <span className="text-yellow-400">Stack</span>
              <span> Knowledge.</span>
            </h1>

            <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-2xl">
              <span className="block">
                Your personalized learning platform built by devs, for devs.
              </span>
              <span className="block mt-2">
                Learn at your pace, grow your expertise, and make your mark in tech.
              </span>
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Link
                to={"/preview-course"}
                className="bg-yellow-300 hover:bg-yellow-400 text-purple-900 px-6 py-3 rounded-2xl text-lg font-semibold shadow-md transition"
              >
                Browse Courses
              </Link>
              <Link
                to={"/Signup"}
                className="border border-purple-500 text-purple-600 hover:bg-purple-100 px-6 py-3 rounded-2xl text-lg font-semibold transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>


        <section>

          <div className="w-full py-8 px-4 bg-transparent">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-purple-900 text-center drop-shadow-md">
                  Ready to imagine your career?
                </h2>
                <p className="text-center text-gray-800 mt-2 max-w-xl mx-auto">
                  Discover courses crafted to boost your skills and transform your future.
                </p>
              </div>
              <Slider {...settings}>
                {courses.map((course) => (
                  <div key={course._id} className="p-4">
                    <div className="flex justify-center">
                      <div className="relative bg-white/40 backdrop-blur-md rounded-2xl border border-purple-100 shadow-lg w-80 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">

                        {/* Image */}
                        <img
                          className="h-48 w-full object-cover rounded-t-2xl border-b border-purple-200"
                          src={course.image?.url || "/placeholder.jpg"}
                          alt={course.title || "Course Image"}
                        />

                        {/* Content */}
                        <div className="p-5 text-center space-y-3">
                          <h2 className="text-xl font-bold text-purple-800 leading-snug">{course.title}</h2>
                          <p className="text-sm text-gray-700 line-clamp-3">{course.description}</p>
                          <div className="text-yellow-600 font-bold text-lg">₹{course.price}</div>

                          <button className="mt-2 bg-yellow-300 text-purple-900 font-semibold py-2 px-6 rounded-full hover:bg-yellow-400 transition duration-300 shadow-md">
                            Enroll Now
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>







        </section>
        <section>
          <WhyChooseCourseStack />
        </section>


        <section>
          <SuccessStories />
        </section>

        <hr />

        {/* footer */}

        <Footer />
        {/* 
        
        <footer className="mt-5">

          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-center">

              <div className="flex items-center gap-4">
                <img src='/logo_cs.png' alt='' className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-white font-bold">CourseStack</h1>
              </div>
              <div className="mt-3 ml-2 md:ml-12 text-center">
                <p className="mb-2">Follow Us</p>
                <div className="flex space-x-4">
                  <a href=""><FaXTwitter className="text-2xl hover:text-blue-400 duration-300" /></a>
                  <a href=""><FaLinkedin className="text-2xl hover:text-blue-800 duration-300" /></a>
                  <a href=""><FaGithub className="text-2xl hover:text-green-500 duration-300" /></a>
                </div>
              </div>
            </div>
            <div className="items-center text-center flex flex-col">
              <h3 className="text-lg font-semibold mb-2 mt-3">Stack Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">report</li>
                <li className="hover:text-white cursor-pointer duration-300">feedback</li>
                <li className="hover:text-white cursor-pointer duration-300">ratings</li>
              </ul>
            </div>
            <div className="flex flex-col text-center items-center">
              <h3 className="text-lg font-semibold mb-2 mt-3">Stack Legals</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">Terms & Condition</li>
                <li className="hover:text-white cursor-pointer duration-300">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer duration-300">Refunds and Cancellation</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4 p-4 text-md text-gray-400 ">
            © {new Date().getFullYear()} CourseStack. All rights reserved. Developed by Shashank
          </div>
        </footer> */}
      </div>
    </div>
  )
}

export default Home
