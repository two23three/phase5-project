import React, { useState } from "react";
import SetGoalPopup from "../components/SetGoalPopup";
import AddLoan from "../components/AddLoan";
import AddLimit from "../components/AddLimit";
import ProgressBar from "../components/ProgressBar";
import UpdateAmountPopup from "../components/UpdateAmountPopup";

function Budget() {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updateType, setUpdateType] = useState(null);
  const [updateLabel, setUpdateLabel] = useState('');

  const [goals, setGoals] = useState([]);
  const [loans, setLoans] = useState([]);
  const [limits, setLimits] = useState([]);

  const handleSaveGoal = (newGoal) => {
    setGoals([...goals, { ...newGoal, currentAmount: 0 }]);
    setShowGoalModal(false);
  };

  const handleSaveLoan = (newLoan) => {
    setLoans([...loans, { ...newLoan, currentAmount: 0 }]);
    setShowLoanModal(false);
  };

  const handleSaveLimit = (newLimit) => {
    setLimits([...limits, { ...newLimit, currentAmount: 0 }]);
    setShowLimitModal(false);
  };

  const handleUpdateAmount = (index, type, label) => {
    setUpdateIndex(index);
    setUpdateType(type);
    setUpdateLabel(label);
    setShowUpdateModal(true);
  };

  const updateAmount = (value) => {
    if (updateType === 'goal') {
      const updatedGoals = [...goals];
      updatedGoals[updateIndex].currentAmount += value;
      setGoals(updatedGoals);
    } else if (updateType === 'loan') {
      const updatedLoans = [...loans];
      updatedLoans[updateIndex].currentAmount += value;
      setLoans(updatedLoans);
    } else if (updateType === 'limit') {
      const updatedLimits = [...limits];
      updatedLimits[updateIndex].currentAmount += value;
      setLimits(updatedLimits);
    }
    setShowUpdateModal(false);
  };

  return (
    <div className="min-h-screen text-white p-4" style={{ backgroundColor: '#242424' }}>
      <div className="space-y-8">
        {/* Savings Goals */}
        <div className="p-4 rounded-lg bg-gray-500">
          <h2 className="text-xl font-bold mb-4 text-left">Savings Goals</h2>
          <div className="space-y-4">
            {goals.map((g, index) => (
              <ProgressBar
                key={index}
                label={g.goal}
                currentAmount={g.currentAmount}
                targetAmount={g.goalAmount}
                type="goal"
                onUpdate={() => handleUpdateAmount(index, 'goal', g.goal)}
              />
            ))}
            <button
              className="flex items-center bg-gray-300 p-2 rounded-lg w-full justify-center text-gray-900 hover:text-black"
              onClick={() => setShowGoalModal(true)}
            >
              <span className="mr-2">+</span> Set New Goal
            </button>
          </div>
        </div>

        {/* Debt Management */}
        <div className="p-4 rounded-lg bg-gray-500">
          <h2 className="text-xl font-bold mb-4 text-left">Debt Management</h2>
          <div className="space-y-4">
            {loans.map((l, index) => (
              <ProgressBar
                key={index}
                label={l.loan}
                currentAmount={l.currentAmount}
                targetAmount={l.loanAmount}
                type="loan"
                onUpdate={() => handleUpdateAmount(index, 'loan', l.loan)}
              />
            ))}
            <button
              className="flex items-center bg-gray-300 p-2 rounded-lg w-full justify-center text-gray-900 hover:text-black"
              onClick={() => setShowLoanModal(true)}
            >
              <span className="mr-2">+</span> Add Loan
            </button>
          </div>
        </div>

        {/* Limits */}
        <div className="p-4 rounded-lg bg-gray-500">
          <h2 className="text-xl font-bold mb-4 text-left">Limits</h2>
          <div className="space-y-4">
            {limits.map((l, index) => (
              <ProgressBar
                key={index}
                label={l.limit}
                currentAmount={l.currentAmount}
                targetAmount={l.limitAmount}
                type="limit"
                onUpdate={() => handleUpdateAmount(index, 'limit', l.limit)}
              />
            ))}
            <button
              className="flex items-center bg-gray-300 p-2 rounded-lg w-full justify-center text-gray-900 hover:text-black"
              onClick={() => setShowLimitModal(true)}
            >
              <span className="mr-2">+</span> Add Limit
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
      {showUpdateModal && (
        <UpdateAmountPopup
          onClose={() => setShowUpdateModal(false)}
          onSave={updateAmount}
          label={updateLabel}
        />
      )}
      
    </div>
  );
}

export default Budget;
