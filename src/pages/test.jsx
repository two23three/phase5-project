import React, { useState, useEffect } from 'react';
import mockupImage from '../assets/mockup.png';

function test() {
    const API_URL = "https://barnes.onrender.com/";
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}users`);
                const data = await response.json();
                const users = data.users;
                const roundedUsers = Math.round(users.length / 10) * 10;
                setTotalUsers(roundedUsers * 100); // Multiply total users by 100
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-[#242424] min-h-screen flex flex-col items-center justify-center p-10">
            <h1 className="text-5xl font-bold mb-6 text-center text-white">Barnes</h1>
            <h3 className="text-3xl mb-6 text-center text-white">
                The Financial Manager to {totalUsers.toLocaleString()} users worldwide
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-center md:text-left max-w-lg">
                    <p className="text-lg mb-4 text-white">
                        A smart wallet for your financial needs. Control your <span className="underline">budget</span>,
                        track your <span className="underline">expenses</span> and <span className="underline">income</span>,
                        track your <span className="underline">assets</span> and <span className="underline">loans</span>,
                        and set goals and limits within one application.
                    </p>
                </div>
                <img src={mockupImage} alt="Barnes Mockup" className="w-full max-w-md rounded-lg shadow-md" />
                <a href="/register" className="bg-[#932B16] text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition">
                    Get Started
                </a>
                <a href='/login' className="text-white"><span className="underline">Or Login</span></a>
            </div>

            <div id="stats" className="bg-white py-24 sm:py-32 mt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                <span className="animate-counter">
                                    <span className="counter-number" style={{ '--count': 44 }}>44</span> million
                                </span>
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Assets under holding</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                $<span className="animate-counter">
                                    <span className="counter-number" style={{ '--count': 119 }}>119</span> trillion
                                </span>
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">New users annually</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                <span className="animate-counter">
                                    <span className="counter-number" style={{ '--count': totalUsers / 100 }}>{totalUsers / 100}</span>
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default test;
