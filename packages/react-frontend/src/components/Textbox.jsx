// src/TextBoxComponent.js
import React, { useState } from "react";
import "../styles/Textbox.css";

const TextBoxComponent = ({ placeholder, type = "text" }) => {
    const [inputValue, setInputValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Input value: ${inputValue}`); /* Can change for backend stuff */
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="text-container">
            <form onSubmit={handleSubmit}>
                <input
                    type={showPassword ? "text" : type}
                    className="textbox"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                />
            </form>
            {type === "password" && (
                <div className="show-password-container">
                    <input
                        type="checkbox"
                        id="show-password"
                        checked={showPassword}
                        onChange={toggleShowPassword}
                    />
                    <label htmlFor="show-password">Show Password</label>
                </div>
            )}
        </div>
    );
};

export default TextBoxComponent;
