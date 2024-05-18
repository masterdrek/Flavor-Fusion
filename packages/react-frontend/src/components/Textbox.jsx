// src/TextBoxComponent.js
import React, { useState } from "react";


const TextBoxComponent = () => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Input value: ${inputValue}`); /* Can change for backend stuff */
    };

    return (
        <div className="text-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="textbox"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter Recipe Name"
                />
                <button type="save" className="save-button">
                    Save
                </button>
            </form>
        </div>
    );
};

export default TextBoxComponent;
