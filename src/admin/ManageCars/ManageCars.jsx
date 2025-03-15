import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import Data from "../../Data/Data";
import Layout from "./Layout";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock Car Data
  useEffect(() => {
    setCars(Data.Cars);
  }, []);

  // Filter cars based on search input
  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle View Action
  const handleView = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  // Handle Edit Action
  const handleEdit = (car) => {
    // For now, we just log it. You could add an edit form here.
    console.log("Editing car", car);
  };

  // Handle Delete Action
  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter((car) => car.id !== carId));
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manage Cars</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Car
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        {/* Cars Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">Image</th>
                <th className="p-3">Car Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Year</th>
                <th className="p-3">Color</th>
                <th className="p-3">Fuel</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car) => (
                <tr key={car.id} className="border-t">
                  <td className="p-3">
                    <img src={car.img} alt={car.name} className="w-16 h-10 object-cover rounded" />
                  </td>
                  <td className="p-3">{car.name}</td>
                  <td className="p-3">${car.price}</td>
                  <td className="p-3">{car.year}</td>
                  <td className="p-3">{car.color}</td>
                  <td className="p-3">{car.fuel}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-white ${car.status === "Available" ? "bg-green-500" : "bg-red-500"}`}>
                      {car.status}
                    </span>
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleView(car)}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      onClick={() => handleEdit(car)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(car.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal (For Viewing Car Details) */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Car Details</h3>
            <p><strong>Car Name:</strong> {selectedCar.name}</p>
            <p><strong>Price:</strong> ${selectedCar.price}</p>
            <p><strong>Year:</strong> {selectedCar.year}</p>
            <p><strong>Color:</strong> {selectedCar.color}</p>
            <p><strong>Fuel:</strong> {selectedCar.fuel}</p>
            <p><strong>Status:</strong> {selectedCar.status}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageCars;
