// components/EditAssetModal.js
import React, { useState, useEffect } from "react";

function EditAssetModal({ asset, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        value: ''
    });

    useEffect(() => {
        if (asset) {
            setFormData({
                name: asset.name,
                value: asset.value
            });
        } else {
            setFormData({
                name: '',
                value: ''
            });
        }
    }, [asset]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">{asset ? 'Edit Asset' : 'Add New Asset'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black bg-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Value</label>
                        <input
                            type="text"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            className="w-full p-2 border rounded text-black bg-white"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditAssetModal;
