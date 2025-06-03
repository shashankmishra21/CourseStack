import { Link } from "react-router-dom"
import Navbar from "../components/Navbar";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {

  const[ isLoggedIn , setIsLoggedIn ] =useState(false);

  // const handleLogout = async () => {
  //   try{
  //     axios.get("");

  //   } catch(error){

    
  //   }
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
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className='bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white '>
      <div className='min-h-screen text-white container mx-auto'>

        {/* Header */}
        <Navbar/>
    
        {/* main section */}
        <section>
          <div className="flex flex-col justify-center items-center h-full px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Build Skills. Stack Knowledge.
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-2xl">
              {/* <span className="block text-xl md:text-2xl mb-2">
                Welcome to
              </span>
              <span className="block text-3xl md:text-4xl font-extrabold text-white mb-4">
                CourseStack
              </span> */}
              <span className="block">
                Your personalized learning platform built by devs, for devs.
              </span>
              <span className="block mt-2">
                Learn at your pace, grow your expertise, and make your mark in tech.
              </span>
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <button className="bg-yellow-300 hover:bg-white text-black px-6 py-3 rounded-2xl text-lg font-medium shadow-md transition">
                Browse Courses
              </button>
              <Link to={"/Signup"} className="border border-purple-400 text-purple-400 hover:bg-white px-6 py-3 rounded-2xl text-lg font-medium transition">
                Get Started
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-6xl px-4">
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="flex items-center relative  flex-shrink-0 w-92 transition-transform duration-300 hover:scale-05">
                  <div className="bg-gray-900 rounded-lg overflow-hidden" >
                    <img className="h-32 w-full object-contain"
                      src={course.image?.url || "/placeholder.jpg"}
                      alt={course.title || "Course Image"}/>

                    <div className="p-6 text-center">
                      <h2 className="text-xl font-bold text-white"  >
                        {course.title}
                      </h2>
                      <button className="mt-4 bg-yellow-300 text-black py-2 px-4 rounded-full hover:bg-purple-400 duration-300">Enroll Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
</div>
</div>
        </section>
        {/* <section>Section 3</section> */}

        {/* footer */}

        <hr />
        <footer className="my-8">

          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-center">

              <div className="flex items-center gap-4">
                <img src='/logo_cs.png' alt='' className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl text-white font-bold">CourseStack</h1>
              </div>
              <div className="mt-3 ml-2 md:ml-16">
                <p className="mb-2">Follow Us</p>
                <div className="flex space-x-4">
                  <a href=""><FaXTwitter className="text-2xl hover:text-blue-400 duration-300" /></a>
                  <a href=""><FaLinkedin className="text-2xl hover:text-blue-800 duration-300" /></a>
                  <a href=""><FaGithub className="text-2xl hover:text-green-500 duration-300" /></a>
                </div>
              </div>
            </div>
            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-2 mt-3">Stack Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">report</li>
                <li className="hover:text-white cursor-pointer duration-300">feedback</li>
                <li className="hover:text-white cursor-pointer duration-300">ratings</li>
              </ul>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2 mt-3">Stack Legals</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">Terms & Condition</li>
                <li className="hover:text-white cursor-pointer duration-300">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer duration-300">Refunds and Cancellation</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8 text-md text-gray-400 ">
            © {new Date().getFullYear()} CourseStack. All rights reserved. Developed by Shashank
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
