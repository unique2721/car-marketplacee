import React from 'react'
import Data from '../Data/Data'
/* react icons */
import { LuFuel } from 'react-icons/lu'
import { RiSpeedUpLine } from "react-icons/ri";
import { BsGearWideConnected } from "react-icons/bs";
import { MdOpenInNew } from "react-icons/md";
import { FaSearch } from 'react-icons/fa';

const Cars = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <h2 className="font-bold text-4xl text-center text-gray-800 my-10">Most Searched Cars</h2>
      
      <div className="flex justify-center items-center mb-10">
        <div className=" flex md:hidden relative w-full max-w-lg">
          <input
            type="text"
            className="w-full px-6 py-3 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none"
            placeholder="Search cars..."
          />
          <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="flex justify-center flex-wrap gap-8 mx-8">
        {Data.Cars.map((car, index) => (
          <div
            key={index}
            className="w-full sm:w-72 md:w-80 lg:w-96 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <img
              src={car.img}
              alt={car.name}
              className="w-full h-56 rounded-t-xl object-cover"
            />
            <div className="p-6">
              <h2 className="text-center font-semibold text-gray-800 text-xl mb-4">{car.name}</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center text-gray-700">
                  <LuFuel className="text-2xl mb-2" />
                  <p className="text-sm font-semibold">Miles</p>
                </div>
                <div className="flex flex-col items-center text-gray-700">
                  <RiSpeedUpLine className="text-2xl mb-2" />
                  <p className="text-sm font-semibold">Speed</p>
                </div>
                <div className="flex flex-col items-center text-gray-700">
                  <BsGearWideConnected className="text-2xl mb-2" />
                  <p className="text-sm font-semibold">Gear</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">1,000,000 ETB</h3>
                <h3 className="text-md text-blue-500 flex items-center gap-2">
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