import React from "react";

function AssetsInfoCard({ name, description, value }) {
    return (
        <div className="bg-[#242424] rounded-lg p-4 text-white font-bold mb-4 w-500px">
            <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-xl">{description}</p>
                <h2 className="text-xl">{value}</h2>
            </div>
        </div>
    );
}

export default AssetsInfoCard;
