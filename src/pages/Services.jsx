// src/pages/ServicesPage.jsx
import React from 'react';
import { FaCar, FaTools, FaRegCreditCard, FaRegHandshake } from 'react-icons/fa';
/* images */
import services from '../assets/services.jpg'
/* components */
import Navbar from '../components/Navbar';
import Footer from './Footer';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-cover bg-center" style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)",
      }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-lg px-4">
            <h1 className="text-4xl font-bold leading-tight mb-4">Our Premium Services</h1>
            <p className="text-lg mb-6">Explore the top-quality services we offer to make your car-buying experience exceptional!</p>
            <a href="#services" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300">Explore Services</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white" id="services">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Service 1 */}
            <div className=" flex flex-col justify-center items-center service-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300 cursor-pointer">
              <FaCar className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Car Listings</h3>
              <p className="text-gray-600 mb-4">Browse a wide selection of cars with detailed descriptions, high-quality images, and comprehensive specs.</p>
              <a href="/listings" className="text-blue-600 font-semibold hover:underline">View Listings</a>
            </div>

            {/* Service 2 */}
            <div className="flex flex-col items-center justify-center service-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300 cursor-pointer">
              <FaTools className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Car Repair Services</h3>
              <p className="text-gray-600 mb-4">Get your car in top shape with our trusted repair services. We work with the best mechanics in the industry.</p>
              <a href="/repair-services" className="text-blue-600 font-semibold hover:underline">Learn More</a>
            </div>

            {/* Service 3 */}
            <div className="flex flex-col items-center justify-center service-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300 cursor-pointer">
              <FaRegCreditCard className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Financing Options</h3>
              <p className="text-gray-600 mb-4">Explore flexible financing options tailored to fit your budget. Get approved for your dream car today.</p>
              <a href="/financing" className="text-blue-600 font-semibold hover:underline">Apply Now</a>
            </div>

            {/* Service 4 */}
            <div className="flex flex-col items-center justify-center service-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300 cursor-pointer">
              <FaRegHandshake className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trade-In Services</h3>
              <p className="text-gray-600 mb-4">Trade in your old car and get an excellent deal for your next vehicle. We offer competitive trade-in values.</p>
              <a href="/trade-in" className="text-blue-600 font-semibold hover:underline">Get a Quote</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100" id="testimonials">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Testimonial 1 */}
            <div className="testimonial p-8 bg-white rounded-lg shadow-lg w-80  hover:bg-blue-50 transition duration-300 cursor-pointer">
              <p className="text-gray-600 mb-4">"This platform made buying my car a breeze. The selection was great, and the financing options were perfect for my budget!"</p>
              <p className="font-semibold">John D.</p>
              <p className="text-sm text-gray-500">Satisfied Customer</p>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial p-8 bg-white rounded-lg shadow-lg w-80  hover:bg-blue-50 transition duration-300 cursor-pointer">
              <p className="text-gray-600 mb-4">"The repair service was fast and efficient. My car is running better than ever!"</p>
              <p className="font-semibold">Sarah P.</p>
              <p className="text-sm text-gray-500">Happy Customer</p>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial p-8 bg-white rounded-lg shadow-lg w-80  hover:bg-blue-50 transition duration-300 cursor-pointer">
              <p className="text-gray-600 mb-4">"I was able to trade in my old car for a great value, and the customer service was outstanding!"</p>
              <p className="font-semibold">Michael W.</p>
              <p className="text-sm text-gray-500">Repeat Customer</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Services;