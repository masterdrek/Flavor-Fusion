import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from './../api/api.js'
import "../styles/createAccount.css";

function createAccount() {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const userObj = { firstName, username, password }

    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [matchPassword, setMatchPassword] = useState(true)
    const [message, setMessage] = useState('')

    const USERNAME_RGX = /^[0-9a-zA-Z_.]{5,15}$/
    const PASSWORD_RGX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/
    const PASSWORD_TXT = "Must contain at least one number, one uppercase and lowercase letter, and at least 8 - 25 characters"

    const [success, setSuccess] = useState(false)
    
    // sends user to home page on success
    useEffect(() => {
        if (success) {
            setFirstName('')
            setUsername('')
            setPassword('')
            setRePassword('')
            navigate('/')
        }
    }, [success, navigate])

    // checks for valid username regex
    useEffect(() => {
        setValidUsername(USERNAME_RGX.test(username))
    }, [username])

    // checks if inputs follow patterns and passwords are equivalent
    useEffect(() => {
        setValidPassword(PASSWORD_RGX.test(password) && PASSWORD_RGX.test(rePassword))
        setMatchPassword(password === rePassword)
    }, [password, rePassword])



    // submits data
    const handleSubmit = async (e) => {
        e.preventDefault()
        // checks constraints on inputs
        if (validUsername && validPassword && matchPassword && !isLoading) {
            // creates new user and recieves new token
            const token = await createUser(userObj)
            if (token) {
                // successfully created, triggers useEffect surrounding navigate to go to Home 
                setSuccess(() => true)
                setMessage("User created")
            } else {
                setMessage("Token not recieved")
            }
        // sets messages to display if inputs are invalid
        } else if (!validUsername) {
            setMessage("Username is invalid")
        } else if (!validPassword) {
            setMessage("Password is invalid")
        } else if (!matchPassword) {
            setMessage("Passwords do not match")
        } 
    }

    async function createUser(user) {
        console.log("Posting user:", user);
        try {
            const response = await fetch(API_URL+"/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`Error posting data: ${response.statusText}`);
            }

            const token = await response.json();
            sessionStorage.setItem("token", `${token}`)
            console.log("JWT token:", sessionStorage.getItem("token"))
        } catch (error) {
            console.error("Error in createUser:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">
                    First Name
                </label>
                <input 
                    type="text" 
                    id="firstName"
                    placeholder="Enter Your First Name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="username">
                    Username
                </label>
                <input 
                    type="text" 
                    id="username"
                    placeholder="Enter an Unique Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="pass">
                    Password
                </label>
                <input 
                    type="password" 
                    id="pass"
                    placeholder="Enter Your Password" 
                    autoComplete="on"
                    title={PASSWORD_TXT}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="rePass">
                    Re-Enter Password
                </label>
                <input 
                    type="password" 
                    id="rePass"
                    placeholder="Re-Enter Your Password" 
                    autoComplete="on"
                    title={PASSWORD_TXT}
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />
            </div>
            <button type="submit">Sign Up</button>
            <p id="errmsg">{ message }</p>
        </form>
    );
}


export default createAccount;
