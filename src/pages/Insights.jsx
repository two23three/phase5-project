import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';



Chart.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
)


const Insights = () => {
    return (
        <div className="Insights">
            <Navbar />
            <DateFilter />
            <TotalExpense amount={24000} />
            <div style={{ background: 'white', margin: '10px' }}>
                <InsightsChart />
                <ExpenseCategoryList />
            </div>
        </div>
    );
};

const Navbar = () => {
    return (
        <nav className="navbar">
            <p>Navbar</p>
        </nav>
    );
};

const DateFilter = () => {
    return (
        <div className="expense-filter">
            <label>From</label>
            <input type="date" />
            <label>To</label>
            <input type="date" />
        </div>
    );
};

const TotalExpense = ({ amount }) => {
    return (
        <div className="total-expense">
            <h2>Total expense</h2>
            <p>Ksh {amount}</p>
        </div>
    );
};

const InsightsChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Expense Over Time',
                data: [3000, 2000, 1500, 2200, 1800],
                fill: true,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
                tension: 0.4,
            }, {
                label: 'Income Over Time',
                data: [6000, 2000, 3500, 2800, 1000],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.4,
            }
        ],
    };

    return (
        <div className="expense-chart" style={{ background: 'white' }}>
            <Line data={data} />
        </div>
    );
};

const ExpenseCategoryList = () => {
    const categories = [
        { name: 'Electricity', amount: 1800, percentage: 30 },
        { name: 'Shopping', amount: 1200, percentage: 25 },
        { name: 'Rent', amount: 1500, percentage: 25 },
        { name: 'Car', amount: 1500, percentage: 25 },
    ];

    return (
        <div className='expense-category-container' style={{ backgroundColor: '#D1D1D1', padding: '0 10px', margin: '0', borderRadius: '15px' }}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <p style={{ color: '#423E3E', fontSize: '10px', display: 'flex', marginRight: 'auto' }}>Expense categories</p>
                <p style={{ marginLeft: 'auto', fontSize:'10px', color:'#423E3E' }}>Dropdown</p>
            </div>
            <div className="expense-category-list">
                {categories.map((category, index) => (
                    <ExpenseCategoryItem key={index} category={category} />
                ))}
            </div>
        </div>
    );
};

const ExpenseCategoryItem = ({ category }) => {
    return (
        <div className="expense-category-item" style={{
            display: 'flex', justifyContent: 'space-between', padding: '10px 0',
            borderStyle: 'solid', borderRadius: '10px', margin: '10px 0', borderWidth: '1px',
            backgroundColor: '#242424'
        }}>
            <p style={{ margin: '0' }}>{category.name}</p>
            <p style={{ margin: '0' }}>{category.amount}</p>
            <p style={{ margin: '0' }}>{category.percentage}%</p>
        </div>
    );
};

export default Insights;