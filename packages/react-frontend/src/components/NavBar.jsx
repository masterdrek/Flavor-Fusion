import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../styles/Navbar.css";
import { RiLogoutBoxRFill } from "react-icons/ri";

function NavBar({ NavbarData, isSelected, setIsSelected }) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')

    const handleLogout = () => {
        // Perform any logout logic here (e.g., clearing tokens, user data)
        if (sessionStorage.getItem("token")) {
            sessionStorage.removeItem("token")
            console.log("User logged out")
            navigate("/login"); // Redirect to the login page
        } else {
            navigate("/signup")
        }
    };
    return (
        <div className="Navbar">
            {/* Logo */}
            <div className="logo">
                <img src={Logo} alt="" />
                <span>
                    Flavor<span> Fusion</span>
                </span>
            </div>
            {/* Menu */}
            <div className="menu">
                {NavbarData.map((item, index) => {
                    return (
                        <div
                            className={
                                isSelected === index
                                    ? "menuItem active"
                                    : "menuItem"
                            }
                            key={index}
                            onClick={() => setIsSelected(index)}
                        >
                            <item.icon />
                            <span>{item.heading}</span>
                        </div>
                    );
                })}

                <div className="menuItem" onClick={handleLogout}>
                    <RiLogoutBoxRFill />
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default NavBar;
