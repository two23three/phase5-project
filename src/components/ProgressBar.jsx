import React from 'react';

const ProgressBar = ({ label, currentAmount, targetAmount, onUpdate, type }) => {
  const percentage = (currentAmount / targetAmount) * 100;

  let barColor;
  switch (type) {
    case 'goal':
      barColor = 'bg-green-500';
      break;
    case 'loan':
      barColor = 'bg-red-500';
      break;
    case 'limit':
      barColor = 'bg-orange-500';
      break;
    default:
      barColor = 'bg-gray-500';
  }

  return (
    <div className="p-2 rounded-lg bg-gray-700 mb-2">
      <div className="mb-2 flex justify-between">
        <div className="text-gray-400 font-bold text-left">{label}</div>
      </div>
      <div className="bg-gray-600 rounded h-4 overflow-hidden mb-2">
        <div
          className={`${barColor} h-4 rounded`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-gray-400 text-right mb-2">
        Ksh {currentAmount.toLocaleString()} / Ksh {targetAmount.toLocaleString()}
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
