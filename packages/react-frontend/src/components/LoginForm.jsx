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

    // checks if inputs follow criteria
    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    // to test inputs / txt box message
    const USERNAME_RGX = /^[0-9a-zA-Z_.]{5,15}$/
    const PASSWORD_RGX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/

    // message to display on err
    const [message, setMessage] = useState('')

    // sets if success for navigate
    const [success, setSuccess] = useState(false)

    // checks for valid username regex
    useEffect(() => {
        setValidUsername(USERNAME_RGX.test(username));
    }, [username]);

    // checks if inputs follow patterns and passwords are equivalent
    useEffect(() => {
        setValidPassword(
            PASSWORD_RGX.test(password)
        );
    }, [password]);
    
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
            })
            const json = await response.json()

            if ((response.status == 401) &&  json.message.includes('username')) {
                setMessage("Username was incorrect")
                return null
            }  else if ((response.status == 401) && json.message.includes('password')) {
                setMessage("Password was incorrect")
                return null
            } else if (response.status !== 201) {
                setMessage("Error logging in")
            }

            // get token from response and set value in sessionStorage
            const { token } = json
            if (token) {
                sessionStorage.setItem("token", token)
                return token
            }
        } catch (error) {
            console.error("Error in loginUser:", error);
        }
    }

    // submits data
    const handleSubmit = async (e) => {
        e.preventDefault()

        // authorizes user and recieves new token
        const loginSuccess = await loginUser(userObj)
        if (!loginSuccess) {
            return null
        }

        // successfully created, triggers useEffect surrounding navigate to go to Home 
        if (sessionStorage.getItem("token")) {
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
