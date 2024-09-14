import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      setError("");
      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between px-6 md:px-12 py-4 border-b bg-gray-100 shadow-md'>
        <h1 className='text-lg md:text-xl font-extrabold'>Blogger</h1>
        <div className='flex space-x-4'>
          <h3>
            <Link to='/' className='font-bold text-gray-700 hover:text-red-500'>
              Home
            </Link>
          </h3>
          <h3>
            <Link
              to='/login'
              className='font-bold text-gray-700 hover:text-red-500'
            >
              Login
            </Link>
          </h3>
        </div>
      </div>

      <div className='flex justify-center items-center h-[70vh] px-4 md:px-0'>
        <div className='flex flex-col justify-center items-center space-y-6 w-full md:w-[30%]'>
          <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-6 text-center'>
              Join Blogger
            </h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black'
              type='text'
              placeholder='Enter your username'
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black'
              type='email'
              placeholder='Enter your email'
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black'
              type='password'
              placeholder='Enter your password'
            />
            <button
              onClick={handleRegister}
              className='w-full px-4 py-2 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Register
            </button>
            {error && (
              <p className='text-red-500 text-sm text-center mt-4'>{error}</p>
            )}
            <div className='text-center mt-4'>
              <p className='text-gray-700'>Already a user?</p>
              <Link
                to='/login'
                className='text-blue-600 font-semibold hover:text-red-700'
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
