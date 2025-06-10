import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white rounded-t-2xl shadow-inner mt-10">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 px-8 max-w-7xl mx-auto">
        {/* Logo and Socials */}
        <div className="flex flex-col items-center md:items-center">
          <div className="flex items-center gap-3 mb-4">
            <img src='/logo_cs.png' alt='CourseStack Logo' className="w-8 h-8 rounded-full shadow-md" />
            <h1 className=" text-xl sm:text-2xl font-bold">
              <span className='text-white'>Course</span>
              <span className='text-yellow-400'>Stack</span>
            </h1>
          </div>
          <p className="text-sm text-white/80 text-center md:text-left mb-3">Follow Us</p>
          <div className="flex gap-4">
            <a href="#"><FaXTwitter className="text-2xl hover:text-yellow-400 transition" /></a>
            <a href="#"><FaLinkedin className="text-2xl hover:text-yellow-400 transition" /></a>
            <a href="#"><FaGithub className="text-2xl hover:text-yellow-400 transition" /></a>
          </div>
        </div>

        {/* Stack Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3 text-yellow-400">Stack Links</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li className="hover:text-white cursor-pointer transition">Report</li>
            <li className="hover:text-white cursor-pointer transition">Feedback</li>
            <li className="hover:text-white cursor-pointer transition">Ratings</li>
          </ul>
        </div>

        {/* Stack Legals */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3 text-yellow-400">Stack Legals</h3>
          <ul className="space-y-2 text-white/80 text-sm flex flex-col items-center">
            <li className="hover:text-white cursor-pointer transition">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition">Refunds & Cancellation</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-white/70 pb-6 px-4">
        © {new Date().getFullYear()} <span className='font-medium text-white'>Course</span><span className='text-yellow-400 font-semibold'>Stack</span>. All rights reserved. Developed by <span className='text-yellow-400 font-semibold'>Shashank</span>
      </div>
    </footer>
  );
};

export default Footer;
