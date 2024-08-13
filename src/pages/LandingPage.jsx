import React, { useState, useEffect } from 'react';
import mockupImage from '../assets/mockup.png'; // Adjust the path as needed

function LandingPage() {
    const API_URL = "https://barnes.onrender.com/";
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}users`);
                const data = await response.json();
                const users = data.users;
                const roundedUsers = Math.round(users.length / 10) * 10;
                setTotalUsers(roundedUsers);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-[#242424] min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-6 text-center text-white">Barnes</h1>
            <h3 className="text-3xl mb-6 text-center text-white">
                The Financial Manager to {totalUsers} users worldwide
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
                <a href="/register" className="bg-[#932B16] text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-70
 transition">
                        Get Started
                </a>
                <a href='/login' className="text-white"> or Login</a>
            </div>
        </div>
    );
}

export default LandingPage;
