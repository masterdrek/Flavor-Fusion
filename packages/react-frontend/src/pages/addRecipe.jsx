import React, { useState } from "react";
import "../styles/addRecipe.css";

function addRecipe() {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Input value: ${inputValue}`); /* Can change for backend stuff */
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="textbox"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter Recipe Name"
                />
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default addRecipe;
