import React, { useState } from 'react';
import Data from '../Data/Data';
/* React icons */
import { LuFuel } from 'react-icons/lu';
import { RiSpeedUpLine } from 'react-icons/ri';
import { BsGearWideConnected } from 'react-icons/bs';
import { MdOpenInNew } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Cars = () => {
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite status
  const toggleFavorite = (carId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(carId)
        ? prevFavorites.filter((id) => id !== carId)
        : [...prevFavorites, carId]
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-16">
      <h2 className="font-extrabold text-4xl text-center text-gray-800 mb-10">
        Most Searched Cars
      </h2>

      {/* Search Bar */}
      <div className="flex md:hidden justify-center items-center mb-10">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full px-6 py-3 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Search cars..."
          />
          <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Car Cards */}
      <div className="flex justify-center flex-wrap gap-8 mx-4">
        {Data.Cars.map((car, index) => (
          <div
            key={index}
            className="w-full sm:w-72 md:w-80 lg:w-96 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-xl cursor-pointer group relative"
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
            <div
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-red-100 transition-all duration-300"
              onClick={() => toggleFavorite(car.id)}
            >
              {favorites.includes(car.id) ? (
                <AiFillHeart className="text-red-500 text-xl" />
              ) : (
                <AiOutlineHeart className="text-gray-500 text-xl" />
              )}
            </div>
            <img
              src={car.img}
              alt={car.name}
              className="w-full h-56 rounded-t-xl object-cover group-hover:brightness-90 transition-all duration-300"
            />
            <div className="p-6">
              <h2 className=" font-semibold text-gray-800 text-xl mb-4">
                {car.name}
                <h2>location goes here</h2>
              </h2>
              <div className=" flex flex-col justify-center items-center mb-6">
                <div className='flex space-x-28 mb-2'>
                <div className="flex justify-center items-center gap-2 text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                  <LuFuel className="text-2xl mb-2" />
                  <p className="text-sm font-semibold">Miles</p>
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                  <RiSpeedUpLine className="text-2xl mb-2" />
                  <p className="text-sm font-semibold">Speed</p>
                </div>
                </div>

                <div className='flex space-x-28 mb-2'>
                <div className="flex justify-center items-center gap-2 text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                  <BsGearWideConnected className="text-2xl mb-2" />
                  <p className="text-sm font-semibold">Gear</p>
                </div>
                <div className="flex justify-center items-center gap-2 text-gray-700 group-hover:text-blue-500 transition-colors duration-300">
                  <BsGearWideConnected className="text-2xl mb-2" />
                  <p className="text-sm font-semibold">Diesel</p>
                </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  1,000,000 ETB
                </h3>
                <h3 className="text-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                  View Details <MdOpenInNew />
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
