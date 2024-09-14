import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='bg-black text-white'>
      <div className='w-full px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8'>
        {/* Featured Blogs Section */}
        <div className='flex flex-col space-y-2'>
          <p className='font-semibold'>Featured Blogs</p>
          <Link to='#' className='hover:text-green-500'>
            Most Viewed
          </Link>
          <Link to='#' className='hover:text-green-500'>
            Readers Choice
          </Link>
        </div>

        {/* Forum and Support Section */}
        <div className='flex flex-col space-y-2'>
          <p className='font-semibold'>Forum</p>
          <Link to='#' className='hover:text-green-500'>
            Forum Home
          </Link>
          <Link to='#' className='hover:text-green-500'>
            Support
          </Link>
          <Link to='#' className='hover:text-green-500'>
            Recent Posts
          </Link>
        </div>

        {/* Policies and About Us Section */}
        <div className='flex flex-col space-y-2'>
          <p className='font-semibold'>Legal</p>
          <Link to='#' className='hover:text-green-500'>
            Privacy Policy
          </Link>
          <Link to='#' className='hover:text-green-500'>
            About Us
          </Link>
          <Link to='#' className='hover:text-green-500'>
            Terms & Conditions
          </Link>
          <Link to='#' className='hover:text-green-500'>
            Terms of Service
          </Link>
        </div>
      </div>

      <p className='py-2 text-center text-sm bg-black text-white'>
        All rights reserved @BLOGGER INC 2023
      </p>
    </div>
  );
};

export default Footer;
