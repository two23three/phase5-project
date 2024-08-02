import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import InforCard from "../components/InfoCard";

function Home() {
    const [data, setData] = useState({
        income: 0,
        expense: 0,
        assets: 0,
        loans: 0,
        savings: 0,
    });
    const userID = 1;
    const API_URL = "https://bizzgogo-70f9.onrender.com/";

    // Fetching the user's income
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}incomes`);
                const data = await response.json();
                console.log(data);
                const filteredData = data.filter((income) => income.user_id === userID);
                const totalIncome = filteredData.reduce((acc, income) => acc + income.amount, 0);
                setData(prevData => ({ ...prevData, income: totalIncome }));
            } catch (error) {
                console.log('Error fetching income:', error);
            }
        };
        fetchData();
    }, []);

    // Fetching the user's expenses
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}expenses`);
                const data = await response.json();
                const filteredData = data.filter((expense) => expense.user_id === userID);
                const totalExpense = filteredData.reduce((acc, expense) => acc + expense.amount, 0);
                setData(prevData => ({ ...prevData, expense: totalExpense }));
            } catch (error) {
                console.log('Error fetching expenses:', error);
            }
        };
        fetchData();
    }, []);

    // Fetching the user's assets
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}assets`);
                const data = await response.json();
                const filteredData = data.filter((asset) => asset.user_id === userID);
                const totalAssets = filteredData.reduce((acc, asset) => acc + asset.value, 0);
                setData(prevData => ({ ...prevData, assets: totalAssets }));
            } catch (error) {
                console.log('Error fetching assets:', error);
            }
        };
        fetchData();
    }, []);

    // Fetching the user's debts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}debts`);
                const data = await response.json();
                const filteredData = data.filter((debt) => debt.user_id === userID);
                const totalDebt = filteredData.reduce((acc, debt) => acc + debt.principal_amount, 0);
                setData(prevData => ({ ...prevData, loans: totalDebt }));
            } catch (error) {
                console.log('Error fetching debts:', error);
            }
        };
        fetchData();
    }, []);

    // Fetching the user's savings
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}savings`);
                const data = await response.json();
                const filteredData = data.filter((savings) => savings.user_id === userID);
                const totalSavings = filteredData.reduce((acc, savings) => acc + savings.amount, 0);
                setData(prevData => ({ ...prevData, savings: totalSavings }));
            } catch (error) {
                console.log('Error fetching savings:', error);
            }
        };
        fetchData();
    }, []);

    // Calculating the balance
    const balance = data.income - data.expense;

    return (
        <div>
            <div>
                <PieChart data={{ income: data.income, expense: data.expense }} />
                <h2>{balance}</h2>
                <p>left to spend</p>
            </div>
            <div>
                <InforCard title="Income" value={data.income} />
                <InforCard title="Expense" value={data.expense} />
                <InforCard title="Assets" value={data.assets} />
                <InforCard title="Loans" value={data.loans} />
                <InforCard title="Savings" value={data.savings} />
            </div>
        </div>
    );
}

export default Home;
