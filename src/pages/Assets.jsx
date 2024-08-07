import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import Navbar from "../components/Navbar";
import EditAssetModal from "../components/EditAssetModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

function Assets() {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const userID = 1;
    const API_URL = "https://bizzgogo-70f9.onrender.com/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}assets`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                console.log("Fetched data:", data);

                if (Array.isArray(data.assets)) {
                    const userAssets = data.assets.filter(asset => asset.user_id === userID);
                    console.log("Filtered assets:", userAssets);
                    setAssets(userAssets);
                } else {
                    console.log("Data structure is not as expected.");
                }
            } catch (error) {
                console.log("Error fetching assets:", error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (asset) => {
        setSelectedAsset(asset);
        setIsAddingNew(false);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}assets/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log("Deleted asset with ID:", id);
            setAssets(assets.filter(asset => asset.id !== id));
        } catch (error) {
            console.log("Error deleting asset:", error);
        }
    };

    const handleSave = async (updatedAsset) => {
        if (isAddingNew) {
            try {
                const response = await fetch(`${API_URL}assets`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...updatedAsset, user_id: userID }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const newAsset = await response.json();
                setAssets([...assets, newAsset]);
            } catch (error) {
                console.log("Error adding new asset:", error);
            }
        } else {
            setAssets(assets.map(asset =>
                asset.id === selectedAsset.id ? { ...asset, ...updatedAsset } : asset
            ));
        }
        setIsModalOpen(false);
    };

    const handleAddNew = () => {
        setSelectedAsset(null);
        setIsAddingNew(true);
        setIsModalOpen(true);
    };

    return (
        <div className='min-h-screen rounded-b-xl bg-gray-900 text-white flex flex-col'>
            <h1 className="text-3xl font-bold mb-6 text-center">Assets</h1>
            <div className="flex flex-col items-center space-y-4 p-4 flex-grow">
                {assets.length > 0 ? (
                    assets.map((asset) => (
                        <div key={asset.id} className="flex items-center space-x-4 bg-white rounded-lg p-4">
                            <InfoCard
                                title={asset.name}
                                value={`Value: ${asset.value}`}
                            />
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => handleEdit(asset)}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    onClick={() => handleDelete(asset.id)}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">You have no assets.</p>
                )}
            </div>
            <div className="flex justify-center mt-4 mb-6">
                <button
                    onClick={handleAddNew}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 flex items-center"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add New Asset
                </button>
            </div>
            <Navbar />
            <EditAssetModal
                asset={selectedAsset}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    );
}

export default Assets;
