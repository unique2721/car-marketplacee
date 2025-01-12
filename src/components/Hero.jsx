import React from "react";
import tesla from "../assets/tesla.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white overflow-hidden pt-10">
      <div className="container mx-auto px-6 py-20 lg:py-32 flex flex-col gap-10 lg:flex-row items-center">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Discover Your Dream Car with{" "}
            <span className="text-yellow-300">Ease</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-100">
            Find, compare, and connect with car sellers seamlessly using our
            advanced tools designed for your convenience.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <button className=" text-white px-6 py-3 bg-blue-600 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300">
              Get Started
            </button>
            <Link to={'/about'} className="px-6 py-3 border border-gray-200 text-gray-200 rounded-lg font-semibold hover:bg-gray-100 hover:text-gray-900 hover:scale-105 transition-transform duration-300">
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <div className="relative group">
            {/* Main Image */}
            <img
              src={tesla}
              alt="Car Showcase"
              className="w-full rounded-lg shadow-lg transform transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:rotate-1 group-hover:translate-y-[-10px]"
            />
            {/* Floating Highlights */}
            <div className="absolute top-[-30px] left-[-20px] bg-white text-indigo-600 p-3 rounded-lg shadow-lg">
              <span className="font-bold">New Arrivals!</span>
            </div>
            <div className="absolute bottom-[-30px] right-[-20px] bg-yellow-300 text-gray-900 p-3 rounded-lg shadow-lg">
              <span className="font-bold">Best Deals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-indigo-500 rounded-full opacity-20 blur-3xl absolute top-[-150px] left-[-150px]"></div>
        <div className="w-[400px] h-[400px] bg-blue-500 rounded-full opacity-20 blur-3xl absolute bottom-[-150px] right-[-100px]"></div>
      </div>
    </section>
  );
};

export default Hero;
