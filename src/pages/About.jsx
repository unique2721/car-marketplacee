// src/pages/AboutPage.jsx
import React from 'react';
import { FaCar, FaSearch, FaHandshake, FaUsers } from 'react-icons/fa';
/* images */
import user from '../assets/user.jpg'
import Gebremariam from '../assets/Gebremariam.jpg'
/* components */
import Navbar from '../components/Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/car-marketplace-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-lg px-4">
            <h1 className="text-4xl font-bold leading-tight mb-4">Welcome to the Best Car Marketplace</h1>
            <p className="text-lg mb-6">Find your dream car today with ease. Browse through the best car listings, get unbeatable deals, and much more!</p>
            <a href="#features" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300">Discover More</a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-100" id="mission">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">Our mission is to provide a seamless, transparent, and efficient car buying experience for all. Whether you're a first-time buyer or an experienced car enthusiast, we strive to help you find the perfect vehicle at the best price.</p>
          <p className="text-lg text-gray-700">Join us in revolutionizing the car marketplace with cutting-edge technology and a commitment to customer satisfaction.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center justify-center feature-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300">
              <FaSearch className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">Find the perfect car in minutes with advanced search filters.</p>
            </div>
            <div className="flex flex-col items-center justify-center feature-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300">
              <FaCar className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Explore a vast variety of cars from trusted dealers and private sellers.</p>
            </div>
            <div className="flex flex-col items-center justify-centerfeature-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300">
              <FaHandshake className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Deals</h3>
              <p className="text-gray-600">We ensure that every car listed is verified and free from hidden issues.</p>
            </div>
            <div className="flex flex-col items-center justify-center feature-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300">
              <FaUsers className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Join a community of car enthusiasts and buyers who share reviews and tips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200" id="team">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-extrabold text-gray-800 mb-10">
      Meet Our Team
    </h2>
    <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
      Our talented and dedicated team members are the backbone of our success.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {/* Team Member 1 */}
      <div className="team-member text-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
        <img
          src={Gebremariam}
          alt="John Doe"
          className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-1">Gebremariam Kidane</h3>
        <p className="text-blue-600 font-medium mb-3">Founder & CEO</p>
        <p className="text-gray-500 text-sm">
          A visionary leader with a passion for innovation and excellence.
        </p>
      </div>

      {/* Team Member 2 */}
      <div className="team-member text-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
        <img
          src={user}
          alt="Jane Smith"
          className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-1">Yohannes Habtamu</h3>
        <p className="text-blue-600 font-medium mb-3">Chief Technology Officer</p>
        <p className="text-gray-500 text-sm">
          Spearheading cutting-edge technology and ensuring seamless performance.
        </p>
      </div>

      {/* Team Member 3 */}
      <div className="team-member text-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
        <img
          src={user}
          alt="Alex Brown"
          className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-1">Selhadin</h3>
        <p className="text-blue-600 font-medium mb-3">Marketing Lead</p>
        <p className="text-gray-500 text-sm">
          Crafting impactful marketing strategies to reach and engage audiences.
        </p>
      </div>
      {/* Team Member 4 */}
      <div className="team-member text-center bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
        <img
          src={user}
          alt="Alex Brown"
          className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-blue-500"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mb-1">Dibekulu Alene</h3>
        <p className="text-blue-600 font-medium mb-3">Marketing Lead</p>
        <p className="text-gray-500 text-sm">
          Crafting impactful marketing strategies to reach and engage audiences.
        </p>
      </div>
    </div>
  </div>
</section>

      <Footer/>
    </div>
  );
};

export default About;