import React, { useState, useEffect } from 'react';

const EditDetailsPopup = ({ isOpen, onClose, userDetails = {}, onSave }) => {
  const [name, setName] = useState(userDetails.name || '');
  const [email, setEmail] = useState(userDetails.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber || '');

  useEffect(() => {
    // Update local state when userDetails prop changes
    setName(userDetails.name || '');
    setEmail(userDetails.email || '');
    setPhoneNumber(userDetails.phoneNumber || '');
  }, [userDetails]);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    // Call onSave with updated details
    onSave({ name, email, phoneNumber });
    onClose(); // Close the popup after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Edit Details</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 transition duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDetailsPopup;
