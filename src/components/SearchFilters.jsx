import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { mockListings } from "../Data/mockData";
import AdvancedFilters from "./filters/AdvancedFilters";

// Get unique makes and models from mockListings
const makes = Array.from(new Set(mockListings.map((car) => car.make)));
const models = Array.from(new Set(mockListings.map((car) => car.model)));

const priceRanges = [
  "Any Price",
  "Under $20,000",
  "$20,000 - $30,000",
  "$30,000 - $40,000",
  "$40,000+",
];

export default function SearchFilters({ setFilterType, filterType }) {
  const [selectedMake, setSelectedMake] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log({});
  };

  const handleApplyAdvancedFilters = (filters) => {
    console.log("Advanced filters:", filters);
    // Implement advanced filter logic
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Any Make</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <select
              value={selectedMake}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Any Model</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <select
              value={selectedMake}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex space-x-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
            <button
              onClick={() => setShowAdvancedFilters(true)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={handleApplyAdvancedFilters}
      />
    </>
  );
}
