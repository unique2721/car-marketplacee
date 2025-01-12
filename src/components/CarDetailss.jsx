import React from 'react';
import { CarListing } from '../types';
import { X, Calendar, MapPin, Gauge, Check, Phone, Mail } from 'lucide-react';


export default function CarDetails({ listing, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {listing.year} {listing.make} {listing.model}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={listing.images[0]}
                  alt={`${listing.make} ${listing.model}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{listing.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {listing.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Price */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">
                  ${listing.price.toLocaleString()}
                </h3>
                <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center mt-4">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Seller
                </button>
                <button className="w-full border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center mt-3">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Seller
                </button>
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
                    <span className="font-medium">{listing.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Location</span>
                    </div>
                    <span className="font-medium">{listing.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}