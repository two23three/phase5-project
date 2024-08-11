import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [transaction_type, setTransaction_type] = useState('income');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const expenseCategoryMapping = {
    food: 1,
    electricity: 2,
    rent: 3,
    car: 4,
    shopping: 5,
  };

  const incomeCategoryMapping = {
    side_hustle: 1,
    monthly_salary: 2,
  };

  const [availableCategories, setAvailableCategories] = useState(Object.keys(incomeCategoryMapping));

  useEffect(() => {
    if (transaction_type === 'income') {
      setAvailableCategories(Object.keys(incomeCategoryMapping));
    } else {
      setAvailableCategories(Object.keys(expenseCategoryMapping));
    }
    setCategory(''); 
  }, [transaction_type]);

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date().toISOString().split('T')[0]; // Formats date as YYYY-MM-DD

    const categoryMapping = transaction_type === 'income' ? incomeCategoryMapping : expenseCategoryMapping;

    const newTransaction = {
      amount,
      transaction_type,
      category_id: categoryMapping[category], // Use the ID from the appropriate mapping
      description,
      user_id: 25,
      date
    };

    const endpoint = transaction_type === 'income' ? 'https://barnes.onrender.com/income/' : 'https://barnes.onrender.com/expenses/';

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
      setTransaction_type('income');
      setCategory('');
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
            id="transaction_type"
            value={transaction_type}
            onChange={(e) => setTransaction_type(e.target.value)}
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
            <option value="" disabled>Select a category</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
            ))}
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
        <button
          className=" text-white py-2 rounded hover:bg-gray-700 transition duration-200"
          onClick={handleCancel}
          type="button"
        >
          Cancel
        </button>
        <br />
      </form>
    </div>
  );
};

export default AddTransaction;
