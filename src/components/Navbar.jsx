import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(){
    return(
        <nav id='navbar'>
            <NavLink to='/'>Home</NavLink>
            <Navlink to='/insights'>Insights</Navlink>
            <button to='/add_transaction'>Add Transaction</button>
            <NavLink to='/budget'>Budget</NavLink>
            <NavLink to='/p-more'>More</NavLink>
      </nav>
    )
}

export  default Navbar