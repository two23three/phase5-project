import  { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import InfoCard from "../components/InfoCard";

function Home() {
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [debt, setDebt] = useState(0);    
    const [assets, setAssets] = useState(0);

    const userID = 1;
    const API_URL = "https://bizzgogo-70f9.onrender.com/";

    // Fetching the user's income
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}incomes`);
                const data = await response.json();
                const incomes = data.incomes;

                let totalIncome = 0;

                // filtering the data for a specific user and summing up the amounts
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

    // Fetching the user's expenses
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

    // Fetching the user's debt
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

    // Fetching the user's assets
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

    let balance = income - expense;

    return (
        <div className="flex flex-col gap-4 bg-gray-900 p-4">
            <div>
                <PieChart  totalIncome={income} totalExpense={expense}/>
            </div>
            <div>
                <h1>${balance}</h1>
                <p>left to spend</p>
            </div>
            <div>
                <InfoCard title="Income" value={income} />
                <InfoCard title="Expense" value={expense} />
                <InfoCard title="Debt" value={debt} />
                <InfoCard title="Assets" value={assets} />
            </div>
        </div>
    );
}
export default Home
