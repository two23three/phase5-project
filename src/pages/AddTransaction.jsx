import React, { useState } from 'react';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('income');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      amount,
      transactionType,
      category,
      date,
      description,
    };

    const endpoint = transactionType === 'income' ? 'https://bizzgogo-70f9.onrender.com/income/' : 'https://bizzgogo-70f9.onrender.com/expenses/';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      const result = await response.json();
      setSuccess('Transaction added successfully!');
      setError('');

      setAmount('');
      setTransactionType('income');
      setCategory('');
      setDate('');
      setDescription('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-lg" style={{ backgroundColor: '#242424' }}>
      <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-100 mb-2 text-left" htmlFor="amount">Amount:</label>
          <input
            className="w-full px-4 py-2 bg-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-100 mb-2 text-left" htmlFor="transactionType">Transaction Type:</label>
          <select
            className="w-full px-4 py-2 bg-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-100 mb-2 text-left" htmlFor="category">Category:</label>
          <select
            className="w-full px-4 py-2 bg-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="electricity">Home Expenses</option>
            <option value="shopping">Shopping</option>
            <option value="rent">Transport and Vehicle Expenses</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-100 mb-2 text-left" htmlFor="description">Description:</label>
          <textarea
            className="w-full px-4 py-2 bg-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 transition duration-200"
          type="submit"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
