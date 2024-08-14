import React, { useState, useEffect } from 'react';
import mockupImage from '../assets/mockup.png';

function LandingPage() {
    const API_URL = "https://barnes.onrender.com/";
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}users`);
                const data = await response.json();
                const users = data.users;
                const roundedUsers = Math.round(users.length * 10);
                setTotalUsers(roundedUsers);
                setIsLoading(false);

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);
    if (isLoading) {
        return (
            <div className="bg-[#242424] min-h-screen text-7xl flex flex-col items-center justify-center p-10">
                <div className="text-center ">
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
    return (
        <div className="bg-[#242424] min-h-screen flex flex-col items-center justify-center p-10">
            <h1 className="text-5xl font-bold mb-6 text-center text-white">Barnes</h1>
            <h3 className="text-3xl mb-6 text-center text-white order-first font-semibold tracking-tight sm:text-5xl">
                The Financial Manager to <span
                    className="animate-counter"
                    style={{ '--num-start': 0, '--num-end': totalUsers }}
                >  K users worldwide
                </span>
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
                <a href='/login' className="text-white"> or Login</a>
            </div>

            <div className="bg-neutral-300 rounded-xl py-24 sm:py-32 mt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                <span
                                    className="animate-counter"
                                    style={{ '--num-start': 0, '--num-end': 300 }}
                                >  K +
                                </span>
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">Assets under holding</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                $ <span
                                    className="animate-counter"
                                    style={{ '--num-start': 0, '--num-end': 119 }}
                                >
                                    <span className="flex tabular-nums text-slate-900 text-5xl font-extrabold mb-2"></span> Million
                                </span>
                            </dd>
                        </div>
                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">New users annually</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                <span
                                    className="animate-counter"
                                    style={{ '--num-start': 0, '--num-end': totalUsers }}
                                > K+
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
