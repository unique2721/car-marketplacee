import React, { useState } from "react";
import { X, Calendar, MapPin, Gauge, Check, Phone, Mail } from "lucide-react";
import CarGrid from "./CarGrid";
import { mockListings } from "../Data/mockData";

export default function CarDetails({ listing, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageIndexes, setImageIndexes] = useState({});
  const [isSliding, setIsSliding] = useState(false);
  const [compareListing, setCompareListing] = useState(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const handleNextImage = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1,
      );
      setIsSliding(false);
    }, 300); // Duration matches the CSS animation
  };

  const handlePrevImage = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1,
      );
      setIsSliding(false);
    }, 300); // Duration matches the CSS animation
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const getCurrentImageIndex = (carId) => imageIndexes[carId] ?? 0;

  const updateImageIndex = (carId, direction, imageCount) => {
    setImageIndexes((prev) => {
      const currentIndex = prev[carId] ?? 0;
      const nextIndex =
        direction === "next"
          ? (currentIndex + 1) % imageCount
          : (currentIndex - 1 + imageCount) % imageCount;

      return {
        ...prev,
        [carId]: nextIndex,
      };
    });
  };

  /* CAR COMPARISON */
  const handleSelectCompareCar = (carId) => {
    const selectedCar = mockListings.find((c) => c.id === carId);
    if (selectedCar) {
      setCompareListing(selectedCar);
      setShowCompareModal(false);
    }
  };

  const [selectedListing, setSelectedListing] = useState(null);

  const handleViewDetails = (id) => {
    setSelectedListing(id);
  };

  const selectedCar = mockListings.find(
    (listing) => listing.id === selectedListing,
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
                      index !== currentImageIndex ? "opacity-80 blur-sm" : ""
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

              <div className="space-y-3">
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Compare This Car
                </button>
                {compareListing && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowCompareModal(true)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md"
                      >
                        Compare with another
                      </button>
                      <button
                        onClick={() => setCompareListing(null)}
                        className="flex-1 bg-red-100 text-red-700 py-2 rounded-md"
                      >
                        Clear Comparison
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
                      listings={mockListings.filter((c) => c.id !== listing.id)}
                      itemsPerPage={6}
                      onViewDetails={(id) => handleSelectCompareCar(id)}
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
                    className=" mt-4 w-[80%] bg-red-600 text-white py-2 px-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {/* Comparison display (side-by-side) */}
            {compareListing && (
              <div className="col-span-full mt-6">
                <h3 className="text-xl font-bold mb-4">Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: current listing */}
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="relative overflow-hidden rounded-lg bg-gray-100">
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                          transform: `translateX(-${getCurrentImageIndex(listing.id) * 100}%)`,
                        }}
                      >
                        {listing.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${listing.make} ${listing.model}`}
                            className="w-full h-48 object-cover flex-shrink-0"
                          />
                        ))}
                      </div>

                      {listing.images.length > 1 && (
                        <>
                          <button
                            onClick={() => updateImageIndex(listing.id, "prev", listing.images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full"
                          >
                            ❮
                          </button>
                          <button
                            onClick={() => updateImageIndex(listing.id, "next", listing.images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full"
                          >
                            ❯
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {listing.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  setImageIndexes((prev) => ({ ...prev, [listing.id]: index }))
                                }
                                className={`h-2 w-2 rounded-full ${
                                  getCurrentImageIndex(listing.id) === index
                                    ? "bg-white"
                                    : "bg-white/60"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mt-2">{listing.year} {listing.make} {listing.model}</h4>
                    <p className="text-indigo-600 font-bold">{listing.price.toLocaleString()} ETB</p>
                    <p>Mileage: {listing.mileage.toLocaleString()} miles</p>
                    <p>Location: {listing.location}</p>
                    <h5 className="mt-3 font-medium">Features</h5>
                    <ul className="list-disc list-inside">
                      {listing.features.map((f) => (<li key={f}>{f}</li>))}
                    </ul>
                  </div>

                  {/* Right: compareListing */}
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="relative overflow-hidden rounded-lg bg-gray-100">
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                          transform: `translateX(-${getCurrentImageIndex(compareListing.id) * 100}%)`,
                        }}
                      >
                        {compareListing.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${compareListing.make} ${compareListing.model}`}
                            className="w-full h-48 object-cover flex-shrink-0"
                          />
                        ))}
                      </div>

                      {compareListing.images.length > 1 && (
                        <>
                          <button
                            onClick={() => updateImageIndex(compareListing.id, "prev", compareListing.images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full"
                          >
                            ❮
                          </button>
                          <button
                            onClick={() => updateImageIndex(compareListing.id, "next", compareListing.images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full"
                          >
                            ❯
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {compareListing.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  setImageIndexes((prev) => ({ ...prev, [compareListing.id]: index }))
                                }
                                className={`h-2 w-2 rounded-full ${
                                  getCurrentImageIndex(compareListing.id) === index
                                    ? "bg-white"
                                    : "bg-white/60"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold mt-2">{compareListing.year} {compareListing.make} {compareListing.model}</h4>
                    <p className="text-indigo-600 font-bold">{compareListing.price.toLocaleString()} ETB</p>
                    <p>Mileage: {compareListing.mileage.toLocaleString()} miles</p>
                    <p>Location: {compareListing.location}</p>
                    <h5 className="mt-3 font-medium">Features</h5>
                    <ul className="list-disc list-inside">
                      {compareListing.features.map((f) => (<li key={f}>{f}</li>))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
