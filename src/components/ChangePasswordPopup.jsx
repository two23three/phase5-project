import React, { useState } from 'react';
import { useAuth } from './AuthProvider'; 

const ChangePasswordPopup = ({ onClose }) => {
  const { user, token } = useAuth();
  const [showFirstPopup, setShowFirstPopup] = useState(true);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  const [error, setError] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [retypeNewPasswordVisible, setRetypeNewPasswordVisible] = useState(false);
  const API_URL = "api/";

  const handleFirstPopupSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      setError('User information is not available.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, password: currentPassword })
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate current password');
      }

      const data = await response.json();
      if (data.msg === 'Login successful') {
        setShowFirstPopup(false); 
        setShowSecondPopup(true); 
        setError('');
      } else {
        setError('Current password is incorrect.');
      }
    } catch (error) {
      console.error('Error during password validation:', error);
      setError('An error occurred while validating the password.');
    }
  };

  const handleSecondPopupSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== retypeNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword })
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }

      setShowSecondPopup(false);
      setError('');
      setShowSuccessMessage(true); 

      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose(); 
      }, 3000); 
    } catch (error) {
      console.error('Error changing password:', error);
      setError('An error occurred while changing the password.');
    }
  };

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleRetypeNewPasswordVisibility = () => {
    setRetypeNewPasswordVisible(!retypeNewPasswordVisible);
  };

  return (
    <>
      {showFirstPopup && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className=" relative bg-white shadow dark:bg-gray-800 sm:p-5 rounded-lg p-6 ">
            <h2 className=" font-customFont border-gray-300 text-xl font-bold mb-4 ">Change Password</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleFirstPopupSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-customFont border-gray-300 text-left" htmlFor="currentPassword">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={currentPasswordVisible ? 'text' : 'password'}
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="border border-gray-300 bg-white font-customFont 00 text-black rounded w-full p-2"
                  />
                  <span
                    onClick={toggleCurrentPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                  >
                    {currentPasswordVisible ? 'Hide' : 'Show'}
                  </span>
                </div>
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
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSecondPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="relative bg-white shadow dark:bg-gray-800 sm:p-5 rounded-lg  p-6">
            <h2 className="font-customFont text-xl font-bold mb-4 text-gray-200">Update Password</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSecondPopupSubmit}>
              <div className="mb-4">
                <label className="font-customFont block mb-1 text-gray-200 text-left" htmlFor="newPassword">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={newPasswordVisible ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="font-customFont border border-gray-300 bg-white text-black rounded w-full p-2"
                  />
                  <span
                    onClick={toggleNewPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                  >
                    {newPasswordVisible ? 'Hide' : 'Show'}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <label className="font-customFont border-gray-300 block mb-1  text-gray-200 text-left" htmlFor="retypeNewPassword">
                  Retype New Password
                </label>
                <div className="relative">
                  <input
                    type={retypeNewPasswordVisible ? 'text' : 'password'}
                    id="retypeNewPassword"
                    value={retypeNewPassword}
                    onChange={(e) => setRetypeNewPassword(e.target.value)}
                    required
                    className="font-customFont border border-gray-300 bg-white text-black rounded w-full p-2"
                  />
                  <span
                    onClick={toggleRetypeNewPasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                  >
                    {retypeNewPasswordVisible ? 'Hide' : 'Show'}
                  </span>
                </div>
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          <p className="text-sm text-gray-500">Your Password have been successfully updated.</p>
        </div>
      </div>
      )}
    </>
  );
};

export default ChangePasswordPopup;
