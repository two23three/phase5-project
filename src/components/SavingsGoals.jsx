import ProgressBar from "../components/ProgressBar";
import React, { useState, useEffect } from "react";

const SavingsGoals = ({goals, handleUpdateAmount, handleDelete, setShowGoalModal}) =>{
    return(
        <div className="p-4 rounded-lg bg-gray-500">
          <h2 className="text-xl font-bold mb-4 text-left">Savings Goals</h2>
          <div className="space-y-4">
            {goals.map((g, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{g.name}</h3>
                  <p>Start Date: {g.start_date}</p>
                  <ProgressBar
                    label={g.name}
                    current_amount={parseInt(g.current_amount)}
                    target_amount={parseInt(g.target_amount)}
                    type="goal"
                    onUpdate={() => handleUpdateAmount(index, 'goal', g.name)}
                  />
                </div>
                <button
                  className="ml-4 bg-red-500 text-white p-2 rounded"
                  onClick={() => handleDelete(index, 'goal')}
                >
                  Delete
                </button>
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
    )
}

export default SavingsGoals