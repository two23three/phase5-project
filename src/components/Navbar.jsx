import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav id='navbar'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/insights'>Insights</NavLink>
            <NavLink to='/add_transaction'> Add Transaction</NavLink>
            <NavLink to='/budget'>Budget</NavLink>
            <NavLink to='/p-more'>More</NavLink>
        </nav>
    );
}

export default Navbar;
