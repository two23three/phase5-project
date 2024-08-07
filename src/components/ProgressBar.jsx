import React from 'react';

const ProgressBar = ({ label, currentAmount, targetAmount, onUpdate }) => {
  const percentage = (currentAmount / targetAmount) * 100;

  return (
    <div className="p-2 rounded-lg bg-gray-700 mb-2">
      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span className="text-gray-400">
          Ksh {currentAmount.toLocaleString()}/Ksh {targetAmount.toLocaleString()}
        </span>
      </div>
      <div className="bg-gray-600 rounded h-4 overflow-hidden mb-2">
        <div
          className="bg-green-500 h-4 rounded"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
        onClick={onUpdate}
      >
        Update Amount
      </button>
    </div>
  );
};

export default ProgressBar;
