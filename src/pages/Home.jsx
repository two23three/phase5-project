import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieChart from "../components/PieChart";
import InfoCard from "../components/InfoCard";
import Header from "../components/Header";
import { formatNumber } from "chart.js/helpers";
import { useAuth } from "../components/AuthProvider";
import homeBackground from "../assets/homebackground.png";

function Home() {
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [debt, setDebt] = useState(0);
    const [assets, setAssets] = useState(0);
    const [currency, setCurrency] = useState("Ksh");
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");

    const { getUserId } = useAuth();
    const userID = getUserId();
    const API_URL = "https://barnes.onrender.com/";

    // const fornmatNumber = (value, currencySymbol) => {
    //     return new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: currencySymbol,
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2,
    //     }).format(value);
    // };

    const currencySymbols = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        KES: "Ksh",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}incomes`);
                const data = await response.json();
                const incomes = data.incomes;

                let totalIncome = 0;

                incomes.forEach((income) => {
                    if (income.user_id === userID) {
                        totalIncome += parseFloat(income.amount);
                    }
                });

                setIncome(totalIncome);
            } catch (error) {
                console.log("Error fetching income:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}expenses`);
                const data = await response.json();
                const expenses = data.expenses;

                let totalExpenses = 0;

                expenses.forEach((expense) => {
                    if (expense.user_id === userID) {
                        totalExpenses += parseFloat(expense.amount);
                    }
                });

                setExpense(totalExpenses);
            } catch (error) {
                console.log("Error fetching expenses:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}debts`);
                const data = await response.json();
                const debts = data.debts;

                let totalDebt = 0;

                debts.forEach((debt) => {
                    if (debt.user_id === userID) {
                        totalDebt += parseFloat(debt.remaining_balance);
                    }
                });

                setDebt(totalDebt);
            } catch (error) {
                console.log("Error fetching debt:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}assets`);
                const data = await response.json();
                const assets = data.assets;

                let totalAssets = 0;

                assets.forEach((asset) => {
                    if (asset.user_id === userID) {
                        totalAssets += parseFloat(asset.value);
                    }
                });

                setAssets(totalAssets);
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching assets:", error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fetching user's role ID from the server
    const [roleID, setRoleID] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}users/${userID}`);
                const data = await response.json();
                setRoleID(data.user.role_id);
                setUserName(data.user.name);
            } catch (error) {
                console.log("Error fetching user role:", error);
            }
        };
        fetchData();
    }, []);

    const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency);
    };

    let balance = income - expense;
    const currencySymbol = currencySymbols[currency] || "Ksh";

    // Calculating temporary debt
    let tempDebt;
    if (balance < 0) {
        tempDebt = Math.abs(balance);
    } else {
        tempDebt = 0;
    }
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600 mx-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <p className="mt-2 text-gray-600">Loading user data...</p>
                </div>
            </div>
        );
    }
    if (roleID === 1) {
        return (
            <div className="flex flex-col justify-between bg-cover bg-[url()] h-screen w-screen "
                style={{ backgroundImage: `url(${homeBackground})` }}
            >
                <Header onCurrencyChange={handleCurrencyChange} onLogout={() => console.log("Logged out")} />
                <h1 className="text-3xl md:text-5xl font-bold text-black">Hello, {userName}</h1>
                <div className="flex justify-center items-center ">
                    <PieChart totalIncome={income} totalExpense={expense} />
                </div>
                <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-black">
                {currencySymbol} {formatNumber(balance)}
                    </h1>
                    <p className="text-black font-bold">Left To Spend</p>
                </div>
    
                <div className="bg-[#242424] pt-7 rounded-t-lg ">
                    <div className="gap-4 mx-[5%] my-auto">
                        <Link to="/income">
                            <InfoCard title="Income" value={`${currencySymbol} ${formatNumber(income)}`} />
                        </Link>
                        <Link to="/expenses">
                            <InfoCard title="Expense" value={`${currencySymbol} ${formatNumber(expense)}`} />
                        </Link>
                        <Link to="/budget">
                            <InfoCard title="Debt" value={`${currencySymbol} ${formatNumber(debt + tempDebt)}`} />
                        </Link>
                        <Link to="/assets">
                            <InfoCard title="Assets" value={`${currencySymbol} ${formatNumber(assets)}`} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else if (roleID === 2) {
        return (
            <div className="flex flex-col justify-between bg-cover bg-[url()] h-screen w-screen "
                style={{ backgroundImage: `url(${homeBackground})` }}
            >
                <Header onCurrencyChange={handleCurrencyChange} onLogout={() => console.log("Logged out")} />
                <h1 className="text-3xl md:text-5xl font-bold text-black">{userName}'s Business </h1>
                <div className="flex justify-center items-center ">
                    <PieChart totalIncome={income} totalExpense={expense} />
                </div>
                <div className="text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-black">
                {currencySymbol} {formatNumber(balance)}
                    </h1>
                    <p className="text-black font-bold">In Profits</p>
                </div>
    
                <div className="bg-[#242424] pt-7 rounded-t-lg">
                    <div className="gap-4 mx-[5%] my-auto">
                        <Link to="/income">
                            <InfoCard title="Revenue" value={`${currencySymbol} ${formatNumber(income)}`} />
                        </Link>
                        <Link to="/expenses">
                            <InfoCard title="Expense" value={`${currencySymbol} ${formatNumber(expense)}`} />
                        </Link>
                        <Link to="/budget">
                            <InfoCard title="Debt" value={`${currencySymbol} ${formatNumber(debt + tempDebt)}`} />
                        </Link>
                        <Link to="/assets">
                            <InfoCard title="Assets" value={`${currencySymbol} ${formatNumber(assets)}`} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    
    
}

export default Home;
