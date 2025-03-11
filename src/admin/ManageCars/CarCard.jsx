import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 w-64">
      <img
        src={car.image || '/default-car-image.jpg'}
        alt={car.model}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{car.model}</h3>
      <p className="text-sm text-gray-500">{car.make} | {car.year}</p>
      <p className="text-lg font-bold text-gray-800">${car.price}</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
