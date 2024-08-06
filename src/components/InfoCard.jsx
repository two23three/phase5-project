import React from "react";

function InfoCard({ title, value }) {
    return (
        <div className="bg-white rounded-lg flex justify-between items-center p-4 text-black mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <h2 className="text-xl">{value}</h2>
        </div>
    );
}

export default InfoCard;
