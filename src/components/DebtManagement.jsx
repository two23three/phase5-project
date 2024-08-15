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
    <div className="p-4 rounded-lg bg-gray-500">
      <h2 className="text-xl font-bold mb-4 text-left">Debt Management</h2>
      <div className="space-y-4">
        {loans.map((l, index) => (
          <div key={index} className="flex justify-between items-center relative">
            <div>
              <h3 className="font-bold text-lg">{l.name}</h3>
              <p>User ID: {l.user_id}</p>
              <p>Start Date: {l.due_date}</p>
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
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
              </button>
              {dropdownOpen === index && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded z-10">
                  <button
                    onClick={() => handleUpdateAmount(index, 'loan', l.name)}
                    className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                  >
                    Update Amount
                  </button>
                  <button
                    onClick={() => handleDelete(index, 'loan')}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                  {/* Assuming you have a way to handle M-Pesa for loans similarly */}
                  <button
                    onClick={() => console.log('Add funds via M-Pesa for loan', l.name)}
                    className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-100"
                  >
                    Add funds via M-Pesa
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          className="flex items-center bg-gray-300 p-2 rounded-lg w-full justify-center text-gray-900 hover:text-black"
          onClick={() => setShowLoanModal(true)}
        >
          <span className="mr-2">+</span> Add Loan
        </button>
      </div>
    </div>
  );
};

export default DebtManagement;