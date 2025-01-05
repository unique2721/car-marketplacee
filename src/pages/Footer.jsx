// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Car Marketplace</h3>
            <p className="text-gray-400 mb-4">
              The best place to find your dream car, browse listings, and get unbeatable deals from trusted dealers.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Cars for Sale</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter Signup</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates, deals, and more.</p>
            <form className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full sm:w-auto rounded-md text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-gray-400 flex items-center">
                  <FaEnvelope className="mr-2" /> contact@carmarketplace.com
                </p>
              </li>
              <li>
                <p className="text-gray-400">123 Car Street, Auto City, CA</p>
              </li>
              <li>
                <p className="text-gray-400">+1 (800) 123-4567</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; 2025 Car Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;