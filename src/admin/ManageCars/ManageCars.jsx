import React, { useEffect, useState } from 'react';
import CarTable from './CarTable';
import CarForm from './CarForm';
import { FaPlusCircle } from 'react-icons/fa';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);

  useEffect(() => {
    // Fetch all cars when the component mounts
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleAddCar = () => {
    setCarToEdit(null);  // Reset any car being edited
    setShowForm(true);    // Show the form to add a new car
  };

  const handleEditCar = (car) => {
    setCarToEdit(car);    // Set car details to be edited
    setShowForm(true);    // Show the form for editing
  };

  const handleCloseForm = () => {
    setShowForm(false);  // Close the form
    setCarToEdit(null);   // Reset the car being edited
  };

  const handleDeleteCar = async (carId) => {
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCars();  // Refresh the car list after deletion
      } else {
        alert("Failed to delete car.");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800">Manage Cars</h2>

      <button
        onClick={handleAddCar}
        className="mt-4 mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
      >
        <FaPlusCircle />
        <span>Add New Car</span>
      </button>

      {showForm && (
        <CarForm
          carToEdit={carToEdit}
          onClose={handleCloseForm}
          onSuccess={fetchCars}
        />
      )}

      <CarTable cars={cars} onEdit={handleEditCar} onDelete={handleDeleteCar} />
    </div>
  );
};

export default ManageCars;
