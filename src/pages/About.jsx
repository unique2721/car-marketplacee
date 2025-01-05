// src/pages/AboutPage.jsx
import React from 'react';
import { FaCar, FaSearch, FaHandshake, FaUsers } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import user from '../assets/user.jpg'
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
            <div className="feature-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300">
              <FaSearch className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">Find the perfect car in minutes with advanced search filters.</p>
            </div>
            <div className="feature-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300">
              <FaCar className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Explore a vast variety of cars from trusted dealers and private sellers.</p>
            </div>
            <div className="feature-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300">
              <FaHandshake className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Deals</h3>
              <p className="text-gray-600">We ensure that every car listed is verified and free from hidden issues.</p>
            </div>
            <div className="feature-card p-6 bg-gray-50 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300">
              <FaUsers className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
              <p className="text-gray-600">Join a community of car enthusiasts and buyers who share reviews and tips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100" id="team">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="team-member text-center">
              <img src={user} alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="team-member text-center">
              <img src={user} alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Jane Smith</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
            <div className="team-member text-center">
              <img src={user} alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Alex Brown</h3>
              <p className="text-gray-600">Marketing Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white text-center" id="contact">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg mb-6">Have questions or want to learn more about our services? Reach out to us today!</p>
          <a href="mailto:contact@carmarketplace.com" className="px-6 py-3 bg-white text-blue-600 rounded-full hover:bg-gray-200 transition-all duration-300">Contact Us</a>
        </div>
      </section>
    </div>
  );
};

export default About;