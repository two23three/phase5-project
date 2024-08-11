import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PieChart from "../components/PieChart";
import InfoCard from "../components/InfoCard";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { formatNumber } from "chart.js/helpers";
import { useAuth } from "../components/AuthProvider";


function Home() {
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [debt, setDebt] = useState(0);
    const [assets, setAssets] = useState(0);
    const [currency, setCurrency] = useState("Ksh");

    const {getUserId} = useAuth();
    const userID = getUserId();
    const API_URL = "https://barnes.onrender.com/";

    

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
                console.log("Fetched data:", data);
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
                console.log("Fetched data:", data);
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
                console.log("Fetched data:", data);
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
                console.log("Fetched data:", data);
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
    const currencySymbol = currencySymbols[currency] || "Ksh";

    // Calculating temporary debt
    let tempDebt;
    if (balance < 0) {
        tempDebt = Math.abs(balance);
    }else{
        tempDebt = 0;
    }

    return (
        <div className="rounded-b-2xl flex flex-col gap-4 bg-gray-900 p-1 ">
            <Header onCurrencyChange={handleCurrencyChange} onLogout={() => console.log("Logged out")} />
            <div>
                <PieChart totalIncome={income} totalExpense={expense} />
            </div>
            <div>
                <h1 className="text-5xl font-bold text-white">
                    {currencySymbol} {formatNumber(balance)}
                </h1>
                <p className="text-white">left to spend</p>
            </div>
            <div>
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
            <Navbar/>
        </div>
    );
}

export default Home;
