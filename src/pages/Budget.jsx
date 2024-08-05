import React, { useState } from "react";
import SetGoalPopup from "../components/SetGoalPopup";
import AddLoan from "../components/AddLoan";
import AddLimit from "../components/AddLimit";

function Budget() {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const [goals, setGoals] = useState([]);
  const [loans, setLoans] = useState([]);
  const [limits, setLimits] = useState([]);

  const handleSaveGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
    setShowGoalModal(false);
  };

  const handleSaveLoan = (newLoan) => {
    setLoans([...loans, newLoan]);
    setShowLoanModal(false);
  };

  const handleSaveLimit = (newLimit) => {
    setLimits([...limits, newLimit]);
    setShowLimitModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="space-y-8">
        {/* Savings Goals */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Savings goals</h2>
          <div className="space-y-4">
            {goals.map((g, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>{g.goal}</span>
                  <span className="text-green-500">Ksh {g.goalAmount}</span>
                </div>
              </div>
            ))}
            <button
              className="flex items-center bg-gray-700 p-2 rounded-lg w-full justify-center text-gray-400 hover:text-white"
              onClick={() => setShowGoalModal(true)}
            >
              <span className="mr-2">+</span> Set new goal
            </button>
          </div>
        </div>

        {/* Debt Management */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Debt Management</h2>
          <div className="space-y-4">
            {loans.map((l, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>{l.loan}</span>
                  <span className="text-red-500">Ksh {l.loanAmount}</span>
                </div>
              </div>
            ))}
            <button
              className="flex items-center bg-gray-700 p-2 rounded-lg w-full justify-center text-gray-400 hover:text-white"
              onClick={() => setShowLoanModal(true)}
            >
              <span className="mr-2">+</span> Add loan
            </button>
          </div>
        </div>

        {/* Limits */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Limits</h2>
          <div className="space-y-4">
            {limits.map((l, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>{l.limit}</span>
                  <span className="text-yellow-500">Ksh {l.limitAmount}</span>
                </div>
              </div>
            ))}
            <button
              className="flex items-center bg-gray-700 p-2 rounded-lg w-full justify-center text-gray-400 hover:text-white"
              onClick={() => setShowLimitModal(true)}
            >
              <span className="mr-2">+</span> Add limit
            </button>
          </div>
        </div>
      </div>

      {showGoalModal && (
        <SetGoalPopup onClose={() => setShowGoalModal(false)} onSave={handleSaveGoal} />
      )}
      {showLoanModal && (
        <AddLoan onClose={() => setShowLoanModal(false)} onSave={handleSaveLoan} />
      )}
      {showLimitModal && (
        <AddLimit onClose={() => setShowLimitModal(false)} onSave={handleSaveLimit} />
      )}
    </div>
  );
}

export default Budget;
