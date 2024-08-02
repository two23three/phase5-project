import React from "react"
import { Doughnut } from "react-chartjs-2"
import {Chart as CHartJS, ArcElement, Tooltip, Legend} from "chart.js"

CHartJS.register(ArcElement, Tooltip, Legend)

function PieChart({totalIncome, totalExpense }) {
    const charData = {
    labels: ["Income", "Expense"],
    datasets: [
        {
            data: [totalIncome, totalExpense],
            backgroundColor: ["green", "red"],
            hoverOffset: 4,
            cutout: '70%',
        }
    ]
};
    return <Doughnut data={charData} />
}

export default ExpensePieChart;