import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { CgLogOut } from "react-icons/cg";

function Header() {
    return (
        <div className="header">
            <h1> Your Recipes </h1>
            <div className="logout">
                <Link to="/exit_session">
                    <CgLogOut /> Logout
                </Link>
            </div>
        </div>
    );
}

export default Header;
