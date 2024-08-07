import React, { useState } from "react";
import SetGoalPopup from "../components/SetGoalPopup";
import AddLoan from "../components/AddLoan";
import AddLimit from "../components/AddLimit";
import ProgressBar from "../components/ProgressBar

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
    <div className="min-h-screen  text-white p-4" style={{ backgroundColor: '#242424' }}>
      <div className="space-y-8">
        {/* Savings Goals */}
        <div className="p-4 rounded-lg bg-gray-500">
          <h2 className="text-xl font-bold mb-4 text-left">Savings goals</h2>
          <div className="space-y-4">
            {goals.map((g, index) => (
              <div key={index} className=" p-2 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>{g.goal}</span>
                  <span className="text-green-500">Ksh {g.goalAmount}</span>
                </div>
              </div>
            ))}
            <button
              className="flex items-center bg-gray-300 p-2 rounded-lg w-full justify-center text-gray-900 hover:text-black"
              onClick={() => setShowGoalModal(true)}
            >
              <span className="mr-2">+</span> Set new goal
            </button>
          </div>
        </div>

        {/* Debt Management */}
        <div className="p-4 rounded-lg bg-gray-500">
          <h2 className="text-xl font-bold mb-4 text-left">Debt Management</h2>
          <div className="space-y-4">
            {loans.map((l, index) => (
              <div key={index} className="p-2 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>{l.loan}</span>
                  <span className="text-red-500">Ksh {l.loanAmount}</span>
                </div>
              </div>
            ))}
            <button
              className="flex items-center bg-gray-300 p-2 rounded-lg w-full justify-center text-gray-900 hover:text-black "
              onClick={() => setShowLoanModal(true)}
            >
              <span className="mr-2">+</span> Add loan
            </button>
          </div>
        </div>

        {/* Limits */}
        <div className="p-4 rounded-lg bg-gray-500">
          <h2 className="text-xl font-bold mb-4 text-left">Limits</h2>
          <div className="space-y-4">
            {limits.map((l, index) => (
              <div key={index} className="p-2 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>{l.limit}</span>
                  <span className="text-yellow-500">Ksh {l.limitAmount}</span>
                </div>
              </div>
            ))}
            <button
              className="flex items-center bg-gray-300 p-2 rounded-lg w-full justify-center text-gray-900 hover:text-black"
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
