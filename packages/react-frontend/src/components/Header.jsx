import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { CgLogOut } from "react-icons/cg";

function Header() {
    return (
        <div className="header">
            <h1>Your Recipes</h1>
            <Link to="/exit_session" className="logout-link">
                <div className="logout">
                    <CgLogOut className="logout-icon" /> Logout
                </div>
            </Link>
        </div>
    );
}

export default Header;
