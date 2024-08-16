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
  const [Dropdown, setDropdown] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [updateType, setUpdateType] = useState(null);
  const [updateLabel, setUpdateLabel] = useState('');

  const [goals, setGoals] = useState([]);
  const [loans, setLoans] = useState([]);
  const [limits, setLimits] = useState([]);

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

  // fetch limits
  //  useEffect(() => {
  //   fetch("https://barnes.onrender.com/categories")
  //      .then(response => {
  //        if (!response.ok) {
  //          throw new Error('Network response was not ok');
  //        }
  //        return response.json();
  //     })
  //      .then(data => {
  //        const userLimits = data.categories.filter(category => category.user_id === userID).map(category => category.limit);
  //        setLimits(userLimits);
  //      })
  //      .catch(error => {
  //        console.error('There was a problem with the fetch operation:', error);
  //      });
  //  }, []);

  // Persist changes to limits
  useEffect(() => {
    if (limits.length > 0) {
      const updatedLimit = limits[updateIndex];
      if (updatedLimit) {
        const { id, current_amount } = updatedLimit;
        fetch(`https://barnes.onrender.com/categories/${limit}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ current_amount }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update limit');
            }
            return response.json();
          })
          .then(data => {
          })
          .catch(error => {
            console.error('Error updating limit:', error);
          });
      }
    }
  }, [limits]);

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
      window.location.reload();

    } catch (error) {
      console.error('Error saving new loan:', error);
    }
  };


  const handleSaveLimit = async (newLimit) => {

    try {
      const response = await fetch('https://barnes.onrender.com/limits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLimit),
      });

      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();
      setLimits(prevLimits => [...prevLimits, { ...newLimit, current_amount: 0 }]);
      setShowLimitModal(false);

    } catch (error) {
      console.error('Error saving new limit:', error);
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

    } else if (updateType === 'limit') {
      const updatedLimits = [...limits];
      updatedLimits[updateIndex].current_amount += parseInt(value);
      setLimits(updatedLimits);
    }
    setShowUpdateModal(false);
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
    } else if (type === 'limit') {
      itemToDelete = limits[index];
      endpoint = `https://barnes.onrender.com/limits/${itemToDelete.id}`;
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
      } else if (type === 'limit') {
        setLimits(limits.filter((_, i) => i !== index));
      }

    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };



  return (
    <div className=" p-4 text-white w-screen h-screen" style={{ backgroundColor: '#242424' }}>
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
        {/* Limits */}
        <div className="p-4 rounded-lg bg-zinc-800">
          <h2 className="text-xl font-bold mb-4 text-left">Limits</h2>
          <div className="space-y-4">
            {limits.map((l, index) => (
              <div key={index} className="flex justify-between items-center">
                <ProgressBar
                  key={index}
                  label={l.limit}
                  current_amount={l.current_amount}
                  target_amount={l.limitAmount}
                  type="limit"
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded-lg"
                    onClick={() => handleUpdateAmount(index, 'limit', l.limit)}
                  >
                    Update Amount
                </button>
                <button
                  className="ml-4 bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDelete(index, 'limit')}
                >
                  Delete
                </button>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div className="mt-4">
                <button
                  className="flex items-center p-1 rounded-lg w-auto justify-center text-gray-900 hover:text-black"
                  onClick={() => setShowLimitModal(true)}
                >
                  <span className="bg-gray-300 mr-2 rounded-full p-1">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  <span className="text-white">Add Limit</span>
                </button>
              </div>
           </div>
          </div>
        </div>
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
