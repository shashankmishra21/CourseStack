import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import { ToastContainer } from 'react-toastify';
<ToastContainer position="top-right" autoClose={3000} hideProgressBar />
import Courses from "./Pages/Courses";
import PurchaseCourse from "./Pages/PurchaseCourse";
// import Purchases from "./Pages/Purchases";
import Dashboard from './Pages/Dashboard';
import "react-toastify/dist/ReactToastify.css";
import CreatorSignup from './Pages/CreatorSignup';
import CreatorSignin from './Pages/CreatorSignin';
import CreateCourse from './Pages/CreateCourse';
import UpdateCourse from './Pages/UpdateCourse';
import CreatorDashboard from './Pages/CreatorDashboard';


function App() {

  return (
    <div>
      <Routes>
        {/* learner */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/preview-course" element={<Courses />} />
        <Route path="/buy-course" element={<PurchaseCourse />} />
        {/* <Route path="/purchases" element={<Purchases />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* creator */}
        <Route path="/creator/signin" element={<CreatorSignin />} />
        <Route path="/creator/signup" element={<CreatorSignup />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/update-course/:id" element={<UpdateCourse />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />

      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default App
