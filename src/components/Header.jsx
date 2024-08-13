import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Assuming you have a useAuth hook

function Header({ onLogout, onCurrencyChange }) {
    const [selectedCurrency, setSelectedCurrency] = useState("KES");
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const currencies = ["USD", "EUR", "GBP", "KES"];

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setShowCurrencyDropdown(false);
        onCurrencyChange(currency);
    };

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // Call logout function which removes the token
        navigate('/login'); // Redirect to login page
        setShowLogoutPopup(false);
        onLogout();
    };

    return (
        <header className="flex justify-between items-center text-white pt-4 pl-4 pr-4">
            <div className="relative">
                <button
                    className="flex items-center space-x-2 text-black"
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                    <span>{selectedCurrency}</span>
                    <FontAwesomeIcon icon={faCaretDown} className="text-black" />
                </button>
                {showCurrencyDropdown && (
                    <div className="absolute bg-white shadow-md rounded mt-2 z-10">
                        {currencies.map((currency) => (
                            <button
                                key={currency}
                                className="block px-4 py-2 text-black hover:bg-gray-200"
                                onClick={() => handleCurrencySelect(currency)}
                            >
                                {currency}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <button
                className="flex items-center space-x-2 text-black"
                onClick={() => setShowLogoutPopup(true)}
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="text-black" />
                <span>Logout</span>
            </button>
            {showLogoutPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-black">
                        <p>Are you sure you want to logout?</p>
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleLogout}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setShowLogoutPopup(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
