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
);

const DateFilter = ({ from, to, setFrom, setTo }) => {
    return (
        <div className="expense-filter">
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

const IncomeChart = ({ list, labels, role }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: role === 1 ? 'Income Over Time' : 'Revenue over time',
                data: list,
                fill: true,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderColor: 'rgba(0, 128, 0, 1)',
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
        <div className={list.length > 10 ? 'chart-container' : 'expense-chart'}>
            <Line data={data} options={options} />
        </div>
    );
};

const TotalIncome = ({ amount, role }) => {
    return (
        <div className="total-expense">
            {role === 1 ? <h2 className="text-2xl font-semibold">Total Income</h2> : <h2>Total Revenue</h2>}
            <p>Ksh {amount}</p>
        </div>
    );
};

const TransactionTable = ({ data }) => {
    const headers = ['Date', 'Description', 'Frequency', 'Amount'];

    return (
        <div className="transaction-table">
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => <th key={index}>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.is_recurring ? 'Recurring' : 'Not Recurring'}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Income = () => {
    const { getUserId } = useAuth();
    const userID = getUserId();
    const API_URL = "https://barnes.onrender.com/";

    const [transactions, setTransactions] = useState([]);
    const [tranzactions, setTranzactions] = useState({ list: [], labels: [] });
    const [table, setTable] = useState([]);
    const [role, setRole] = useState('role');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    useEffect(() => {
        // Fetch transactions from the API
        fetch(`${API_URL}/incomes`)
            .then(response => response.json())
            .then(data => {
                // Filter expenses for a specific user and type
                let expenses = data.incomes.filter(income => income.user_id === userID);
                const combinedData = combineAmountByDate(expenses);
                setTranzactions(combinedData);
                setTransactions(expenses);
            })
            .catch(error => console.error('Error fetching data:', error));

        fetch(`${API_URL}/users`)
            .then(response => response.json())
            .then(data => {
                let user = data.users.find(u => u.id === userID);
                setRole(user.role_id);
            })
            .catch(error => console.log(error));
    }, [userID]); // Dependency on userID

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
        combined.list.push(currentAmount);
        combined.labels.push(currentDate);
        return combined;
    };

    const filteredData = transactions.filter(transaction => {
        const date = new Date(transaction.date);
        const fromDate = new Date(from);
        const toDate = new Date(to);
        return (!from || date >= fromDate) && (!to || date <= toDate);
    });

    return (
        <div className="insights-container h-screen w-screen">
            <DateFilter from={from} to={to} setFrom={setFrom} setTo={setTo} />
            <IncomeChart list={tranzactions.list} labels={tranzactions.labels} role={role} />
            <TotalIncome amount={filteredData.reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0)} role={role} />
            <TransactionTable data={filteredData} />
        </div>
    );
};

export default Income;
