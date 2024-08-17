import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useAuth } from "../components/AuthProvider";
import './insights.css';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
)

const Expenses = () => {

    const {getUserId} = useAuth();
    const userID = getUserId();
    const API_URL = "api/";

    const [transactions, setTransactions] = useState([]);
    const [tranzactions, setTranzactions] = useState({ list: [], labels: [] });
    const [table, setTable] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        // Fetch transactions from the API
        fetch('api/expenses')
            .then(response => response.json())
            .then(data => {
                // Filter expenses for a specific user and type
                let expenses = data.expenses.filter(expense => expense.user_id === userID);
                const combinedData = combineAmountByDate(expenses);
                setTranzactions(combinedData);
                setTransactions(expenses);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array to fetch only on mount

    const combineAmountByDate = (amounts) => {
        amounts.sort((a, b) => new Date(a.date) - new Date(b.date));
        const combined = { list: [], labels: [] };
        let currentDate = null;
        let currentAmount = 0;

        for (const amount of amounts) {
            if (amount.date === currentDate) {
                currentAmount += parseInt(amount.amount);
            } else {
                if (currentDate !== null) {
                    combined.list.push(currentAmount);
                    combined.labels.push(currentDate);
                }
                currentDate = amount.date;
                currentAmount = parseInt(amount.amount);
            }
        }
        if (currentDate !== null) {
            combined.list.push(currentAmount);
            combined.labels.push(currentDate);
        }

        return combined;
    };

    const filterByDate = () => {
        if (from && to) {
            const filteredExpenses = transactions.filter(expense => new Date(expense.date) >= new Date(from) && new Date(expense.date) <= new Date(to));
            const combinedData = combineAmountByDate(filteredExpenses);
            setTranzactions(combinedData);
            setTable(filteredExpenses);
        }
    };

    useEffect(() => {
        filterByDate();
    }, [from, to]);

    return (
        <div className="justify-between items-center p-2 w-screen" style={{ backgroundColor: 'black', padding:'10px' }}>
            <div className="expenses-page" style={{ backgroundColor: 'black' }}>
                <Header />
                <DateFilter from={from} to={to} setFrom={setFrom} setTo={setTo} />
                <TotalExpense amount={tranzactions.list.reduce((a, b) => a + b, 0)} />
                <ExpensesChart list={tranzactions.list} labels={tranzactions.labels} />
                <TransactionTable data={table.length > 0 ? table : transactions} />
            </div>
        </div>
    );
};


const TransactionTable = (data) => {
    const headers = ['Date', 'Description', 'Category', 'Amount'];

    return (
        <div className='justify-between items-center p-2 w-screen transaction-table' style={{ width: '100%', overflowX: 'auto', marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    {headers.map((header, index) => <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }} key={index}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.data.map((transaction, index) => (
                    <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.date}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.description}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.is_recurring ? 'recurring' : 'not recurring'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.amount}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};


const DateFilter = ({ from, to, setFrom, setTo }) => {
    return (
        <div className="expense-filter justify-between items-center p-2 w-screen" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginRight: 'auto' }}>
                <label>From</label>
                <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    style={{ width: '120px' }}
                />
            </div>
            <div>
                <label>To</label>
                <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    style={{ width: '120px' }}
                />
            </div>
        </div>
    );
};

const ExpensesChart = ({ list, labels }) => {
    const data = {
        labels: labels, // Adjust labels based on the data you have
        datasets: [
            {
                label: 'Expense Over Time',
                data: list,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.4,
            },
        ]
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                display: true,
            },
            y: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <div className={list.length>10? 'chart-container': null} >
            <div className={list.length>10? 'chart-container': 'expense-chart'} style={{borderBottomRightRadius:'0px', borderBottomLeftRadius:'0px', borderTopLeftRadius:'10px', borderTopRightRadius:'10px', marginBottom:'0px'}}>
                <Line data={data} options={options} />
            </div>
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

const Header = () => {
    return (
        <nav  style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', backgroundColor: 'black' }} className="navbar justify-between items-center p-2 w-screen">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width='20px' display='flex' justifyContent='space-between'>
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40Zm-36-160v-52q-47-11-76.5-40.5T324-370l66-26q12 41 37.5 61.5T486-314q33 0 56.5-15.5T566-378q0-29-24.5-47T454-466q-59-21-86.5-50T340-592q0-41 28.5-74.5T446-710v-50h70v50q36 3 65.5 29t40.5 61l-64 26q-8-23-26-38.5T482-648q-35 0-53.5 15T410-592q0 26 23 41t83 35q72 26 96 61t24 77q0 29-10 51t-26.5 37.5Q583-274 561-264.5T514-250v50h-70ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Z" />
            </svg>
        </nav>
    );
};



export default Expenses;