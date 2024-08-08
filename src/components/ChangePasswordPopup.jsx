import React, { useState } from "react";

const ChangePasswordPopup = ({ onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== retypeNewPassword) {
      setError("New password does not match.");
      return;
    }
    onSubmit(currentPassword, newPassword);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-black">Change Password</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-black text-left" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="border border-gray-300 bg-white text-black rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black text-left" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border border-gray-300 bg-white text-black rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black text-left" htmlFor="retypeNewPassword">
              Retype New Password
            </label>
            <input
              type="password"
              id="retypeNewPassword"
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
              required
              className="border border-gray-300 bg-white text-black rounded w-full p-2"
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
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
