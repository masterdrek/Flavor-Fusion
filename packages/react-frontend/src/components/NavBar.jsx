import React from "react";
import { Link } from "react-router-dom";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Logo from "../assets/react.svg";

import "../styles/Navbar.css";

function NavBar() {
    return (
        <div className="navbar">
            <div className="navbuttons">
                <div className="logo">
                    <img src={Logo} alt="Flavor Fusion Logo" /> Flavor Fusion
                </div>
                <Link to="/">
                    <BiFoodMenu /> Recipes
                </Link>
                <Link to="/inventory">
                    <MdOutlineInventory /> Inventory
                </Link>
                <Link to="/search">
                    <IoSearch /> Search
                </Link>
                <div className="active"></div>
            </div>
        </div>
    );
}

export default NavBar;
