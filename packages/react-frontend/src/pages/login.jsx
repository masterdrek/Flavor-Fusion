import React from "react";
import { Link } from "react-router-dom";
import TextBox from "../components/Textbox";
import "../styles/login.css";
function login(){
    return (
        <div className="login-page">
            <div className="login-title">
                <h2> Login to your Flavor Fusion Account</h2>
            </div>

            <div className="Textboxes">
                <h3>Username</h3>
                <TextBox showButton={false} />
                <h3>Password</h3>
                <TextBox showButton={false} type="password" />
            </div>

            <div className="login-txt">
                <Link to="/home">
                    <button className="sign-in-btn">Sign In</button>
                </Link>
            </div>

            <div className="">
                <Link to="/create_account">
                    <button className="create-account-btn">Create Account</button>
                </Link>
            </div>
        </div>
    );
}

export default login;
