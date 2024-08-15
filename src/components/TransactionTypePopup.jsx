import React from 'react';

const TransactionTypePopup = ({ onClose, onChoose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl mb-4">Choose Transaction Type</h2>
                <button className="bg-green-500 text-white px-4 py-2 rounded mr-4" onClick={() => onChoose('income')}>
                    Income
                </button>
                <button className="bg-red-800 text-white px-4 py-2 rounded" onClick={() => onChoose('expense')}>
                    Expense
                </button>
                <button className="mt-4 text-gray-500" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default TransactionTypePopup;
