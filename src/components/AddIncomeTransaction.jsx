// AddIncomeTransaction.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from './SuccessMessage'; // Import the SuccessMessage component

const AddIncomeTransaction = ({ onCancel }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('side hustle');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { getUserId } = useAuth();
  const userID = getUserId();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('api/income_categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.income_categories);
      } catch (error) {
        setError('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date().toISOString().split('T')[0];

    const newTransaction = {
      amount: parseFloat(amount),
      transaction_type: 'income',
      category_id: selectedCategoryId,
      description,
      user_id: userID,
      date,
    };

    try {
      const response = await fetch('api/incomes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to add income');
      }

      setSuccess('Income added successfully!');
      setError('');
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/home'); // Navigate to home after success
      }, 3000);

      // Reset form fields
      setAmount('');
      setCategory('side hustle');
      setDescription('');
      setSelectedCategoryId(null);
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 z-50">
      <div className="max-w-md p-8 rounded-lg" style={{ backgroundColor: '#242424' }}>
        {showSuccessMessage && <SuccessMessage message="Income added successfully!" />}
        <h2 className="text-2xl font-bold mb-4 text-white">Add Income</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-100 mb-2 text-left" htmlFor="amount">
              Amount:
            </label>
            <input
              className="w-full px-4 py-2 bg-gray-300 text-black rounded"
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 mb-2 text-left" htmlFor="category">
              Category:
            </label>
            <select
              className="w-full px-4 py-2 bg-gray-300 text-black rounded"
              id="category"
              value={selectedCategoryId || ''}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 mb-2 text-left" htmlFor="description">
              Description:
            </label>
            <textarea
              className="w-full px-4 py-2 bg-gray-300 text-black rounded"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="w-full bg-red-800 text-white py-2 rounded" type="submit">
            Add Income
          </button>
          <button
            className="w-full bg-gray-500 text-white py-2 rounded mt-2"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeTransaction;
