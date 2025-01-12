import React, { useState } from "react";
import { X, Calendar, MapPin, Gauge, Check, Phone, Mail } from "lucide-react";

export default function CarDetails({ listing, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const handleNextImage = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
      );
      setIsSliding(false);
    }, 300); // Duration matches the CSS animation
  };

  const handlePrevImage = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
      );
      setIsSliding(false);
    }, 300); // Duration matches the CSS animation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">
              {listing.year} {listing.make} {listing.model}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Image Carousel with Animation */}
          <div className="mt-6 relative overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {listing.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${listing.make} ${listing.model}`}
                  className="w-full h-96 object-cover flex-shrink-0"
                />
              ))}
            </div>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              ❮
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              ❯
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{listing.year}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Gauge className="h-5 w-5 mr-2" />
              <span>{listing.mileage.toLocaleString()} miles</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{listing.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <ul className="grid grid-cols-2 gap-2">
              {listing.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-indigo-600 mb-2">
              ${listing.price.toLocaleString()}
            </h3>
            <button className="w-full border border-indigo-600 order-transparent text-base font-medium rounded-md text-white   text-md bg-blue-600 hover:bg-blue-700 py-3 px-6 transition-colors flex items-center justify-center mt-3">
              <Phone className="h-5 w-5 mr-2" />
              Contact Seller
            </button>
            <button className="w-full border border-indigo-600 order-transparent text-base font-medium rounded-md text-white   text-md bg-blue-600 hover:bg-blue-700 py-3 px-6 transition-colors flex items-center justify-center mt-3">
              <Mail className="h-5 w-5 mr-2" />
              Email Seller
            </button>
          </div> */}

          <div className="mt-6 flex justify-between items-center">
            <div>
              <span className="text-3xl font-bold text-indigo-600">
                {listing.price.toLocaleString()} ETB
              </span>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white   text-md bg-blue-600 hover:bg-blue-700 ">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
