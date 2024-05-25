import React from "react";
import { Link } from "react-router-dom";
import TextBox from "../components/Textbox";
import "../styles/createAccount.css";
function createAccount() {
    return (
        <div className="create-account-page">
            <div className="create-title">
                <h2> Create your Flavor Fusion Account</h2>
            </div>

            <div className="Textboxes">
                <h3>Name</h3>
                <TextBox showButton={false} />
                <h3>Username</h3>
                <TextBox showButton={false} />
                <h3>Password</h3>
                <TextBox showButton={false} type="password" />
                <h3>Confirm Password</h3>
                <TextBox showButton={false} type="password" />
            </div>

            <Link to="/">
                <button className="create-account-btn">Create Account</button>
            </Link>

            <div className="have-account-txt">
                <h4>
                    Have an account?{" "}
                    <Link to="/login" 
                    /* change /signin to the login page */>
                        <button className="sign-in-btn">Sign in</button>
                    </Link>
                </h4>
            </div>
        </div>
    );
}

export default createAccount;
