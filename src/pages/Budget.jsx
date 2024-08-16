import React, { useState, useEffect } from "react";
import SetGoalPopup from "../components/SetGoalPopup";
import AddLoan from "../components/AddLoan";
import AddLimit from "../components/AddLimit";
import ProgressBar from "../components/ProgressBar";
import UpdateAmountPopup from "../components/UpdateAmountPopup";
import { useAuth } from "../components/AuthProvider";
import Navbar from "../components/Navbar";
import DebtManagement from "../components/DebtManagement";
import SavingsGoals from "../components/SavingsGoals";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const {getUserId} = useAuth();
  const userID = getUserId();

  // Fetch savings
  useEffect(() => {
    fetch("https://barnes.onrender.com/savings")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        let goalFilter = data.savings_goals.filter(goal => goal.user_id === userID);
        setGoals(goalFilter);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  // Persist changes to savings goals
  useEffect(() => {
    if (goals.length > 0) {
      const updatedGoal = goals[updateIndex];
      if (updatedGoal) {
        const { id, current_amount } = updatedGoal;
        fetch(`https://barnes.onrender.com/savings/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ current_amount }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update savings goal');
            }
            return response.json();
          })
          .then(data => {
          })
          .catch(error => {
            console.error('Error updating goal:', error);
          });
      }
    }
  }, [goals]);

  // Fetch debts
  useEffect(() => {
    fetch("https://barnes.onrender.com/debts")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const loanFilter = data.debts.filter(loan => loan.user_id === userID);
        setLoans(loanFilter);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);


  // Persist changes to debts
  useEffect(() => {
    if (loans.length > 0) {
      const updatedLoan = loans[updateIndex];
      if (updatedLoan) {
        const { id, remaining_balance } = updatedLoan;
        fetch(`https://barnes.onrender.com/debts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ remaining_balance }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update loan');
            }
            return response.json();
          })
          .then(data => {
          })
          .catch(error => {
            console.error('Error updating loan:', error);
          });
      }
    }
  }, [loans]);





  const handleSaveGoal = async (newGoal) => {

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

  const handleSaveLoan = async (newLoan) => {

    try {
      const response = await fetch('https://barnes.onrender.com/debts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLoan),
      });

      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();
      setLoans(prevLoans => [...prevLoans, { ...newLoan, principal_amount: 0 }]);
      setShowLoanModal(false);

    } catch (error) {
      console.error('Error saving new loan:', error);
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
      let current = parseInt(updatedGoals[updateIndex].current_amount);
      current += parseInt(value);
      updatedGoals[updateIndex].current_amount = current;
      setGoals(updatedGoals);

    } else if (updateType === 'loan') {
      const updatedLoans = [...loans];
      let principal = parseInt(updatedLoans[updateIndex].remaining_balance);
      principal -= parseInt(value);
      updatedLoans[updateIndex].remaining_balance = principal;
      setLoans(updatedLoans);

    }
  };

  const handleDelete = async (index, type) => {
    let itemToDelete;
    let endpoint;

    if (type === 'goal') {
      itemToDelete = goals[index];
      endpoint = `https://barnes.onrender.com/savings/${itemToDelete.id}`;
    } else if (type === 'loan') {
      itemToDelete = loans[index];
      endpoint = `https://barnes.onrender.com/debts/${itemToDelete.id}`;
    }
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      // Update the state to remove the deleted item
      if (type === 'goal') {
        setGoals(goals.filter((_, i) => i !== index));
      } else if (type === 'loan') {
        setLoans(loans.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };



  return (
    <div className=" p-4 text-white w-screen l-screen" style={{ backgroundColor: '#242424' }}>
      <div className="space-y-8">

      < SavingsGoals
          goals={goals}
          handleUpdateAmount={handleUpdateAmount}
          handleDelete={handleDelete}
          setShowGoalModal={setShowGoalModal}
      />
      < DebtManagement
          loans={loans}
          handleUpdateAmount={handleUpdateAmount}
          handleDelete={handleDelete}
          setShowLoanModal={setShowLoanModal}
      />
        
      </div>

      {showGoalModal && (
        <SetGoalPopup onClose={() => setShowGoalModal(false)} onSave={handleSaveGoal} userID={userID}/>
      )}
      {showLoanModal && (
        <AddLoan onClose={() => setShowLoanModal(false)} onSave={handleSaveLoan} userID={userID} />
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