import React, { useState, useEffect } from "react";
import SetGoalPopup from "../components/SetGoalPopup";
import AddLoan from "../components/AddLoan";
import AddLimit from "../components/AddLimit";
import ProgressBar from "../components/ProgressBar";
import UpdateAmountPopup from "../components/UpdateAmountPopup";
import Navbar from "../components/Navbar";

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


  useEffect(() => {
    fetch("https://barnes.onrender.com/savings")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let goalFilter = data.savings_goals.filter(goal => goal.user_id === 25)
        setGoals(goalFilter);
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);
  console.log(goals)


  const save = goals.map((goal, index)=>{
    console.log(goal)
    console.log(index)
  } )
  console.log(save)

  const handleSaveGoal = async (newGoal) => {
    console.log('Saving goal:', newGoal);

    try {
      const response = await fetch('https://barnes.onrender.com/savings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();

      setGoals(prevGoals => [...prevGoals, { ...newGoal, current_amount: 0 }]);
      setShowGoalModal(false);

    } catch (error) {
      console.error('Error saving new goal:', error);
    }
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
      let current = parseInt(updatedGoals[updateIndex].current_amount)
      current += parseInt(value);
      updatedGoals[updateIndex].current_amount = current
      console.log(updatedGoals[updateIndex].current_amount)
      setGoals(updatedGoals);

    } else if (updateType === 'loan') {
      const updatedLoans = [...loans];
      updatedLoans[updateIndex].current_amount += parseInt(value);
      setLoans(updatedLoans);
    } else if (updateType === 'limit') {
      const updatedLimits = [...limits];
      updatedLimits[updateIndex].current_amount += parseInt(value);
      setLimits(updatedLimits);
    }
    setShowUpdateModal(false);
  };

  return (
    <div className="rounded-b-xl p-4 text-white " style={{ backgroundColor: '#242424' }}>
      <div className="space-y-8">
        {/* Savings Goals */}
        <div className="p-4 rounded-lg bg-gray-500">
          <h2 className="text-xl font-bold mb-4 text-left">Savings Goals</h2>
          <div className="space-y-4">
            {goals.map((g, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg">{g.name}</h3>
                <p>User ID: {g.user_id}</p>
                <p>Start Date: {g.start_date}</p>
                <ProgressBar
                  label={g.name}
                  current_amount={parseInt(g.current_amount)}
                  target_amount={parseInt(g.target_amount)}
                  type="goal"
                  onUpdate={() => handleUpdateAmount(index, 'goal', g.name)}
                />
              </div>
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
                current_amount={l.current_amount}
                target_amount={l.loanAmount}
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
                current_amount={l.current_amount}
                target_amount={l.limitAmount}
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
      <Navbar />
    </div>
  );
}

export default Budget;
