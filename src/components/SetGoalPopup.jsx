import React, { useState } from "react";

const SetGoalPopup = ({ onClose, onSave }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleGoalSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString().split('T')[0]; // Formats date as YYYY-MM-DD

    onSave({
      name: goalName,
      target_amount: parseFloat(targetAmount),
      start_date: currentDate,
      current_amount: 0,
      user_id: 25
    });

    setGoalName('');
    setTargetAmount('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-300 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Set New Goal</h2>
        <form onSubmit={handleGoalSubmit}>
          <div className="mb-4">
            <label className="block text-gray-900 mb-2 text-left" htmlFor="goalName">Goal Name:</label>
            <input
              className="w-full px-4 py-2 bg-neutral-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="goalName"
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 mb-2 text-left" htmlFor="targetAmount">Target Amount:</label>
            <input
              className="w-full px-4 py-2 bg-neutral-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="targetAmount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
            type="submit"
          >
            Save Goal
          </button>
          <button
            className="ml-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetGoalPopup;
