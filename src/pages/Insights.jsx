import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import './insights.css';
import Navbar from "../components/Navbar";
import { useAuth } from "../components/AuthProvider";
import Header from "../components/Header";

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
                setCategories(sortByCategories(userExpenses, categoryData.categories, from, to));

                const userRes = await fetch(`${API_URL}users`);
                const userData = await userRes.json();
                const currentUser = userData.users.find(u => u.id === userID);
                setRole(currentUser.role_id);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userID, API_URL, from, to]);

    const combineAmountByDate = (amounts, from, to) => {
        amounts.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        const combined = [];
        let currentDate = null;
        let currentAmount = 0;
        const dateLabels = [];
    
        const fromDate = new Date(from);
        const toDate = new Date(to);
    
        for (const amount of amounts) {
            const amountDate = new Date(amount.date);
    
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
    
        if (currentDate !== null) {
            combined.push(currentAmount);
            dateLabels.push(currentDate);
        }
    
        setLabels(dateLabels);
        console.log(dateLabels);
        return combined;
    };

    const sortByCategories = (data, categories, from, to) => {
        const categoryTotals = {};
        // Initialize category totals
        categories.forEach(category => {
            categoryTotals[category.name.toLowerCase()] = 0;
        });
    
        // Filter data by date range
        const filteredData = data.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= new Date(from) && expenseDate <= new Date(to);
        });
    
        // Update category totals based on filtered data
        for (let expense of filteredData) {
            const matchingCategory = categories.find(category => category.id === expense.category_id);
            if (matchingCategory) {
                categoryTotals[matchingCategory.name.toLowerCase()] += parseInt(expense.amount);
            }
        }
    
        // Calculate total amount for percentage calculations
        const totalAmount = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
    
        // Build the updated category list
        const updatedCategoriesList = categories
            .map(category => {
                const amount = categoryTotals[category.name.toLowerCase()] || 0;
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
    
        return updatedCategoriesList;
    };

    const filterByDate = () => {
        const filteredExpenses = fullExpenses.filter(expense => new Date(expense.date) >= new Date(from) && new Date(expense.date) <= new Date(to));
        const filteredIncomes = fullIncomes.filter(income => new Date(income.date) >= new Date(from) && new Date(income.date) <= new Date(to));
        
        const combinedExpenses = combineAmountByDate(filteredExpenses, from, to);
        const combinedIncomes = combineAmountByDate(filteredIncomes, from, to);
        
        setExpenses(combinedExpenses);
        setIncomes(combinedIncomes);
        setCategories(sortByCategories(filteredExpenses, fetchedCategories, from, to));
        const totalFilteredAmount = combinedExpenses.reduce((sum, expense) => sum + expense, 0);
        setTotalAmount(totalFilteredAmount);
    };

    useEffect(() => {
        filterByDate();
    }, [from, to, fullExpenses, fullIncomes, fetchedCategories]);

    return (
        <div className="flex flex-col bg-cover bg-[url()] h-screen w-screen " style={{ backgroundColor: 'black' }}>
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
            <Navbar />
        </div>
    );
};

const ExpenseCategoryList = ({ categories, userID, expenses }) => {
    const [visibleCategories, setVisibleCategories] = useState(categories);

    useEffect(() => {
        setVisibleCategories(categories);
    }, [categories]);

    return (
        <div style={{ backgroundColor: '#D1D1D1', padding: '0', margin: '0', borderRadius: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ color: '#423E3E', fontSize: '15px', marginRight: 'auto' }}>Expense categories</p>
                <Dropdown categories={categories} setVisibleCategories={setVisibleCategories} userID={userID} expenses={expenses} />
            </div>
            <div >
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
            const updatedCategories = Object.keys(groupedExpenses)
                .map(categoryID => {
                    const { category, totalAmount } = groupedExpenses[categoryID];
                    return {
                        ...category,
                        amount: totalAmount
                    };
                })
                .filter(category => category.amount > 0);
            setVisibleCategories(updatedCategories);
        } else {
            const filteredCategories = categories.filter(category => category.name === value);
            setVisibleCategories(filteredCategories);
        }
    }, [value, categories, setVisibleCategories]);

    return (
        <div style={{ backgroundColor: '#D1D1D1' }}>
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ backgroundColor: '#D1D1D1', color:'black' }}
            >
                <option value="All">All</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const ExpenseCategoryItem = ({ category }) => {
    return (
        <div className="expense-category-item" style={{ display:'flex', justifyContent:'space-between' }}>
            <p>{category.name}</p>
            <p>{category.amount}</p>
            <p>{category.percentage}%</p>
        </div>
    );
};

const DateFilter = ({ setFrom, setTo, from, to }) => {
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


const TotalExpense = ({ amount }) => {
    return (
        <div className="total-expense">
            <h2>Total expense</h2>
            <p>Ksh {amount}</p>
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
                borderColor: 'red',
                tension: 0.5,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                tension: 0.4,
            },
            {
                label: 'Incomes',
                data: incomes,
                borderColor: 'green',
                tension: 0.5,
                fill: true,
                backgroundColor: 'rgba(0, 128, 0, 0.2)',
                borderColor: 'rgba(0, 128, 0, 1)',
                borderWidth: 1,
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: role === 1 ? 'Personal Income and Expenses' : 'Business revenue and Expenses'
            }
        }
    };

    return (
        <div className={expenses.length > 10 ? 'chart-container' : null}>
            <div className={expenses.length > 10 ? 'chart-container' : 'expense-chart'}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Insights;
