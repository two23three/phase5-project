import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import Navbar from "../components/Navbar";

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

    return (
        <div className='min-h-screen height-full bg-gray-900 width-full'>
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Assets</h1>
            <div>
                {assets.length > 0 ? (
                    assets.map((asset, index) => (
                        <InfoCard 
                            key={index}
                            title={asset.name}
                            value={`Value: ${asset.value}`}
                        />
                    ))
                ) : (
                    <p>You have no assets.</p>
                )}
            </div>
            <Navbar />
        </div>
    );
}

export default Assets;
