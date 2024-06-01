import React from "react";
import { Link } from "react-router-dom";
import TextBox from "../components/Textbox";
import "../styles/login.css";
function Login() {
    return (
        <div className="login-page">
            <div>
                <h1> Flavor Fusion</h1>
            </div>
            <div className="login-title">
                <h2> Login to your Flavor Fusion Account</h2>
            </div>

            <div className="Textboxes">
                <h3>Username</h3>
                <TextBox />
                <h3>Password</h3>
                <TextBox type="password" />
            </div>

            <div className="login-txt">
                <Link to="/home">
                    <button className="sign-in-btn-login">Sign In</button>
                </Link>
            </div>

            <div className="">
                <Link to="/signup">
                    <button className="create-account-btn-login">
                        Create Account
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
