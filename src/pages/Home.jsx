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
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching assets:", error);
                setIsLoading(false);
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
    if(isLoading){
        return (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-2 text-gray-600">Loading user data...</p>
              </div>
            </div>
          );
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
