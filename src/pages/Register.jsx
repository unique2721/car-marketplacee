import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import car from '../assets/car.jpg'
import services from '../assets/services.jpg'
const Register = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // State to handle validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // Handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate input fields
  const validate = () => {
    let valid = true;
    let newErrors = { name: '', email: '', phone: '', password: '' };

    // Name validation for Sign Up
    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Phone number validation for Sign Up
    if (isSignUp && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    } else if (!/\d/.test(formData.password) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number and one special character';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Toggle between Sign Up and Sign In
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setErrors({ name: '', email: '', phone: '', password: '' }); // Reset errors when switching forms
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isSignUp) {
        console.log('Sign Up data:', formData);
      } else {
        console.log('Sign In data:', formData);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="flex max-w-5xl w-full bg-white p-8 border rounded-lg shadow-lg">
        {/* Left Side (Form) */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field for Sign Up */}
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 text-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Phone Number Field for Sign Up */}
            {isSignUp && (
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
                <div className="mt-1 relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`block w-full px-4 py-2 text-gray-900 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full px-4 py-2 text-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            {/* Sign In or Sign Up Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none transition duration-300"
                disabled={Object.values(errors).some((error) => error)}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Side (Car Image) */}
        <div className="hidden lg:block lg:w-1/2 pl-8">
          <img
            src={services}
            alt="Car"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
