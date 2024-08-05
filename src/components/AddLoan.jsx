import React, { useState } from "react";

const AddLoan = ({ onClose, onSave }) => {
  const [loan, setLoan] = useState('');
  const [loanAmount, setLoanAmount] = useState('');

  const handleLoanSubmit = (e) => {
    e.preventDefault();
    onSave({ loan, loanAmount });
    setLoan('');
    setLoanAmount('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add New Loan</h2>
        <form onSubmit={handleLoanSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="loan">Loan</label>
            <input
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="loan"
              type="text"
              value={loan}
              onChange={(e) => setLoan(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="loanAmount">Amount</label>
            <input
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Save Loan
          </button>
          <button
            className="ml-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLoan;
