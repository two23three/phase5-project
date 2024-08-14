import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

const EditDetailsPopup = ({ onClose }) => {
  const { user, token } = useAuth();
  const API_URL = "api/";

  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : '');
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phone_number);
    }
  }, [user]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhoneNumber = (phoneNumber) => /^(2547\d{8}|07\d{8})$/.test(phoneNumber);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (email && !isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, phone_number: phoneNumber })
      });

      if (!response.ok) {
        throw new Error('Failed to update details');
      }

      setShowSuccessMessage(true);
      setError('');
      
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
        window.location.reload(); 
      }, 3000); 
    } catch (error) {
      console.error('Error changing details:', error);
      setError('An error occurred while changing the details.');
    }
  };


  return (
    <>
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 p- mx-auto mb-3.5">
            <svg
              className="w-20 h-20 text-green-500 animate-checkmark-fade"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-2xl text-gray-500 font-semibold mb-2">Success!</h3>
          <p className="text-sm text-gray-500">Your details have been successfully updated.</p>
        </div>
      </div>
      )}

      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${showSuccessMessage ? 'hidden' : ''}`}>
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <h2 className="text-xl font-bold mb-4 text-gray-200">Edit Details</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="font-customFont block text-sm font-medium text-gray-200">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-customFont mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className=" font-customFont block text-sm font-medium text-gray-200">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-customFont mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-customFont block text-sm font-medium text-gray-200">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="font-customFont mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="py-2 px-4 rounded bg-gray-500 text-white hover:bg-gray-600 transition duration-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 rounded bg-green-500 text-gray-800 hover:bg-green-600 transition duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditDetailsPopup;
