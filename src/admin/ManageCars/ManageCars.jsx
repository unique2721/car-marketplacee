import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiEye, FiX } from "react-icons/fi";
import { FaPhone, FaEnvelope, FaUser } from "react-icons/fa";
import Data from "../../Data/Data";
import Layout from "./Layout";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCar, setEditCar] = useState(null);
  let [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCars(Data.Cars);
  }, []);

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (car) => {
    setSelectedCar(car);
    setShowModal(true);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < selectedCar.images.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : selectedCar.images.length - 1
    );
  };

  const handleEdit = (car) => {
    setIsEditing(true);
    setEditCar(car);
  };

  const handleSaveEdit = () => {
    setCars(cars.map((car) => (car.id === editCar.id ? editCar : car)));
    setIsEditing(false);
    setEditCar(null);
  };

  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setCars(cars.filter((car) => car.id !== carId));
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manage Cars</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Car
          </button>
        </div>

        <input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

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
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleView(car)}>
                      <FiEye />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-800" onClick={() => handleEdit(car)}>
                      <FiEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(car.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Car Details</h3>
            <img src={selectedCar.images[currentImageIndex]} alt="Car" className="w-full h-48 object-cover rounded mb-2" />
            <div className="flex justify-between">
              <button onClick={handlePrevImage} className="px-4 py-2 bg-gray-600 text-white rounded-lg">Prev</button>
              <button onClick={handleNextImage} className="px-4 py-2 bg-gray-600 text-white rounded-lg">Next</button>
            </div>
            <p><strong>Name:</strong> {selectedCar.name}</p>
            <p><strong>Price:</strong> ${selectedCar.price}</p>
            <p><strong>Year:</strong> {selectedCar.year}</p>
            <p><strong>Color:</strong> {selectedCar.color}</p>
            <p><strong>Fuel:</strong> {selectedCar.fuel}</p>
            <p><strong>Status:</strong> {selectedCar.status}</p>
            <button onClick={() => setShowModal(false)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ManageCars;
