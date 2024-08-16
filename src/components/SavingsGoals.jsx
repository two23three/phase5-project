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
    <div className="p-4 rounded-lg bg-zinc-800">
      <h1 className="text-xl font-bold mb-4 text-left">Savings Goals</h1>
      <div className="space-y-4">
        {goals.map((g, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center">
              <div className="w-full">
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
                  className="bg-gray-300 text-black p-2 rounded-lg self-end"
                >
                  <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                </button>
              </div>
            </div>
            {dropdownOpen === index && (
              <div className="flex space-y-2 mt-2">
                <button
                  onClick={() => handleUpdateAmount(index, 'goal', g.name)}
                  className="bg-blue-900 mr-4 text-semibold block w-full px-3 py-1 rounded-3xl text-xl font-semibold text-center text-gray-100 hover:bg-blue-700"
                >
                  Update Amount
                </button>
                <button
                  onClick={() => handleDelete(index, 'goal')}
                  className="bg-red-900 mr-4 text-semibold block w-full text-xl font-semibold text-center px-4 py-2 rounded-3xl  text-gray-100 hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => openMpesaModal(g.name)}
                  className="bg-white text-green-700 font-bold hover:bg-neutral-400 transition duration-200 block w-full text-xl text-centerpx-4 py-3 px-2 rounded-3xl "
                >
                  Save with ‎ ‎ ‎ M-Pesa
                </button>
              </div>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div className="mt-4">
            <button
              className="flex items-center p-1 rounded-lg w-auto justify-center text-gray-900 hover:text-black"
              onClick={() => setShowGoalModal(true)}
            >
              <span className="bg-gray-300 mr-2 rounded-full p-1">
                <FontAwesomeIcon icon={faPlus} />
              </span>
              <span className="text-white">Set New Goal</span>
            </button>
          </div>
        </div>
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
