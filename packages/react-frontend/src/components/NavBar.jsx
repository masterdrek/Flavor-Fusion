import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../styles/Navbar.css";
import { RiLogoutBoxRFill } from "react-icons/ri";

function NavBar({ NavbarData, isSelected, setIsSelected }) {
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

                <div className="menuItem">
                    <RiLogoutBoxRFill />
                </div>
            </div>
        </div>
    );
}

export default NavBar;
