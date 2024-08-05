import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function Assets() {
    const [assets, setAssets] = useState([]);
    const userID = 9; // Make sure this matches the user_id in your data
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
    }, []); // Empty dependency array to run only once

    const handleEdit = (id) => {
        console.log("Edit asset with ID:", id);
    };

    const handleDelete = (id) => {
        console.log("Delete asset with ID:", id);
    };

    return (
        <div className='min-h-screen bg-gray-900 text-white flex flex-col'>
            <h1 className="text-3xl font-bold mb-6 text-center">Assets</h1>
            <div className="flex flex-col items-center space-y-4 p-4 flex-grow">
                {assets.length > 0 ? (
                    assets.map((asset) => (
                        <div key={asset.id} className="flex items-center space-x-4">
                            <InfoCard
                                title={asset.name}
                                value={`Value: ${asset.value}`}
                            />
                            <div className="flex flex-col space-y-2">
                                <button
                                    onClick={() => handleEdit(asset.id)}
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
            <Navbar />
        </div>
    );
}

export default Assets;
