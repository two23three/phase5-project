import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DebtManagement = ({ loans, handleUpdateAmount, handleDelete, setShowLoanModal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(-1);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? -1 : index);
  };

  return (
    <div className="p-4 rounded-lg bg-zinc-800">
      <h1 className="text-xl font-bold mb-4 text-left">Debt Management</h1>
      <div className="space-y-4">
        {loans.map((l, index) => (
          <div key={index} className="flex justify-between items-center relative">
            <div className="w-full">
              <ProgressBar
                key={index}
                label={l.name}
                current_amount={parseInt(l.principal_amount - l.remaining_balance)}
                target_amount={parseInt(l.principal_amount)}
                type="loan"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleDropdown(index)}
                className="bg-gray-300 text-black p-2 rounded-lg self-end"
              >
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {dropdownOpen === index && (
                <div className="flex flex-col space-y-2 mt-2">
                  <button
                    onClick={() => handleUpdateAmount(index, 'loan', l.name)}
                    className="bg-blue-900 block w-full text-left px-4 py-2 rounded-3xl text-sm text-gray-100 hover:bg-blue-700"
                  >
                    Update Amount
                  </button>
                  <button
                    onClick={() => handleDelete(index, 'loan')}
                    className="bg-red-900 block w-full text-left px-4 py-2 rounded-3xl text-sm text-gray-100 hover:bg-red-700"
                  >
                    Delete
                  </button>
                  {/* Assuming you have a way to handle M-Pesa for loans similarly
                  <button
                    onClick={() => console.log('Add funds via M-Pesa for loan', l.name)}
                    className="bg-lime-700  block w-full text-left px-4 py-2 rounded-3x1 text-sm text-gray-100 hover:bg-lime-600"
                  >
                    Add funds via M-Pesa
                  </button>
                  */}
                </div>
              )}
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div className="mt-4">
            <button
              className="flex items-center p-1 rounded-lg w-auto justify-center text-gray-900 hover:text-black"
              onClick={() => setShowLoanModal(true)}
            >
              <span className="bg-gray-300 mr-2 rounded-full p-1">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className="text-white">Add Loan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtManagement;