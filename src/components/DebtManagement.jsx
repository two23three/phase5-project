import ProgressBar from "../components/ProgressBar";
import React, { useState, useEffect } from "react";

const DebtManagement = ({loans, handleUpdateAmount, handleDelete, setShowLoanModal}) => {
     return (
        <div className="p-4 rounded-lg bg-gray-500">
        <h2 className="text-xl font-bold mb-4 text-left">Debt Management</h2>
        <div className="space-y-4">
          {loans.map((l, index) => (
            <div key={index} className="flex justify-between items-center">
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
                  onUpdate={() => handleUpdateAmount(index, 'loan', l.loan)}
                />
              </div>
              <button
                className="ml-4 bg-red-500 text-white p-2 rounded"
                onClick={() => handleDelete(index, 'loan')}
              >
                Delete
              </button>
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
}

export default DebtManagement