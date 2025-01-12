import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { Car, MessageSquare } from "lucide-react";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import ProfileDropdown from "./common/ProfileDropdown";

const Navbar = ({ children }) => {
  const [nav, setNav] = useState(false);

  const handleNavToggle = () => {
    setNav(!nav);
  };

  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className=" flex gap-2 text-2xl font-bold text-blue-600">
          <Car className="h-8 w-8 text-blue-700" />
          <Link to={"/"}>CarHub</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-[35%]">
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
          <Link to={"/"} className=" text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to={"/about"} className=" text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link to={"/services"} className=" text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link to={"/contact"} className=" text-gray-700 hover:text-blue-600">
            Contact
          </Link>
          {/* <Link to={"/register"} className="hover:text-blue-600 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
            Register
          </Link> */}

          <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
            {user?.role === "seller" && (
              <Link
                to={"/my-listings"}
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                My Listings
              </Link>
            )}
            <Link
              to={"/messages"}
              className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
            >
              Messages
            </Link>
            <div className="flex items-center space-x-4">
              {user && (
                <button className="text-gray-600 hover:text-gray-900">
                  <MessageSquare className="h-6 w-6" />
                </button>
              )}
              <ProfileDropdown
                onLoginClick={handleLoginClick}
                onRegisterClick={handleRegisterClick}
              />
            </div>
          </div>

          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onSwitchToRegister={() => {
              setShowLoginModal(false);
              setShowRegisterModal(true);
            }}
          />

          <RegisterModal
            isOpen={showRegisterModal}
            onClose={() => setShowRegisterModal(false)}
            onSwitchToLogin={() => {
              setShowRegisterModal(false);
              setShowLoginModal(true);
            }}
          />

          {user && (
            <Link
              to={"/carListing"}
              className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </Link>
          )}
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
            <Link to={"/"} className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to={"/about"} className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link
              to={"/services"}
              className="text-gray-700 hover:text-blue-600"
            >
              Services
            </Link>
            <Link to={"/contact"} className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
            {/* <Link
              to={"/register"}
              className="text-gray-700 hover:text-blue-600"
            >
              Register
            </Link> */}
            <div className="sm:ml-6 flex flex-col space-y-4">
              {user?.role === "seller" && (
                <Link
                  to={"/my-listings"}
                  className="text-gray-700 hover:text-blue-600"
                >
                  My Listings
                </Link>
              )}
              <div className="flex justify-between items-center">
                <Link
                  to={"/messages"}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Messages
                </Link>

                <ProfileDropdown
                  onLoginClick={handleLoginClick}
                  onRegisterClick={handleRegisterClick}
                />
              </div>

              {user && (
                <Link
                  to={"/carListing"}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full text-center font-bold"
                >
                  Sell Your Car
                </Link>
              )}
            </div>

            <LoginModal
              isOpen={showLoginModal}
              onClose={() => setShowLoginModal(false)}
              onSwitchToRegister={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }}
            />

            <RegisterModal
              isOpen={showRegisterModal}
              onClose={() => setShowRegisterModal(false)}
              onSwitchToLogin={() => {
                setShowRegisterModal(false);
                setShowLoginModal(true);
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
