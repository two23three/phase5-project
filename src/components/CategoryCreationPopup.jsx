import React, { useState } from 'react';
import { useAuth } from "../components/AuthProvider";

const CategoryCreationPopup = ({ onClose, onCreateCategory }) => {
    const [categoryName, setCategoryName] = useState('');
    const [limit, setLimit] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { getUserId } = useAuth();
    const userID = getUserId();

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
            console.log(newCategory)

            if (!response.ok) {
                throw new Error('Failed to create category');
            }

            const result = await response.json();
            setSuccess('Category created successfully!');
            setError('');
            onCreateCategory(result); // Call the callback with the new category

            setCategoryName('');
            setLimit('');
            setDescription('');
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl mb-4">Create New Category</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                {success && <div className="mb-4 text-green-500">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="categoryName">Category Name:</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                            id="categoryName"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="limit">Limit:</label>
                        <input
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                            id="limit"
                            type="number"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-left" htmlFor="description">Description:</label>
                        <textarea
                            className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button className="w-full bg-red-800 text-white py-2 rounded" type="submit">
                        Create Category
                    </button>
                    <button className="mt-4 text-gray-500" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CategoryCreationPopup;
