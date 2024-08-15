import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MpesaPopup from "../components/MpesaPopUp";

const SavingsGoals = ({ goals, handleUpdateAmount, handleDelete, setShowGoalModal }) => {
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [selectedGoalName, setSelectedGoalName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(-1);

  const openMpesaModal = (goalName) => {
    setSelectedGoalName(goalName);
    setShowMpesaModal(true);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? -1 : index);
  };

  return (
    <div className="p-4 rounded-lg bg-gray-500">
      <h2 className="text-xl font-bold mb-4 text-left">Savings Goals</h2>
      <div className="space-y-4">
        {goals.map((g, index) => (
          <div key={index} className="flex justify-between items-center relative">
            <div>
              <h3 className="font-bold text-lg">{g.name}</h3>
              <p>Start Date: {g.start_date}</p>
              <ProgressBar
                label={g.name}
                current_amount={parseInt(g.current_amount)}
                target_amount={parseInt(g.target_amount)}
                type="goal"
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
                    onClick={() => handleUpdateAmount(index, 'goal', g.name)}
                    className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
                  >
                    Update Amount
                  </button>
                  <button
                    onClick={() => handleDelete(index, 'goal')}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openMpesaModal(g.name)}
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
          onClick={() => setShowGoalModal(true)}
        >
          <span className="mr-2">+</span> Set New Goal
        </button>
      </div>

      {showMpesaModal && (
        <MpesaPopup
          goalName={selectedGoalName}
          onClose={() => setShowMpesaModal(false)}
        />
      )}
    </div>
  );
};

export default SavingsGoals;