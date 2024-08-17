import React, { useState, useEffect } from 'react';
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from 'react-router-dom';

const AddExpenseTransaction = ({ onCancel }) => {
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { getUserId } = useAuth();
    const userID = getUserId();

    const navigate = useNavigate();

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

            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate('/home');  // Navigate to home after success
            }, 3000);
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

    return (
        <div className="flex justify-between items-center p-2 w-screen  bg-gray-900">
            <div className="max-w-md mx-auto p-8 rounded-lg" style={{ backgroundColor: '#242424' }}>
                {showSuccessMessage && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60">
                        <div className="bg-white p-6 rounded shadow-lg text-black">
                            <div className="w-20 h-20 rounded-full bg-green-100 p- mx-auto mb-3.5">
                                <svg
                                    className="w-20 h-20 text-green-500 animate-checkmark-fade"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl text-gray-500 font-semibold mb-2">Success!</h3>
                            <p className="text-sm text-gray-500">Expense added successfully!</p>
                        </div>
                    </div>
                )}
                <h2 className="text-4xl font-bold mb-6 text-white">Add Expense</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                {success && <div className="mb-4 text-green-500">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-xl text-gray-100 mb-2 text-left" htmlFor="amount">Amount:</label>
                        <input
                            className="w-full border border-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-grey-900 px-4 py-2 bg-gray-300 text-black rounded"
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            step="0.01"  // Allow decimal values
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-xl text-gray-100 mb-2 text-left" htmlFor="category">Category:</label>
                        <select
                            className="w-full border font-customFont font-xl border-gray-900 focus:outline-none focus:ring-2 focus:ring-grey-900  px-4 py-2 bg-gray-300 text-black rounded"
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
                        <label className="block text-xl font-customFont text-gray-100 mb-2 text-left" htmlFor="description">Description:</label>
                        <textarea
                            className="border text-xl border-gray-900 focus:outline-none focus:ring-2 focus:ring-grey-900  w-full px-4 py-2 bg-gray-300 text-black rounded"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button className="w-full text-2xl mb-3 text-bold bg-red-800 text-white py-2 rounded" type="submit">
                        Add Expense
                    </button>
                    <button
                        className="w-full bg-gray-500 text-2xl text-white py-2 rounded mt-2"
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

export default AddExpenseTransaction;
