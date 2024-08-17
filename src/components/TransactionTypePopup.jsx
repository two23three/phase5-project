import React from 'react';

const TransactionTypePopup = ({ onClose, onChoose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className=" text-3xl font-bold text-center text-gray-700 mb-8 font-customFont">Select a Transaction Type</h2>
                <button className="bg-green-500 text-white text-2xl  px-4 py-2 rounded mr-4" onClick={() => onChoose('income')}>
                    Income
                </button>
                <button className="bg-red-800 text-white px-4 text-2xl py-2 rounded" onClick={() => onChoose('expense')}>
                    Expense
                </button>
                <button className="bg-grey-500 mt-4 text-gray-500 underline text-2xl  px-4 py-2 rounded" 
                onClick={onClose}
                >Cancel
                </button>
            </div>
        </div>
    );
};

export default TransactionTypePopup;
