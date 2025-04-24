import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export async function AddCar(car) {
  const res = await axios.post(`${API_URL}/api/car/add`, car);
  return res.data;
}
export async function GetCars() {
  const res = await axios.get(`${API_URL}/api/car/`);
  return res.data;
}
