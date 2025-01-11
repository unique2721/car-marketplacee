import React, { useState } from "react";
import { Calendar, MapPin, Gauge } from "lucide-react";
import { MdOpenInNew } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

export default function CarCard({ listing, onViewDetails }) {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer group relative ">
      <div
        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-red-100 transition-all duration-300"
        onClick={() => toggleFavorite(listing.id)}
      >
        {favorites.includes(listing.id) ? (
          <AiFillHeart className="text-red-500 text-xl" />
        ) : (
          <AiOutlineHeart className="text-gray-500 text-xl" />
        )}
      </div>
      <img
        src={listing.images[0]}
        alt={`${listing.make} ${listing.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {listing.year} {listing.make} {listing.model}
        </h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {listing.location}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            {listing.year}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Gauge className="h-4 w-4 mr-2" />
            {listing.mileage.toLocaleString()} miles
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center gap-4">
          <span className="text-2xl font-bold text-indigo-600">
            {listing.price.toLocaleString()} ETB
          </span>
          <h3
            onClick={() => onViewDetails(listing.id)}
            className="text-md bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md flex items-center gap-2"
          >
            View Details <MdOpenInNew/>
          </h3>
        </div>
      </div>
    </div>
  );
}
