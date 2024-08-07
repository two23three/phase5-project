import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Navbar from "../components/Navbar";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
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


const Insights = () => {

    const [fullExpenses, setFullExpenses] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [fullIncomes, setFullIncomes] = useState([]);
    const [from, setFrom] = useState("from");
    const [to, setTo] = useState("to");
    const [change, setChange] = useState('')

    useEffect(() => {

        // fetch expenses
        fetch('http://localhost:3000/expenses')
            .then(response => response.json())
            .then(data => {

                let sortedExpenses = data.filter(expense => expense.user_id === 2)
                setFullExpenses(sortedExpenses);
                // console.log(sortedExpenses)
                let list = combineAmountByDate(sortedExpenses);
                setExpenses(list);

            })
            .catch(error => console.log(error));

        // fetch incomes
        fetch('http://localhost:3000/incomes')
            .then(response => response.json())
            .then(data => {

                let sortedIncomes = data.filter(income => income.user_id === 1)
                setFullIncomes(sortedIncomes);
                let list = combineAmountByDate(sortedIncomes);

                setIncomes(list);

            })
            .catch(error => console.log(error));
    }, [change]);

    useEffect(() => {
        filterByDate();

    }, [from, to]
    );

    // Function to combine incomes by date
    const combineAmountByDate = (amounts) => {
        // Sort by date
        amounts.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Combine incomes with the same date
        const combined = [];
        let currentDate = null;
        let currentAmount = 0;

        for (const amount of amounts) {
            if (amount.date === currentDate) {
                currentAmount += amount.amount;
            } else {
                if (currentDate !== null) {
                    combined.push(currentAmount);
                }
                currentDate = amount.date;
                currentAmount = amount.amount;
            }
        }
        if (currentDate !== null) {
            combined.push(currentAmount);
        }

        console.log(combined);
        return combined;
    };

    const filterByDate = () => {

        console.log(from)
        console.log(to)

        let filteredExpenses = fullExpenses.filter(expense => new Date(expense.date) >= new Date(from) && new Date(expense.date) <= new Date(to));
        let filteredIncomes = fullIncomes.filter(income => new Date(income.date) >= new Date(from) && new Date(income.date) <= new Date(to));
        console.log(filteredExpenses)
        console.log(filteredIncomes)
        if ((filteredIncomes.length && filteredExpenses.length) !== 0) {
            setExpenses(combineAmountByDate(filteredExpenses));
            setIncomes(combineAmountByDate(filteredIncomes));
        };
    };


    return (
        <div className="Insights p-1" style={{ backgroundColor: 'grey' }}>
            <button onClick={() => setChange(prev => prev + 1)}>Press</button>
            <Header />
            <DateFilter setTo={setTo} setFrom={setFrom} From={from} To={to} />
            <TotalExpense amount={24000} />
            <div style={{ background: 'white', }}>
                <InsightsChart expenses={expenses} incomes={incomes} />
                <ExpenseCategoryList />
            </div>
            <Navbar/>
        </div>
    );
};

const DateFilter = ({ setTo, setFrom, from, to }) => {
    return (
        <div className="expense-filter" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginRight: 'auto' }}>
                <label>From</label>
                <input type="date" style={{ width: '120px' }} value={from} onChange={(event) => { setFrom(event.target.value), console.log(event.target.value) }} />
            </div>
            <div>
                <label>To</label>
                <input type="date" style={{ width: '120px' }} value={to} onChange={(event) => { setTo(event.target.value), console.log(event.target.value) }} />
            </div>
        </div>
    );
};

const InsightsChart = ({ expenses, incomes }) => {
    // console.log(expenses)
    // console.log(incomes)
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Income Over Time',
                data: incomes,
                fill: true,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
                tension: 0.4,
            },
            {
                label: 'Expense Over Time',
                data: expenses,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="expense-chart" style={{ background: 'white' }}>
            <Line data={data} />
        </div>
    );
};

const Header = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', padding: '10px', backgroundColor: '' }} className="navbar">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40Zm-36-160v-52q-47-11-76.5-40.5T324-370l66-26q12 41 37.5 61.5T486-314q33 0 56.5-15.5T566-378q0-29-24.5-47T454-466q-59-21-86.5-50T340-592q0-41 28.5-74.5T446-710v-50h70v50q36 3 65.5 29t40.5 61l-64 26q-8-23-26-38.5T482-648q-35 0-53.5 15T410-592q0 26 23 41t83 35q72 26 96 61t24 77q0 29-10 51t-26.5 37.5Q583-274 561-264.5T514-250v50h-70ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width='20px' display='flex' justifyContent='space-between'>
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>

        </nav>
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





const categories = [
    {
        name: 'Electricity', amount: 1800, percentage: 30, category: 'electricity', icon:
            <svg className="h-8 w-8 text-stone-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7" />
                <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                <line x1="9.7" y1="17" x2="14.3" y2="17" />
            </svg>,
    },
    {
        name: 'Shopping', amount: 1200, percentage: 25, category: 'shopping', icon:
            <svg className="h-8 w-8 text-stone-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="9" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
            </svg>,
    },
    {
        name: 'Rent', amount: 1500, percentage: 25, category: 'rent', icon:
            <svg className="h-8 w-8 text-stone-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>,
    },
    {
        name: 'Car', amount: 1500, percentage: 25, category: 'car', icon:
            <svg className="h-8 w-8 text-stone-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
            </svg>,
    },
];

const ExpenseCategoryList = () => {
    const [visibleCategories, setVisibleCategories] = useState(categories);

    return (
        <div className='expense-category-container' style={{ backgroundColor: '#D1D1D1', padding: '0', margin: '0', borderRadius: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ color: '#423E3E', fontSize: '15px', display: 'flex', marginRight: 'auto' }}>Expense categories</p>
                <Dropdown categories={categories} setVisibleCategories={setVisibleCategories} />
            </div>
            <div className="expense-category-list">
                {visibleCategories.map((category, index) => (
                    <ExpenseCategoryItem key={index} category={category} />
                ))}
            </div>
        </div>
    );
};

const Dropdown = ({ categories, setVisibleCategories }) => {
    const filterCategories = (event) => {
        if (event.target.value === "All") {
            setVisibleCategories(categories);
        } else {
            const sortedCategories = categories.filter(c => c.category.toLowerCase() === event.target.value.toLowerCase());
            setVisibleCategories(sortedCategories);
        }
    };

    return (
        <select className="dropdown" onChange={filterCategories} style={{ backgroundColor: '#D1D1D1', color: '#423E3E', fontSize: '15px' }}>
            <option value="All">Categories</option>
            <option value="electricity">Electricity</option>
            <option value="rent">Rent</option>
            <option value="shopping">Shopping</option>
            <option value="car">Car</option>
        </select>
    );
}

const ExpenseCategoryItem = ({ category }) => {
    return (
        <div className="expense-category-item" style={{
            display: 'flex', justifyContent: 'space-between', padding: '10px 0',
            borderStyle: 'solid', borderRadius: '10px', margin: '10px 0', borderWidth: '1px',
            backgroundColor: '#242424', width: '100%', height: '300',
        }}>
            <p style={{ margin: '0' }}>{category.icon}</p>
            <p style={{ margin: '0' }}>{category.name}</p>
            <p style={{ margin: '0' }}>{category.amount}</p>
            <p style={{ margin: '0' }}>{category.percentage}%</p>
        </div>
    );
};

export default Insights;
