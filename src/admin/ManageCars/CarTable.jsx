import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const CarTable = ({ cars, onEdit, onDelete }) => {
  return (
    <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Car Model</th>
            <th className="border px-4 py-2">Make</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.make}</td>
              <td className="border px-4 py-2">${car.price}</td>
              <td className="border px-4 py-2 flex space-x-4">
                <button
                  onClick={() => onEdit(car)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(car._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;
