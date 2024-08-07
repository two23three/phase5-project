import React, { useState } from "react";

const SetGoalPopup = ({ onClose, onSave }) => {
  const [goal, setGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    onSave({ goal, goalAmount: parseFloat(goalAmount) });
    setGoal('');
    setGoalAmount('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-300 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Set New Goal</h2>
        <form onSubmit={handleGoalSubmit}>
          <div className="mb-4">
            <label className="block text-gray-900 mb-2 text-left" htmlFor="goal">Goal to attain:</label>
            <input
              className="w-full px-4 py-2 bg-neutral-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="goal"
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900 mb-2 text-left " htmlFor="goalAmount">Amount:</label>
            <input
              className="w-full px-4 py-2 bg-neutral-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="goalAmount"
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
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
