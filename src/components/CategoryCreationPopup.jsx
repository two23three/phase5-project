import React, { useState } from 'react';
import { useAuth } from "../components/AuthProvider";
import { useNavigate } from 'react-router-dom';

const CategoryCreationPopup = ({ onClose, onCreateCategory }) => {

    const navigate = useNavigate()

    const [categoryName, setCategoryName] = useState('');
    const [limit, setLimit] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { getUserId } = useAuth();
    const userID = getUserId();

    const handleUseExistingCategory = () => {
        onClose();
        navigate('/add_expense_transaction');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCategory = {
            name: categoryName,
            limit: parseFloat(limit),
            user_id: userID,
            description
        };

        try {
            const response = await fetch('api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error('Failed to create category');
            }

            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                onClose(); // Close the popup after showing the message
            }, 3000);

            onCreateCategory(newCategory); // Notify parent component

            // Clear the form fields after successful creation
            setCategoryName('');
            setLimit('');
            setDescription('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {showSuccessMessage ? (
                <div className="bg-white p-6 rounded shadow-lg text-center">
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
                    <p className="text-sm text-gray-500">Category created successfully!</p>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-8 font-customFont">Step 1: Create Category</h2>
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="font-customFont block text-xl font-semibold text-gray-700 mb-2 text-left" htmlFor="categoryName">Category Name:</label>
                            <input
                                className="w-full text-xl px-4 py-2 bg-gray-300 text-black rounded"
                                id="categoryName"
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="font-customFont block text-xl font-semibold text-gray-700 mb-2 text-left" htmlFor="limit">Limit:</label>
                            <input
                                className="w-full px-4 text-xl py-2 bg-gray-300 text-black rounded"
                                id="limit"
                                type="number"
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="font-customFont block font-semibold text-xl text-gray-700 mb-2 text-left" htmlFor="description">Description:</label>
                            <textarea
                                className="w-full text-xl px-4 py-2 bg-gray-300 text-black rounded"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <button className="w-full text-2xl font-customFont bg-red-800 text-white py-2 mb-2 rounded-lg" type="submit">
                            Create Category
                        </button>
                        <button
                        className="w-full text-2xl font-customFont bg-blue-900 text-white py-2 rounded-lg"
                        onClick={handleUseExistingCategory} // Use the new handler for this button
                        type="button" // Specify type as button to prevent form submission
                    >
                        Use Existing Category
                        </button>
                        <button className="mt-4 text-2xl font-customFont underline text-gray-900" onClick={onClose} type="button">
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CategoryCreationPopup;
