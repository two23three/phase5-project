import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

function SwitchAccount() {
  const [showLogoutPopup, setShowSwitchPopup] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const API_URL = "api/"; // Replace with your actual API URL

  const handleSwitchRole = async () => {
    try {
      // Determine the new role
      const newRoleId = user.role_id === 1 ? 2 : 1;

      // Send the PUT request to update the role
      const response = await fetch(`${API_URL}users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Assuming you have a token
        },
        body: JSON.stringify({ role_id: newRoleId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      const updatedUser = await response.json();

      // Update the user in AuthContext
      setUser(updatedUser);

      // Reload the page to reflect the new role
      window.location.reload();
    } catch (error) {
      console.error('Error switching account type:', error);
    } finally {
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

      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-black">
            <p>Are you sure you want to<br />Switch Account Type?</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleSwitchRole}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowSwitchPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SwitchAccount;
