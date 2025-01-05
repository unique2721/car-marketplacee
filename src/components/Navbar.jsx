import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNavToggle = () => {
    setNav(!nav);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <a href="/">CarHub</a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-1/2">
          <input
            type="text"
            placeholder="Search Make, Model, Year..."
            className="w-full px-4 py-2 border rounded-l-md focus:outline-none"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-gray-700 items-center">
          <Link to={'/'}  className="hover:text-blue-600">Home</Link>
          <Link to={'/about'} className="hover:text-blue-600">About</Link>
          <Link to={'/services'} className="hover:text-blue-600">Services</Link>
          <Link to={'/contact'} className="hover:text-blue-600">Contact</Link>
          <Link to={'/register'} className="hover:text-blue-600">Register</Link>
          <Link
          to={'/carListing'}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit Listing
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={handleNavToggle}>
            {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {nav && (
        <div className="md:hidden bg-white shadow-md py-4 px-6">
          <div className="flex flex-col gap-4">
            <Link to={'/'} href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to={'/about'} className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to= {"/services"} className="text-gray-700 hover:text-blue-600">
              Services
            </Link>
            <Link to= {"/contact"} className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            <Link to={"/register"} className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
            <Link
              to= {"/carListing"}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Listing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;