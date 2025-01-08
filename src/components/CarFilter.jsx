import React, { useState } from "react";

const carData = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    fuel: "Petrol",
    color: "Red",
    year: 2020,
    transmission: "Automatic",
    bodyType: "Sedan",
    price: 20000,
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    fuel: "Diesel",
    color: "Black",
    year: 2018,
    transmission: "Manual",
    bodyType: "Hatchback",
    price: 15000,
  },
  {
    id: 3,
    brand: "Ford",
    model: "Focus",
    fuel: "Petrol",
    color: "Blue",
    year: 2019,
    transmission: "Automatic",
    bodyType: "Sedan",
    price: 18000,
  },
  {
    id: 4,
    brand: "BMW",
    model: "3 Series",
    fuel: "Petrol",
    color: "White",
    year: 2021,
    transmission: "Automatic",
    bodyType: "Coupe",
    price: 35000,
  },
];

const CarFilter = () => {
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    fuel: "",
    color: "",
    year: "",
    transmission: "",
    bodyType: "",
    priceRange: [0, 50000],
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      priceRange: value.split(",").map(Number),
    }));
  };

  // Filter the cars based on selected filters
  const filteredCars = carData.filter((car) => {
    const {
      brand,
      model,
      fuel,
      color,
      year,
      transmission,
      bodyType,
      priceRange,
    } = filters;

    return (
      (brand === "" || car.brand.toLowerCase().includes(brand.toLowerCase())) &&
      (model === "" || car.model.toLowerCase().includes(model.toLowerCase())) &&
      (fuel === "" || car.fuel.toLowerCase().includes(fuel.toLowerCase())) &&
      (color === "" || car.color.toLowerCase().includes(color.toLowerCase())) &&
      (year === "" || car.year === parseInt(year)) &&
      (transmission === "" ||
        car.transmission.toLowerCase().includes(transmission.toLowerCase())) &&
      (bodyType === "" ||
        car.bodyType.toLowerCase().includes(bodyType.toLowerCase())) &&
      car.price >= priceRange[0] &&
      car.price <= priceRange[1]
    );
  });

  return (
    <div className=" mt-10 bg-gray-50 py-12 px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Car Search</h2>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Brand
            </label>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Brand</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Ford">Ford</option>
              <option value="BMW">BMW</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Model
            </label>
            <select
              name="model"
              value={filters.model}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Model</option>
              <option value="Camry">Camry</option>
              <option value="Civic">Civic</option>
              <option value="Focus">Focus</option>
              <option value="3 Series">3 Series</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Fuel
            </label>
            <select
              name="fuel"
              value={filters.fuel}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Color
            </label>
            <select
              name="color"
              value={filters.color}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Color</option>
              <option value="Red">Red</option>
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Year
            </label>
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              <option value="2020">2020</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Transmission
            </label>
            <select
              name="transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Body Type
            </label>
            <select
              name="bodyType"
              value={filters.bodyType}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Body Type</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Price Range
            </label>
            <select
              name="priceRange"
              value={filters.priceRange.join(",")}
              onChange={handlePriceChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0,50000">Any Price</option>
              <option value="0,10000">Under $10,000</option>
              <option value="10000,20000">$10,000 - $20,000</option>
              <option value="20000,30000">$20,000 - $30,000</option>
              <option value="30000,50000">$30,000 - $50,000</option>
            </select>
          </div>
          <button class="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none">
            Search
          </button>
        </div>

        {/* Car Results Section */}
        {/*    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No cars found</div>
          ) : (
            filteredCars.map((car) => (
              <div key={car.id} className="bg-white p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
                <p>Fuel: {car.fuel}</p>
                <p>Color: {car.color}</p>
                <p>Year: {car.year}</p>
                <p>Transmission: {car.transmission}</p>
                <p>Body Type: {car.bodyType}</p>
                <p>Price: ${car.price}</p>
              </div>
            ))
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CarFilter;
