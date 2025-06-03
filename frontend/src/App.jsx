import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default App
