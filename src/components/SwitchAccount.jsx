import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

function SwitchAccount() {
  const [showSwitchPopup, setShowSwitchPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSwitching, setIsSwitching] = useState(false);
  const { user, updateUserRole } = useAuth(); // Use updateUserRole instead of setUser
  const navigate = useNavigate();

  const handleSwitchRole = async () => {
    setIsSwitching(true); // Set button text to "Switching..."
    setErrorMessage(''); // Clear previous errors

    try {
      const newRoleId = user.role_id === 1 ? 2 : 1;
      await updateUserRole(user.id, newRoleId); // Update the role using the provided function

      // Show success message
      setShowSuccessMessage(true);

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorMessage('Could not switch account, try again later.');
      console.error('Error switching account type:', error);
    } finally {
      setIsSwitching(false);
      setShowSwitchPopup(false);
    }
  };

  return (
    <div>
      <button
        className="w-full flex items-center text-left text-white py-2 px-4 rounded bg-gray-800 hover:bg-gray-700"
        onClick={() => setShowSwitchPopup(true)}
      >
        <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        Switch Account Type
      </button>

      {showSwitchPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-black">
            {errorMessage && (
              <div className="text-red-500 mb-4">{errorMessage}</div>
            )}
            <p>Are you sure you want to<br />Switch Account Type?</p>
            <div className="flex space-x-4 mt-4">
              <button
                className={`bg-red-500 text-white px-4 py-2 rounded ${isSwitching ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={handleSwitchRole}
                disabled={isSwitching}
              >
                {isSwitching ? 'Switching...' : 'Yes'}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowSwitchPopup(false)}
                disabled={isSwitching}
              >
                No
              </button>
            </div>
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
            <p className="text-sm text-gray-500">
              Account type switched to {user.role_id === 2 ? 'Business' : 'Personal'}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwitchAccount;
