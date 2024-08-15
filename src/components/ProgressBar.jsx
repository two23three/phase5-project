import React from 'react';

const ProgressBar = ({ label, current_amount, target_amount, type }) => {
  const percentage = (current_amount / target_amount) * 100;

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
    <div className="p-2 rounded-lg bg-zinc-800 mb-2">
      <div className="mb-2 flex justify-between">
        <div className="text-gray-100 font-bold text-left">{label}</div>
      </div>
      <div className="bg-gray-600 rounded h-4 overflow-hidden mb-2">
        <div
          className={`${barColor} h-4 rounded`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-gray-100 text-right mb-2">
        Ksh {current_amount.toLocaleString()} / Ksh {target_amount.toLocaleString()}
      </div>
    </div>
  );
};

export default ProgressBar;