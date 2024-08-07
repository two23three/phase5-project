import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieChart from "../components/PieChart";
import InfoCard from "../components/InfoCard";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

function Home() {
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [debt, setDebt] = useState(0);
    const [assets, setAssets] = useState(0);
    const [currency, setCurrency] = useState("Ksh");

    const userID = 1;
    const API_URL = "https://bizzgogo-70f9.onrender.com/";

    const currencySymbols = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        KES: "Ksh"
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}incomes`);
                const data = await response.json();
                const incomes = data.incomes;

                let totalIncome = 0;

                incomes.forEach(income => {
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

                expenses.forEach(expense => {
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

                debts.forEach(debt => {
                    if (debt.user_id === userID) {
                        totalDebt += parseFloat(debt.principal_amount);
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

                assets.forEach(asset => {
                    if (asset.user_id === userID) {
                        totalAssets += parseFloat(asset.value);
                    }
                });

                setAssets(totalAssets);
            } catch (error) {
                console.log("Error fetching assets:", error);
            }
        };
        fetchData();
    }, []);

    const handleCurrencyChange = (newCurrency) => {
        setCurrency(newCurrency);
    };

    let balance = income - expense;
    const currencySymbol = currencySymbols[currency] || "$";

    return (
        <div className="flex flex-col gap-4 bg-gray-900 p-4 min-h-screen">
            <Header onCurrencyChange={handleCurrencyChange} onLogout={() => console.log("Logged out")} />
            <div>
                <PieChart totalIncome={income} totalExpense={expense} />
            </div>
            <div>
                <h1 className="text-5xl font-bold text-white">
                    {currencySymbol} {balance.toFixed(2)}
                </h1>
                <p className="text-white">left to spend</p>
            </div>
            <div>
                <Link to="/income">
                    <InfoCard title="Income" value={`${currencySymbol} ${income.toFixed(2)}`} />
                </Link>
                <Link to="/expenses">
                    <InfoCard title="Expense" value={`${currencySymbol} ${expense.toFixed(2)}`} />
                </Link>
                <Link to="/budget">
                    <InfoCard title="Debt" value={`${currencySymbol} ${debt.toFixed(2)}`} />
                </Link>
                <Link to="/assets">
                    <InfoCard title="Assets" value={`${currencySymbol} ${assets.toFixed(2)}`} />
                </Link>
            </div>
            <Navbar />
        </div>
    );
}

export default Home;
