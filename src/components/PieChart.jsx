import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ totalIncome, totalExpense }) {
    const chartData = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                data: [totalIncome, totalExpense],
                backgroundColor: ["green", "red"],
                hoverOffset: 4,
                cutout: '75%',
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false, // This hides the legend
            },
        },
    };

    return (
        <div>
            <Doughnut data={chartData} options={chartOptions} />
        </div>
    );
}

export default PieChart;
