import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../api/api.js'
import "../styles/Login.css";

function LoginForm() {

    // to navigate on submission
    const navigate = useNavigate()
    
    // states to save input
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userObj = { username, password }

    // message to display on err
    const [message, setMessage] = useState('')

    // sets if success for navigate
    const [success, setSuccess] = useState(false)
    
    // sends user to home page on success
    useEffect(() => {
        if (success) {
            setUsername('')
            setPassword('')
            navigate('/')
        }
    }, [success, navigate])


    // function to create user and add token to sessionStorage
    async function loginUser(userCreds) {
        console.log("Authing user:", userCreds);
        try {
            const response = await fetch(API_URL+"/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userCreds)
            });
            console.log(response)
            if (!(response.status === 200)) {
                throw new Error(`Error checking server data: ${response.statusText}`);
            }

            // get token from response and set value in sessionStorage
            const { token } = await response.json();
            sessionStorage.setItem("token", token)
            
        } catch (error) {
            console.error("Error in loginUser:", error);
        }
    }

    // submits data
    const handleSubmit = async (e) => {
        e.preventDefault()

        // authorizes user and recieves new token
        const tok = await loginUser(userObj)
        console.log(sessionStorage.getItem("token"))
        if (sessionStorage.getItem("token")) {
            // successfully created, triggers useEffect surrounding navigate to go to Home 
            setSuccess(() => true)
            setMessage("User logged in")
        } else {
            setMessage("Token not recieved from server")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-container">
                <label htmlFor="username">
                    <h3>Username</h3>
                </label>
                <input 
                    className="textbox"
                    type="text" 
                    id="username"
                    placeholder="Enter Your Username" 
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login-txt login-btn">Log In</button>
            </div>
            <p id="errmsg">{ message }</p>
        </form>
    );
}


export default LoginForm;
