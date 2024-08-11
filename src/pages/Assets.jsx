import React, { useEffect, useState } from "react";
import AssetsInfoCard from "../components/AssetsInfoCard";
import EditAssetModal from "../components/EditAssetModal";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { formatNumber } from "chart.js/helpers";
import { useAuth } from "../components/AuthProvider";

function Assets() {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const { getUserId } = useAuth();
    const userID = getUserId();
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

                if (Array.isArray(data.assets)) {
                    const userAssets = data.assets.filter(asset => asset.user_id === userID);
                    setAssets(userAssets);
                } else {
                    console.log("Data structure is not as expected.");
                }
            } catch (error) {
                console.log("Error fetching assets:", error);
            }
        };
        if (userID) {
            fetchData();
        }
    }, [userID]);

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
            setAssets(assets.filter(asset => asset.id !== id));
        } catch (error) {
            console.log("Error deleting asset:", error);
        }
    };

    const handleSave = async (updatedAsset) => {
        if (isAddingNew) {
            // Adding a new asset
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
                // Reloading the page
                window.location.reload();
            } catch (error) {
                console.log("Error adding new asset:", error);
            }
        } else {
            // Editing an existing asset
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
                // Reloading the page
                window.location.reload();
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

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    return (
        <div className='min-h-screen rounded-b-xl bg-gray-900 text-white flex flex-col p-4'>
            <Header onCurrencyChange={handleCurrencyChange} onLogout={() => console.log("Logged out")} />
            <h1 className="text-3xl font-bold mb-6 text-center">Assets</h1>
            <div className="flex flex-col items-left space-y-4 p-4 flex-grow">
                {assets.length > 0 ? (
                    assets.map((asset) => (
                        <div key={asset.id} className="flex items-center space-x-4 bg-white rounded-lg p-4 relative">
                            <AssetsInfoCard
                                name={asset.name}
                                description={asset.description}
                                value={`${currencySymbol}${formatNumber(asset.value)}`}
                            />
                            <div className="relative">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={() => toggleDropdown(asset.id)}
                                >
                                    <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
                                </button>

                                {openDropdownId === asset.id && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="menu-button"
                                        tabIndex="-1"
                                    >
                                        <div className="py-1" role="none">
                                            <button
                                                onClick={() => handleEdit(asset)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                role="menuitem"
                                                tabIndex="-1"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(asset.id)}
                                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                                role="menuitem"
                                                tabIndex="-1"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
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
            <Navbar />
        </div>
    );
}

export default Assets;
