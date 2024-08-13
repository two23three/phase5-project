import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faPlus, faWallet, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function Navbar({ onAddTransactionClick }) {
    return (
        <nav id='navbar' className="rounded-b-xl flex space-x-4 bg-gray-800 position-fixed bottom left-0 right-0 p-2">
            <NavLink
                to='/'
                className={({ isActive }) =>
                    isActive ? "flex flex-col items-center text-black-400" : "flex flex-col items-center text-white"
                }
            >
                <FontAwesomeIcon icon={faHome} size="2x" />
                <span>Home</span>
            </NavLink>
            <NavLink
                to='/insights'
                className={({ isActive }) =>
                    isActive ? "flex flex-col items-center text-black-400" : "flex flex-col items-center text-white"
                }
            >
                <FontAwesomeIcon icon={faChartBar} size="2x" />
                <span>Insights</span>
            </NavLink>
            <div className="flex flex-col items-center">
                <button
                    className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded"
                    onClick={onAddTransactionClick}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <span className="text-white">Add</span>
            </div>
            <NavLink
                to='/budget'
                className={({ isActive }) =>
                    isActive ? "flex flex-col items-center text-black-400" : "flex flex-col items-center text-white"
                }
            >
                <FontAwesomeIcon icon={faWallet} size="2x" />
                <span>Budget</span>
            </NavLink>
            <NavLink
                to='/more'
                className={({ isActive }) =>
                    isActive ? "flex flex-col items-center text-black-400" : "flex flex-col items-center text-white"
                }
            >
                <FontAwesomeIcon icon={faEllipsisH} size="2x" />
                <span>More</span>
            </NavLink>
        </nav>
    );
}

export default Navbar;
