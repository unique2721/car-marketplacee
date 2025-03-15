import React, { useState } from "react";
import { X, Calendar, MapPin, Gauge, Check, Phone, Mail } from "lucide-react";
import CarGrid from "./CarGrid";
import { mockListings } from "../Data/mockData";


export default function CarDetails({ listing, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [compareListing, setCompareListing] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

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

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  /* CAR COMPARISON */
  const handleSelectCompareCar = (carId) => {
    const selectedCar = listing.find((car) => car.id === carId);
    setCompareListing(selectedCar);
    setShowCompareModal(false);
  };

  const [selectedListing, setSelectedListing] = useState(null);

  const handleViewDetails = (id) => {
    setSelectedListing(id);
  };

  const selectedCar = mockListings.find(
    (listing) => listing.id === selectedListing
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* left column */}
            <div>
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

              {/* Thumbnails */}
              <div className="flex mt-4 gap-2">
                {listing.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`h-16 w-16 object-cover border-2 rounded ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-200"
                    } cursor-pointer ${
                      index !== currentImageIndex ? "opacity-50 blur-sm" : ""
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>

              {/* description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{listing.description}</p>
              </div>
              {/* Features */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="grid grid-cols-2 gap-6">
                  {listing.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Price */}
              <div className="bg-gray-50 py-6 rounded-lg">
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">
                  {listing.price.toLocaleString()} ETB
                </h3>
                <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center mt-4">
                  <Phone className="h-5 w-5 mr-2" />
                  <a href="tel:+251912345678">Call Seller</a>
                </button>
                <h1 className=" font-bold text-center py-4 text-blue-700 text-2xl">
                  Or Contact Seller Via
                </h1>
                <div className="flex justify-center items-center flex-wrap gap-2">
                  <button className="flex justify-center flex-wrap items-center border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors">
                    {" "}
                    Email
                  </button>
                  <button className="flex justify-center flex-wrap items-center border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors">
                    Telegram
                  </button>
                  <button className="flex justify-center flex-wrap items-center border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors">
                    Facebook
                  </button>
                  <button className="flex justify-center flex-wrap items-center border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors">
                    Instagram
                  </button>
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Year</span>
                    </div>
                    <span className="font-medium">{listing.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Gauge className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Mileage</span>
                    </div>
                    <span className="font-medium">
                      {listing.mileage.toLocaleString()} miles
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Location</span>
                    </div>
                    <span className="font-medium">{listing.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Color</span>
                    </div>
                    <span className="font-medium">{listing.color}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Fuel</span>
                    </div>
                    <span className="font-medium">{listing.fuel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Transmission</span>
                    </div>
                    <span className="font-medium">{listing.transmission}</span>
                  </div>
                </div>
              </div>

              {/* Compare Button */}
              {/* {renderCarDetails(listing)}

              {compareListing && (
                <>
                  <hr className="my-6 border-gray-200" />
                  {renderCarDetails(compareListing)}
                </>
              )} */}

              <button
                onClick={() => setShowCompareModal(true)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Compare This Car
              </button>
            </div>
            {/* car comparison */}
            {showCompareModal && (
              <div className=" absolute top-12  bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className=" relative  bg-white rounded-lg p-6 w-full max-w-lg overflow-hidden max-h-[90vh]">
                  <h2 className="text-lg font-bold my-4 text-center">
                    Select a Car to Compare
                  </h2>
                  <div className="max-h-[70vh] overflow-y-auto">
                    <CarGrid
                      listings={mockListings}
                      itemsPerPage={6}
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                  {/*  <ul>
                    <li
                      key={listing.id}
                      className="p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectCompareCar(listing.id)}
                    >
                      {listing.year} {listing.make} {listing.model}
                    </li>
                  </ul> */}
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="mt-4 w-full bg-red-600 text-white py-2 px-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
