import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";

function Assets() {
    const [assets, setAssets] = useState([]);
    const userID = 4;
    const API_URL = "https://bizzgogo-70f9.onrender.com/";

    // Fetching the user's assets
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}assets`);
                console.log("Response:", response);
                const data = await response.json();

                // Filter assets by user ID
                const userAssets = data.assets.filter(asset => asset.user_id === userID);

                setAssets(userAssets);
            } catch (error) {
                console.log("Error fetching assets:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div>
                {assets.length > 0 ? (
                    assets.map((asset, index) => (
                        <InfoCard key={index} asset={asset} />
                    ))
                ) : (
                    <p>You have no assets.</p>
                )}
            </div>
        </div>
    );
}

export default Assets;
