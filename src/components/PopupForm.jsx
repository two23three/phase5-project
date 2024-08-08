import React from "react";

function PopupForm({ isPopupOpen, handleClose, handlePopupSubmit }) {
  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Contact Us</h2>
        <form onSubmit={handlePopupSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Query Type</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a query type</option>
              <option value="general">General</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
              placeholder="Enter your query"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="py-2 px-4 rounded bg-gray-500 text-white hover:bg-gray-600 transition duration-200"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded bg-green-500 text-white hover:bg-green-600 transition duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
