import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./../api/api.js";
import "../styles/signup.css";

function SignupForm() {
    // navigate to home on success
    const navigate = useNavigate();

    // state variables for user input
    const [firstName, setFirstName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const userObj = { name: firstName, username, password };

    // checks if inputs follow criteria
    const [validUsername, setValidUsername] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [matchPassword, setMatchPassword] = useState(true);

    // shows message on incorrect input
    const [message, setMessage] = useState("");

    // to test inputs / txt box message
    const USERNAME_RGX = /^[0-9a-zA-Z_.]{5,15}$/;
    const PASSWORD_RGX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/;
    const PASSWORD_TXT =
        "Must contain at least one number, one uppercase and lowercase letter, and at least 8 - 25 characters";

    // navigates to home on success = true
    const [success, setSuccess] = useState(false);

    // sends user to home page on success
    useEffect(() => {
        if (success) {
            setFirstName("");
            setUsername("");
            setPassword("");
            setRePassword("");
            navigate("/");
        }
    }, [success, navigate]);

    // checks for valid username regex
    useEffect(() => {
        setValidUsername(USERNAME_RGX.test(username));
    }, [username]);

    // checks if inputs follow patterns and passwords are equivalent
    useEffect(() => {
        setValidPassword(
            PASSWORD_RGX.test(password) && PASSWORD_RGX.test(rePassword)
        );
        setMatchPassword(password === rePassword);
    }, [password, rePassword]);

    // function to create user and add token to sessionStorage
    async function createUser(user) {
        console.log("Posting user:", user);
        try {
            const response = await fetch(API_URL + "/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            console.log(response);
            if (response.status !== 201) {
                throw new Error(`Error posting data: ${response.statusText}`);
            }
            if (response.status === 409) {
                setMessage("Duplicate Username Found");
            }

            // get token from response and set value in sessionStorage
            const { token } = await response.json();
            sessionStorage.setItem("token", token);
        } catch (error) {
            console.error("Error in createUser:", error);
        }
    }

    // submits data
    const handleSubmit = async (e) => {
        e.preventDefault();
        // checks constraints on inputs
        if (validUsername && validPassword && matchPassword) {
            // creates new user and recieves new token
            const tok = await createUser(userObj);
            console.log(sessionStorage.getItem("token"));
            if (sessionStorage.getItem("token")) {
                // successfully created, triggers useEffect surrounding navigate to go to Home
                setSuccess(() => true);
                setMessage("User created");
            } else {
                setMessage("Token not recieved");
            }
            // sets messages to display if inputs are invalid
        } else if (!validUsername) {
            setMessage("Username is invalid");
        } else if (!validPassword) {
            setMessage("Password is invalid");
        } else if (!matchPassword) {
            setMessage("Passwords do not match");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-container">
                <label htmlFor="firstName">
                    <h3>First Name</h3>
                </label>
                <input
                    className="textbox"
                    type="text"
                    id="firstName"
                    placeholder="Enter Your First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="username">
                    <h3>Username</h3>
                </label>
                <input
                    className="textbox"
                    type="text"
                    id="username"
                    placeholder="Enter an Unique Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="pass">
                    <h3>Password</h3>
                </label>
                <input
                    className="textbox"
                    type="password"
                    id="pass"
                    placeholder="Enter Your Password"
                    autoComplete="on"
                    title={PASSWORD_TXT}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="rePass">
                    <h3>Re-Enter Password</h3>
                </label>
                <input
                    className="textbox"
                    type="password"
                    id="rePass"
                    placeholder="Re-Enter Your Password"
                    autoComplete="on"
                    title={PASSWORD_TXT}
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />
                <button type="submit" className="signup-txt signup-btn">
                    Sign Up
                </button>
            </div>
            <p id="errmsg">{message}</p>
        </form>
    );
}

export default SignupForm;
