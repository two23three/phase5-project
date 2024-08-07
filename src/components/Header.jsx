// components/Header.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Header({ onLogout, onCurrencyChange }) {
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const currencies = ["USD", "EUR", "GBP", "KES"];

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setShowCurrencyDropdown(false);
        onCurrencyChange(currency);
    };

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="relative">
                <button
                    className="flex items-center space-x-2"
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                    <span>{selectedCurrency}</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
                {showCurrencyDropdown && (
                    <div className="absolute left-0 mt-2 w-32 bg-white text-black rounded shadow-lg">
                        {currencies.map((currency) => (
                            <button
                                key={currency}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                onClick={() => handleCurrencySelect(currency)}
                            >
                                {currency}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <button
                className="flex items-center space-x-2"
                onClick={() => setShowLogoutPopup(true)}
            >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
            </button>
            {showLogoutPopup && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg text-black">
                        <p>Are you sure you want to logout?</p>
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={onLogout}
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
