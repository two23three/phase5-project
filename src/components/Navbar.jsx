// Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faPlus, faWallet, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function Navbar({ onAddTransactionClick }) {
    return (
        <nav id='navbar' className="fixed bottom-0 left-0 right-0 bg-gray-800 rounded-t-xl flex justify-around items-center p-4">
            <NavLink
                to='/home'
                className={({ isActive }) =>
                    isActive ? "flex flex-col items-center text-yellow-400" : "flex flex-col items-center text-white"
                }
            >
                <FontAwesomeIcon icon={faHome} size="lg" />
                <span>Home</span>
            </NavLink>
            <NavLink
                to='/insights'
                className={({ isActive }) =>
                    isActive ? "flex flex-col items-center text-yellow-400" : "flex flex-col items-center text-white"
                }
            >
                <FontAwesomeIcon icon={faChartBar} size="lg" />
                <span>Insights</span>
            </NavLink>
            <div className="flex flex-col items-center">
                <button
                    className="bg-red-500 text-white w-12 h-12 flex items-center justify-center rounded-full mb-1"
                    onClick={onAddTransactionClick}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <span className="text-white">Add</span>
            </div>
            <NavLink
                to='/budget'
                className={({ isActive }) =>
                    isActive ? "flex flex-col items-center text-yellow-400" : "flex flex-col items-center text-white"
                }
            >
                <FontAwesomeIcon icon={faWallet} size="lg" />
                <span>Budget</span>
            </NavLink>
            <NavLink
                to='/more'
                className={({ isActive }) =>
                    isActive ? "flex flex-col items-center text-yellow-400" : "flex flex-col items-center text-white"
                }
            >
                <FontAwesomeIcon icon={faEllipsisH} size="lg" />
                <span>More</span>
            </NavLink>
        </nav>
    );
}

export default Navbar;
