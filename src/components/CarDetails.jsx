import React from 'react';
import { X, Calendar, MapPin, Gauge, Check } from 'lucide-react';

export default function CarDetails({ listing, onClose }) {
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
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-6">
            <img
              src={listing.images[0]}
              alt={`${listing.make} ${listing.model}`}
              className="w-full h-96 object-cover rounded-lg"
            />
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

          <div className="mt-6 flex justify-between items-center">
            <div>
              <span className="text-3xl font-bold text-indigo-600">
                {listing.price.toLocaleString()} ETB
              </span>
            </div>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
