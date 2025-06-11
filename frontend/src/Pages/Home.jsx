import { Link, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhyChooseCourseStack from "../components/WhyChooseCourseStack";
import SuccessStories from "../components/SuccessStories";
import Dashboard from "./Dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactUs from "../components/ContactUs";
import { BACKEND_URL } from "../utils/util";

const Home = () => {

  const navigate = useNavigate();

const handleGoToDashboard = () => {
  const learnerToken = localStorage.getItem('token');
  const creatorToken = localStorage.getItem('creatorToken');

  if (learnerToken) {
    navigate('/Dashboard');
  } else if (creatorToken) {
    navigate('/creator-dashboard');
  } else {
    toast.warning("Please sign in first to access your Dashboard!");
  }
};



  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/preview`,
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
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-6 mb-6 text-gray-700">
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
              <button
                onClick={handleGoToDashboard}
                className="bg-purple-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-md transition hover:bg-purple-800 "
              >
                My Dashboard
              </button>
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
        <div className="relative bg-white/40 backdrop-blur-md rounded-2xl border border-purple-100 shadow-lg w-80 h-[480px] flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">

          {/* Image */}
          <img
            className="h-48 w-full object-cover rounded-t-2xl border-b border-purple-200"
            src={course.image?.url || "/placeholder.jpg"}
            alt={course.title || "Course Image"}
          />

          {/* Content */}
          <div className="p-5 text-center flex flex-col justify-between flex-1">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-purple-800 leading-snug">{course.title}</h2>
              <p className="text-sm text-gray-700 overflow-hidden text-ellipsis line-clamp-3 h-[60px]">
                {course.description}
              </p>
              <div className="text-yellow-600 font-bold text-lg">₹{course.price}</div>
            </div>

            <button className="mt-4 bg-yellow-300 text-purple-900 font-semibold py-2 px-6 rounded-full hover:bg-yellow-400 transition duration-300 shadow-md">
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

        <scction>
          <ContactUs/>
        </scction>

        {/* footer */}

        <Footer />

      </div>
    </div>
  )
}

export default Home
