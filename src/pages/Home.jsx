import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import InforCard from "../components/InfoCard";

function Home() {
    const [data, setData] = useState(({
        income: 0,
        expense: 0,
        assets: 0,
        loans: 0,
        savings: 0,
    }));

    const API_URL = "https://bizzgogo-70f9.onrender.com/admin"

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(API_URL);
                const data = await response.json();
                setData({
                    income: data.income,
                    expense: data.expense,
                    assets: data.assets,
                    loans: data.loans,
                    savings: data.savings
                });
            } catch (error) {
                console.log('Error fetching data:', error);
            }
            };
        fetchData();
    }, []);
    let balance = data.income - data.expense;
    return(
        <div>
            <div>
            <PieChart data = {data} />
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

    )
};