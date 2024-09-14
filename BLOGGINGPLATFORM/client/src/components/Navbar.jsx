import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className='flex flex-col md:flex-row items-center justify-between px-6 md:px-[200px] py-4 bg-gray-100 shadow-md'>
      {/* Logo */}
      <h1 className='text-lg md:text-xl font-extrabold'>
        <Link to='#' className='text-gray-800 hover:text-red-500'>
          BLOGGER
        </Link>
      </h1>

      {/* Search Bar */}
      {path === "/" && (
        <div className='flex items-center space-x-2 md:space-x-4 bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm'>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className='outline-none px-3 py-1 w-48 md:w-64'
            placeholder='Search a post'
            type='text'
            aria-label='Search'
          />
          <button
            onClick={() => navigate(prompt ? `?search=${prompt}` : "/")}
            className='bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 flex items-center'
            aria-label='Search'
          >
            <BsSearch />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <div className='hidden md:flex items-center space-x-4'>
        {user ? (
          <>
            <Link to='/' className='font-bold text-gray-800 hover:text-red-500'>
              HOME
            </Link>
            <Link
              to='/write'
              className='font-bold text-gray-700 hover:text-red-500'
            >
              WRITE
            </Link>
            <Link
              to={`/profile/${user._id}`}
              className='font-bold text-gray-700 hover:text-red-500'
            >
              PROFILE
            </Link>
            <div className='relative'>
              <button
                onClick={showMenu}
                className='font-bold text-gray-700 hover:text-red-500'
              >
                MORE OPTIONS
              </button>
              {menu && <Menu />}
            </div>
          </>
        ) : (
          <>
            <Link
              to='/login'
              className='font-bold text-gray-700 hover:text-red-500'
            >
              Login
            </Link>
            <Link
              to='/register'
              className='font-bold text-gray-700 hover:text-red-500'
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div onClick={showMenu} className='md:hidden text-lg'>
        <button className='flex items-center text-gray-700 hover:text-red-500'>
          MORE OPTIONS
        </button>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
