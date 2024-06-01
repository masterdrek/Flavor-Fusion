import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

function Modal({
    onClose,
    onSubmit,
    initialName = "",
    initialQuantity = "",
    showQuantity = true,
    isStep = false
}) {
    // State variables to hold the values of the input fields
    const [itemName, setItemName] = useState(initialName);
    const [itemQuantity, setItemQuantity] = useState(initialQuantity);

    // Effect hook to update the state variables when initialName or initialQuantity changes
    useEffect(() => {
        setItemName(initialName);
        setItemQuantity(initialQuantity);
    }, [initialName, initialQuantity]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission, keeps user on the same page after submitting data
        onSubmit({ name: itemName, quantity: itemQuantity }); // Call onSubmit with the current values
        onClose(); // Close the modal after submission
    };

    return (
        <div className="modal-container">
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="item">
                            {isStep ? "Recipe Step" : "Item"}
                        </label>
                        <input
                            type="text"
                            id="item"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)} // Update itemName state when input changes
                        />
                    </div>
                    {showQuantity && (
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="text"
                                id="quantity"
                                value={itemQuantity}
                                onChange={(e) =>
                                    setItemQuantity(e.target.value)
                                } // Update itemQuantity state when input changes
                            />
                        </div>
                    )}
                    <button type="submit" className="btn">
                        Submit
                    </button>
                    <button type="button" className="btn" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
