import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

const filterSections = {
  vehicleDetails: {
    title: 'Vehicle Details',
    options: ['New', 'Used', 'Certified Pre-Owned']
  },
  transmission: {
    title: 'Transmission',
    options: ['Automatic', 'Manual', 'CVT', 'Dual-Clutch']
  },
  fuelType: {
    title: 'Fuel Type',
    options: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid']
  },
  bodyStyle: {
    title: 'Body Style',
    options: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Wagon', 'Convertible']
  },
  features: {
    title: 'Features',
    options: [
      'Air Conditioning',
      'Bluetooth',
      'Navigation',
      'Leather Seats',
      'Sunroof',
      'Backup Camera',
      'Heated Seats',
      'Apple CarPlay',
      'Android Auto',
      'Lane Departure Warning'
    ]
  },
  safety: {
    title: 'Safety Features',
    options: [
      'ABS',
      'Airbags',
      'Stability Control',
      'Blind Spot Monitor',
      'Forward Collision Warning',
      'Parking Sensors'
    ]
  }
};

export default function AdvancedFilters({ isOpen, onClose, onApplyFilters }) {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (section, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [section]: prev[section]
        ? prev[section].includes(value)
          ? prev[section].filter(v => v !== value)
          : [...prev[section], value]
        : [value]
    }));
  };

  const handleApply = () => {
    onApplyFilters(selectedFilters);
    onClose();
  };

  const handleClear = () => {
    setSelectedFilters({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        <div className="relative bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto z-50">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900">Advanced Filters</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(filterSections).map(([key, section]) => (
              <div key={key} className="space-y-3">
                <h4 className="font-medium text-gray-900">{section.title}</h4>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters[key]?.includes(option) || false}
                        onChange={() => handleFilterChange(key, option)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleClear}
              className="text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Clear All
            </button>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}