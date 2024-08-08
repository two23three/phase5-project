import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Navbar from "../components/Navbar";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const DateFilter = () => {
    return (
        <div className="flex justify-between mb-4">
            <div className="mr-auto">
                <label className="block mb-1">From</label>
                <input type="date" className="w-28 p-1 border rounded" />
            </div>
            <div>
                <label className="block mb-1">To</label>
                <input type="date" className="w-28 p-1 border rounded" />
            </div>
        </div>
    );
};

const IncomeChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Income Over Time',
                data: [6000, 2000, 3500, 2800, 1000],
                fill: true,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
                tension: 0.4,
            },
        ]
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <Line data={data} />
        </div>
    );
};

const TotalIncome = ({ amount }) => {
    return (
        <div className="my-4 text-center">
            <h2 className="text-2xl font-semibold">Total Income</h2>
            <p className="text-xl">Ksh {amount}</p>
        </div>
    );
};

const Header = () => {
    return (
        <nav className="flex justify-between items-center p-4 mb-4 bg-gray-100 shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40Zm-36-160v-52q-47-11-76.5-40.5T324-370l66-26q12 41 37.5 61.5T486-314q33 0 56.5-15.5T566-378q0-29-24.5-47T454-466q-59-21-86.5-50T340-592q0-41 28.5-74.5T446-710v-50h70v50q36 3 65.5 29t40.5 61l-64 26q-8-23-26-38.5T482-648q-35 0-53.5 15T410-592q0 26 23 41t83 35q72 26 96 61t24 77q0 29-10 51t-26.5 37.5Q583-274 561-264.5T514-250v50h-70ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Z" />
            </svg>
        </nav>
    );
};

const Income = () => {
    return (
        <div className="p-4">
            <Header />
            <DateFilter />
            <TotalIncome amount={64000} />
            <IncomeChart />
            <Navbar />
        </div>
    );
};

export default Income;
