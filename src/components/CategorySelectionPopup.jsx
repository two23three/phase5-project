import React, { useState, useEffect } from 'react';

const CategorySelectionPopup = ({ onClose, onSelectCategory, onCreateNewCategory }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch existing categories
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://barnes.onrender.com/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSelect = () => {
        if (selectedCategory) {
            onSelectCategory(selectedCategory);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl mb-4">Select or Create Category</h2>
                {loading ? (
                    <div>Loading categories...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 text-left" htmlFor="existingCategory">
                                Choose Existing Category:
                            </label>
                            <select
                                className="w-full px-4 py-2 bg-gray-300 text-black rounded"
                                id="existingCategory"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">-- Select a category --</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
                            onClick={handleSelect}
                            disabled={!selectedCategory}
                        >
                            Use Selected Category
                        </button>
                        <hr className="mb-4" />
                        <button
                            className="w-full bg-green-500 text-white py-2 rounded"
                            onClick={onCreateNewCategory}
                        >
                            Create New Category
                        </button>
                        <button className="mt-4 text-gray-500" onClick={onClose}>
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CategorySelectionPopup;
