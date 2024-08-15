import React, { useState, useEffect } from 'react';
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from 'react-router-dom';

const AddExpenseTransaction = ({ onCancel }) => {
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { getUserId } = useAuth();
    const userID = getUserId();

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('api/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                const userCategories = data.categories.filter(category => category.user_id === userID);
                setCategories(userCategories);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCategories();
    }, [userID]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const date = new Date().toISOString().split('T')[0];  // Current date in 'YYYY-MM-DD' format

        const newTransaction = {
            amount: parseFloat(amount),
            category_id: categoryId,
            description,
            user_id: userID,
            date,
        };

        try {
            const response = await fetch('api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTransaction),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add expense');
            }

            setSuccess('Expense added successfully!');
            setError('');

            setAmount('');
            setCategoryId('');
            setDescription('');
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };
    const handleCancel = () => {
        navigate('/home'); // Navigate to the home page
    };

    return (
        <div className="max-w-md mx-auto p-8 rounded-lg" style={{ backgroundColor: '#242424' }}>
            <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            {success && <div className="mb-4 text-green-500">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-100 mb-2 text-left" htmlFor="amount">Amount:</label>
                    <input
                        className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        step="0.01"  // Allow decimal values
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-100 mb-2 text-left" htmlFor="category">Category:</label>
                    <select
                        className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                        id="category"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-100 mb-2 text-left" htmlFor="description">Description:</label>
                    <textarea
                        className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button className="w-full bg-red-800 text-white py-2 rounded" type="submit">
                    Add Expense
                </button>
                <button
                    className="w-full bg-gray-500 text-white py-2 rounded mt-2"
                    onClick={handleCancel}
                    type="button"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddExpenseTransaction;
