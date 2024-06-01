import React from "react";
import { Link } from "react-router-dom"
import SignupForm from '../components/SignupForm.jsx'
import './../styles/Signup.css'

function Signup() {
    return (
        <div className="signup-page">
            <div>
                <h1> Flavor Fusion</h1>
            </div>
            <div className="signup-title">
                <h2> Login to your Flavor Fusion Account</h2>
            </div>

            <SignupForm />

            <Link to="/login">
                <button className="login-btn">Already have an account?</button>
            </Link>
        </div>
    );
}


export default Signup;
