import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

const MpesaPopup = ({ goalName, onClose }) => {
  const { user, token } = useAuth();
  const API_URL = "api/m/stk_push";

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const isValidAmount = (amount) => /^\d+(\.\d{1,2})?$/.test(amount);

  const handleMpesaSubmit = async (e) => {
    e.preventDefault();

    if (!isValidAmount(amount)) {
      setError('Please enter a valid amount.');
      return;
    }

    const paymentData = {
      user_id: user.id,
      amount: parseFloat(amount),
      goal_name: goalName,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      setShowSuccessMessage(true);
      setError('');

      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
        window.location.reload(); 
      }, 7000);
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('An error occurred while initiating the payment.');
    }
  };

  return (
    <>
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
          <div className="relative sm:p-5 bg-white p-6 rounded shadow-lg text-center">
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
            <h3 className="text-4xl text-gray-700 font-semibold mb-2">Success!</h3>
            <p className="text-2xl m-4 text-gray-600">Payment has been successfully initiated, to finalize, kindly enter your M-Pesa pin on your phone.</p>
          </div>
        </div>
      )}

      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${showSuccessMessage ? 'hidden' : ''}`}>
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <h2 className="text-xl font-bold mb-4 font-customFont ">M-Pesa Payment</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleMpesaSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-customFont mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-black placeholder-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter amount"
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

export default MpesaPopup;
