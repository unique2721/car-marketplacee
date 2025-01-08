import React, { useState } from "react";
import Navbar from "./Navbar";

const CarListing = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    brand: "",
    year: "",
    bodyType: "",
    fuel: "",
    mileage: "",
    model: "",
    transmission: "",
    color: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.title) formErrors.title = "Title is required";
    if (!formData.description)
      formErrors.description = "Description is required";
    if (!formData.location) formErrors.location = "Location is required";
    if (!formData.brand) formErrors.brand = "Brand is required";
    if (!formData.year) formErrors.year = "Year is required";
    if (!formData.bodyType) formErrors.bodyType = "Body Type is required";
    if (!formData.fuel) formErrors.fuel = "Fuel Type is required";
    if (!formData.mileage) formErrors.mileage = "Mileage is required";
    if (!formData.model) formErrors.model = "Model is required";
    if (!formData.transmission)
      formErrors.transmission = "Transmission is required";
    if (!formData.color) formErrors.color = "Color is required";

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Car listing submitted successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          brand: "",
          year: "",
          bodyType: "",
          fuel: "",
          mileage: "",
          model: "",
          transmission: "",
          color: "",
        });
      }, 2000);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-16">
      <Navbar />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Submit Car Listing
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-semibold"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Dropdown for Brand */}
          <div>
            <label
              htmlFor="brand"
              className="block text-gray-700 font-semibold"
            >
              Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Brand</option>
              <option value="Toyota">Toyota</option>
              <option value="BMW">BMW</option>
              <option value="Audi">Audi</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Honda">Honda</option>
            </select>
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
            )}
          </div>

          {/* Dropdown for Year */}
          <div>
            <label htmlFor="year" className="block text-gray-700 font-semibold">
              Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              {[...Array(30)].map((_, index) => {
                const year = 2025 - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year}</p>
            )}
          </div>

          {/* Dropdown for Body Type */}
          <div>
            <label
              htmlFor="bodyType"
              className="block text-gray-700 font-semibold"
            >
              Body Type
            </label>
            <select
              id="bodyType"
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Body Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
            </select>
            {errors.bodyType && (
              <p className="text-red-500 text-sm mt-1">{errors.bodyType}</p>
            )}
          </div>

          {/* Dropdown for Fuel */}
          <div>
            <label htmlFor="fuel" className="block text-gray-700 font-semibold">
              Fuel Type
            </label>
            <select
              id="fuel"
              name="fuel"
              value={formData.fuel}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.fuel && (
              <p className="text-red-500 text-sm mt-1">{errors.fuel}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="mileage"
              className="block text-gray-700 font-semibold"
            >
              Mileage
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mileage && (
              <p className="text-red-500 text-sm mt-1">{errors.mileage}</p>
            )}
          </div>

          {/* Dropdown for Model */}
          <div>
            <label
              htmlFor="model"
              className="block text-gray-700 font-semibold"
            >
              Model
            </label>
            <select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Model</option>
              <option value="Model X">Model X</option>
              <option value="Model Y">Model Y</option>
              <option value="Model Z">Model Z</option>
            </select>
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">{errors.model}</p>
            )}
          </div>

          {/* Dropdown for Transmission */}
          <div>
            <label
              htmlFor="transmission"
              className="block text-gray-700 font-semibold"
            >
              Transmission
            </label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
            {errors.transmission && (
              <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>
            )}
          </div>

          {/* Dropdown for Color */}
          <div>
            <label
              htmlFor="color"
              className="block text-gray-700 font-semibold"
            >
              Color
            </label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
            </select>
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">{errors.color}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarListing;
