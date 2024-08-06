import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faPlus, faWallet, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    return (
        <nav id='navbar' className="flex space-x-4 bg-gray-800 po">
            <NavLink to='/' className="flex flex-col items-center text-white">
                <FontAwesomeIcon icon={faHome} size="2x" />
                <span>Home</span>
            </NavLink>
            <NavLink to='/insights' className="flex flex-col items-center text-white">
                <FontAwesomeIcon icon={faChartBar} size="2x" />
                <span>Insights</span>
            </NavLink>
            <NavLink to='/add_transaction'>
                <button className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </NavLink>
            <NavLink to='/budget' className="flex flex-col items-center text-white">
                <FontAwesomeIcon icon={faWallet} size="2x" />
                <span>Budget</span>
            </NavLink>
            <NavLink to='/p-more' className="flex flex-col items-center text-white">
                <FontAwesomeIcon icon={faEllipsisH} size="2x" />
                <span>More</span>
            </NavLink>
        </nav>
    );
}

export default Navbar;
