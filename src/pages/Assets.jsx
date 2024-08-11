import React, { useEffect, useState } from "react";
import AssetsInfoCard from "../components/AssetsInfoCard";
import EditAssetModal from "../components/EditAssetModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { formatNumber } from "chart.js/helpers";

function Assets() {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const userID = 3;
    const API_URL = "https://barnes.onrender.com/";

    // Header settings
    const [currency, setCurrency] = useState("Ksh");
    const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency);
    };
    const currencySymbols = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        KES: "Ksh"
    };
    const currencySymbol = currencySymbols[currency] || "Ksh";

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
            // Ensure required fields are present
            if (!updatedAsset.name || !updatedAsset.value || !updatedAsset.purchase_date) {
                alert("Please fill out all required fields.");
                return;
            }
    
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
            try {
                const response = await fetch(`${API_URL}assets/${selectedAsset.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...updatedAsset, user_id: userID }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const updatedAssetFromServer = await response.json();
                setAssets(assets.map(asset =>
                    asset.id === updatedAssetFromServer.id ? updatedAssetFromServer : asset
                ));
            } catch (error) {
                console.log("Error updating asset:", error);
            }
        }
        setIsModalOpen(false);
    };
    
    

    const handleAddNew = () => {
        setSelectedAsset(null);
        setIsAddingNew(true);
        setIsModalOpen(true);
    };

    return (
        <div className='min-h-screen rounded-b-xl bg-gray-900 text-white flex flex-col p-4'>
            <Header onCurrencyChange={handleCurrencyChange} onLogout={() => console.log("Logged out")} />
            <h1 className="text-3xl font-bold mb-6 text-center">Assets</h1>
            <div className="flex flex-col items-center space-y-4 p-4 flex-grow">
                {assets.length > 0 ? (
                    assets.map((asset) => (
                        <div key={asset.id} className="flex items-center space-x-4 bg-white rounded-lg p-4">
                            <AssetsInfoCard
                                name={asset.name}
                                description={asset.description}
                                value={`${currencySymbol}${formatNumber(asset.value)}`}
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
