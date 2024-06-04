import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import "./../styles/login.css";

function Login() {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Flavor Fusion</h1>
                </div>
                <div className="login-title">
                    <h2>Login to your Flavor Fusion Account</h2>
                </div>
                <LoginForm />
                <div className="signup-link">
                    <Link to="/signup">Dont have an account?</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
