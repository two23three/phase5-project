import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    return (
        <nav id='navbar' className="flex space-x-4">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/insights'>Insights</NavLink>
            <NavLink to='/add_transaction'>
                <button className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </NavLink>
            <NavLink to='/budget'>Budget</NavLink>
            <NavLink to='/p-more'>More</NavLink>
        </nav>
    );
}

export default Navbar;
