import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm.jsx";
import "./../styles/signup.css";

function Signup() {
    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-header">
                    <h1>Flavor Fusion</h1>
                </div>
                <div className="signup-title">
                    <h2>Create your Flavor Fusion Account</h2>
                </div>
                <SignupForm />
                <div className="login-link">
                    <Link to="/login">Already have an account?</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
