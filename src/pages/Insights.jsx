import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import './insights.css';
import { useAuth } from "../components/AuthProvider";
import { FaLightbulb } from "react-icons/fa"

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
    const { getUserId } = useAuth();
    const userID = getUserId();
    const API_URL = "https://barnes.onrender.com/";

    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];
    const lastMonthDate = new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0];

    const [from, setFrom] = useState(lastMonthDate);
    const [to, setTo] = useState(currentDate);
    const [role, setRole] = useState("role");
    const [categories, setCategories] = useState([]);
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [labels, setLabels] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [fullExpenses, setFullExpenses] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [fullIncomes, setFullIncomes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenseRes = await fetch(`${API_URL}expenses`);
                const expenseData = await expenseRes.json();
                const userExpenses = expenseData.expenses.filter(expense => expense.user_id === userID);
                setFullExpenses(userExpenses);
                setExpenses(combineAmountByDate(userExpenses, from, to));

                const incomeRes = await fetch(`${API_URL}incomes`);
                const incomeData = await incomeRes.json();
                const userIncomes = incomeData.incomes.filter(income => income.user_id === userID);
                setFullIncomes(userIncomes);
                setIncomes(combineAmountByDate(userIncomes, from, to));

                const categoryRes = await fetch(`${API_URL}categories`);
                const categoryData = await categoryRes.json();
                setFetchedCategories(categoryData.categories);
                setCategories(sortByCategories(userExpenses, categoryData.categories));
                console.log(categories);

                const userRes = await fetch(`${API_URL}users`);
                const userData = await userRes.json();
                const currentUser = userData.users.find(u => u.id === userID);
                setRole(currentUser.role_id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userID, API_URL]);

    useEffect(() => {
        filterByDate();
    }, [from, to]);

    const combineAmountByDate = (amounts, from, to) => {
        console.log(amounts);
        amounts.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        const combined = [];
        let currentDate = null;
        let currentAmount = 0;
    
        const dateLabels = [];
    
        // Convert 'from' and 'to' to Date objects for comparison
        const fromDate = new Date(from);
        const toDate = new Date(to);
    
        for (const amount of amounts) {
            const amountDate = new Date(amount.date);
    
            // Skip the current loop iteration if the date is outside the range
            if (amountDate < fromDate || amountDate > toDate) {
                continue;
            }
    
            if (amount.date === currentDate) {
                currentAmount += parseInt(amount.amount);
            } else {
                if (currentDate !== null) {
                    combined.push(currentAmount);
                    dateLabels.push(currentDate);
                }
                currentDate = amount.date;
                currentAmount = parseInt(amount.amount);
            }
        }
    
        // Ensure the last date and amount are added to the arrays
        if (currentDate !== null) {
            combined.push(currentAmount);
            dateLabels.push(currentDate);
        }
    
        setLabels(dateLabels);
        return combined;
    };

    const filterByDate = () => {
        const filteredExpenses = fullExpenses.filter(expense => new Date(expense.date) >= new Date(from) && new Date(expense.date) <= new Date(to));
        const filteredIncomes = fullIncomes.filter(income => new Date(income.date) >= new Date(from) && new Date(income.date) <= new Date(to));
        
        const combinedExpenses = combineAmountByDate(filteredExpenses, from, to);
        const combinedIncomes = combineAmountByDate(filteredIncomes, from, to);
        
        setExpenses(combinedExpenses);
        setIncomes(combinedIncomes);
        setCategories(sortByCategories(filteredExpenses, fetchedCategories));
        const totalFilteredAmount = combinedExpenses.reduce((sum, expense) => sum + expense, 0);
        setTotalAmount(totalFilteredAmount);
    };
    

    const sortByCategories = (data, categories) => {
        const categoryTotals = {};
        categories.forEach(category => {
            categoryTotals[category.name.toLowerCase()] = 0;
        });
        for (let expense of data) {
            const matchingCategory = categories.find(category => category.id === expense.category_id);
            if (matchingCategory) {
                categoryTotals[matchingCategory.name.toLowerCase()] += parseInt(expense.amount);
            }
        }
        const totalAmount = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
        const categoriesList = categories
            .map(category => {
                const amount = categoryTotals[category.name.toLowerCase()];
                const percentage = totalAmount ? Math.round((amount / totalAmount) * 100) : 0;
                if (amount > 0) {
                    return {
                        name: category.name,
                        id: category.id,
                        amount: amount,
                        percentage: percentage,
                        category: category.name.toLowerCase(),
                    };
                }
                return null;
            })
            .filter(category => category !== null);
        return categoriesList;
    };

    return (
        <div className="Insights" style={{ backgroundColor: 'black' }}>
            <Header />
            <DateFilter setTo={setTo} setFrom={setFrom} from={from} to={to} />
            <TotalExpense amount={totalAmount} />
            <div style={{ background: 'white', padding: '4px' }}>
                {expenses.length > 0 || incomes.length > 0 ? (
                    <>
                        <InsightsChart expenses={expenses} incomes={incomes} labels={labels} role={role} />
                        {categories.length > 0 && <ExpenseCategoryList categories={categories} userID={userID} expenses={fullExpenses} />}
                    </>
                ) : (
                    <p style={{ color: 'black' }}>Add some expenses and expense categories...</p>
                )}
            </div>
        </div>
    );
};

const ExpenseCategoryList = ({ categories, userID, expenses }) => {
    const [visibleCategories, setVisibleCategories] = useState(categories);

    useEffect(() => {
        setVisibleCategories(categories);
    }, [categories]);

    return (
        <div className='expense-category-container' style={{ backgroundColor: '#D1D1D1', padding: '0', margin: '0', borderRadius: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ color: '#423E3E', fontSize: '15px', marginRight: 'auto' }}>Expense categories</p>
                <Dropdown categories={categories} setVisibleCategories={setVisibleCategories} userID={userID} expenses={expenses} />
            </div>
            <div className="expense-category-list">
                {visibleCategories.map((category, index) => (
                    <ExpenseCategoryItem key={index} category={category} />
                ))}
            </div>
        </div>
    );
};

const Dropdown = ({ categories, setVisibleCategories, userID, expenses }) => {
    const [value, setValue] = useState("All");

    useEffect(() => {
        if (value === "All") {
            const groupedExpenses = expenses.reduce((acc, expense) => {
                const categoryID = expense.category_id;
                if (!acc[categoryID]) {
                    acc[categoryID] = {
                        category: categories.find(cat => cat.id === categoryID),
                        totalAmount: 0
                    };
                }
                acc[categoryID].totalAmount += parseInt(expense.amount);
                return acc;
            }, {});

            const overallTotalAmount = Object.values(groupedExpenses).reduce((sum, group) => sum + group.totalAmount, 0);

            const groupedCategories = Object.values(groupedExpenses).map(group => {
                const percentage = overallTotalAmount ? Math.round((group.totalAmount / overallTotalAmount) * 100) : 0;
                return {
                    ...group.category,
                    amount: group.totalAmount,
                    percentage: percentage
                };
            });

            setVisibleCategories(groupedCategories);
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category_id === parseInt(value));
            const totalAmount = filteredExpenses.reduce((sum, expense) => sum + parseInt(expense.amount), 0);
            const filteredCategories = filteredExpenses.map(expense => {
                const category = categories.find(cat => cat.id === expense.category_id);
                const percentage = totalAmount ? Math.round((parseInt(expense.amount) / totalAmount) * 100) : 0;
                return {
                    ...category,
                    amount: parseInt(expense.amount),
                    percentage: percentage
                };
            });
            setVisibleCategories(filteredCategories);
        }
    }, [value, categories, expenses, setVisibleCategories]);

    return (
        <div className="dropdown" style={{ backgroundColor: '#D1D1D1' }}>
            <select className="dropdown-select" value={value} onChange={(e) => setValue(e.target.value)} style={{backgroundColor:'#D1D1D1'}}>
                <option value="All">All</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    );
};

const ExpenseCategoryItem = ({ category }) => {
    const { name, amount, percentage } = category;
    return (
        <div className='expense-category-item' style={{display:'flex', justifyContent:'space-between'}}>
            <p className='category-name'>{name}</p>
            <p className='category-amount'>{amount}</p>
            <p className='category-percentage'>{percentage}%</p>
        </div>
    );
};


const DateFilter = ({ setTo, setFrom, from, to }) => {
    return (
        <div className="expense-filter" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginRight: 'auto' }}>
                <label>From</label>
                <input
                    type="date"
                    style={{ width: '120px' }}
                    value={from}
                    onChange={(event) => { setFrom(event.target.value) }}
                    placeholder={from}
                />
            </div>
            <div>
                <label>To</label>
                <input
                    type="date"
                    style={{ width: '120px' }}
                    value={to}
                    onChange={(event) => { setTo(event.target.value) }}
                    placeholder={to}
                />
            </div>
        </div>
    );
};

const InsightsChart = ({ expenses, incomes, labels, role }) => {
    

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Expenses',
                data: expenses,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.4,
            },
            {
                label: role === 1 ? 'Income over Time' : 'Revenue over Time',
                data: incomes,
                fill: true,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
                tension: 0.4,
            }
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
        <div className={expenses.length > 10 ? 'chart-container' : null}>
            <div className={expenses.length > 10 ? 'chart-container' : 'expense-chart'}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};


const Header = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', margin: '10px', backgroundColor: 'black' }} className="navbar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width='20px' display='flex' justifyContent='space-between'>
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M480-40q-112 0-206-51T120-227v107H40v-240h240v80h-99q48 72 126.5 116T480-120q75 0 140.5-28.5t114-77q48.5-48.5 77-114T840-480h80q0 91-34.5 171T791-169q-60 60-140 94.5T480-40Zm-36-160v-52q-47-11-76.5-40.5T324-370l66-26q12 41 37.5 61.5T486-314q33 0 56.5-15.5T566-378q0-29-24.5-47T454-466q-59-21-86.5-50T340-592q0-41 28.5-74.5T446-710v-50h70v50q36 3 65.5 29t40.5 61l-64 26q-8-23-26-38.5T482-648q-35 0-53.5 15T410-592q0 26 23 41t83 35q72 26 96 61t24 77q0 29-10 51t-26.5 37.5Q583-274 561-264.5T514-250v50h-70ZM40-480q0-91 34.5-171T169-791q60-60 140-94.5T480-920q112 0 206 51t154 136v-107h80v240H680v-80h99q-48-72-126.5-116T480-840q-75 0-140.5 28.5t-114 77q-48.5 48.5-77 114T120-480H40Z" />
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



export default Insights;