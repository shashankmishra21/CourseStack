import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import { ToastContainer } from 'react-toastify';
import Courses from "./Pages/Courses";
import PurchaseCourse from "./Pages/PurchaseCourse";
import Purchases from "./Pages/Purchases";
import Dashboard from './Pages/Dashboard';
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/preview-course" element={<Courses />} />
        <Route path="/buy-course" element={<PurchaseCourse />} />
        <Route path="/purchases" element={<Purchases />} />

        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default App
