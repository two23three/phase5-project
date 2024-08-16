// SuccessMessage.js
import React from 'react';

const SuccessMessage = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
      <div className="bg-white p-6 rounded shadow-lg text-black">
        <div className="w-20 h-20 rounded-full bg-green-100 mx-auto mb-3.5">
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
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
