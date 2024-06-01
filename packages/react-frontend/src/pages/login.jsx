import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import "./../styles/Login.css";

function Login() {
    return (
        <div className="login-page">
            <div>
                <h1> Flavor Fusion</h1>
            </div>
            <div className="login-title">
                <h2> Login to your Flavor Fusion Account</h2>
            </div>

            <LoginForm />

            <Link to="/signup">
                <button className="login-btn">Don't have an account?</button>
            </Link>
        </div>
    );
}

export default Login;
