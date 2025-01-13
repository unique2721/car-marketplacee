import React, { useState } from "react";
import { mockListings } from "../Data/mockData";
import { Check, Search } from "lucide-react";
import Navbar from "../components/Navbar";

export default function ComparisonPage({ listing, onClose }) {
  const [car1, setCar1] = useState(null);
  const [car2, setCar2] = useState(null);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const filteredCars1 = mockListings.filter((car) =>
    `${car.make} ${car.model} ${car.year}`
      .toLowerCase()
      .includes(search1.toLowerCase())
  );

  const filteredCars2 = mockListings.filter((car) =>
    `${car.make} ${car.model} ${car.year}`
      .toLowerCase()
      .includes(search2.toLowerCase())
  );

  const selectCar1 = (car) => {
    setCar1(car);
    setSearch1(`${car.year} ${car.make} ${car.model}`);
    setShowDropdown1(false);
  };

  const selectCar2 = (car) => {
    setCar2(car);
    setSearch2(`${car.year} ${car.make} ${car.model}`);
    setShowDropdown2(false);
  };

  /* images */
  const handleNextImage = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === car1.images.length - 1 ? 0 : prevIndex + 1
      );
      setIsSliding(false);
    }, 300); // Duration matches the CSS animation
  };

  const handlePrevImage = () => {
    if (isSliding) return;
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? car1.images.length - 1 : prevIndex - 1
      );
      setIsSliding(false);
    }, 300); // Duration matches the CSS animation
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-24">
        <h1 className="text-3xl font-bold mb-8">Compare Cars</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Car Selection 1 */}
          <div className="space-y-2 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search first car..."
                value={search1}
                onChange={(e) => {
                  setSearch1(e.target.value);
                  setShowDropdown1(true);
                }}
                onFocus={() => setShowDropdown1(true)}
                className="w-full p-2 pl-8 border rounded"
              />
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {showDropdown1 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCars1.map((car) => (
                  <div
                    key={car.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectCar1(car)}
                  >
                    {car.year} {car.make} {car.model}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Car Selection 2 */}
          <div className="space-y-2 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search second car..."
                value={search2}
                onChange={(e) => {
                  setSearch2(e.target.value);
                  setShowDropdown2(true);
                }}
                onFocus={() => setShowDropdown2(true)}
                className="w-full p-2 pl-8 border rounded"
              />
              <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {showDropdown2 && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredCars2.map((car) => (
                  <div
                    key={car.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectCar2(car)}
                  >
                    {car.year} {car.make} {car.model}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comparison Content */}
          {(car1 || car2) && (
            <>
              {/* Image Carousel with Animation */}
              <div className="mt-6 relative overflow-hidden">
                <div
                  className="flex transition-transform duration-300"
                  style={{
                    transform: `translateX(-${currentImageIndex * 100}%)`,
                  }}
                >
                  {car1.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${car1.make} ${car1.model}`}
                      className="w-full h-96 object-cover flex-shrink-0"
                    />
                  ))}
                </div>
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

              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {car1.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${car1.make} ${car1.model}`}
                    className="w-full h-96 object-cover flex-shrink-0"
                  />
                ))}
                ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Select a car
                </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">
                  {car1
                    ? `${car1.year} ${car1.make} ${car1.model}`
                    : "Select a car"}
                </h3>
                {car1 && (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-indigo-600">
                      ${car1.price.toLocaleString()}
                    </p>
                    <p>Mileage: {car1.mileage.toLocaleString()} miles</p>
                    <p>Location: {car1.location}</p>
                  </div>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">
                  {car2
                    ? `${car2.year} ${car2.make} ${car2.model}`
                    : "Select a car"}
                </h3>
                {car2 && (
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-indigo-600">
                      ${car2.price.toLocaleString()}
                    </p>
                    <p>Mileage: {car2.mileage.toLocaleString()} miles</p>
                    <p>Location: {car2.location}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                {car1 && (
                  <ul className="space-y-2">
                    {car1.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                {car2 && (
                  <ul className="space-y-2">
                    {car2.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
