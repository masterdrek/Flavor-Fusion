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
    const [itemName, setItemName] = useState(initialName);
    const [itemQuantity, setItemQuantity] = useState(initialQuantity);

    useEffect(() => {
        setItemName(initialName);
        setItemQuantity(initialQuantity);
    }, [initialName, initialQuantity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name: itemName, quantity: itemQuantity });
        onClose();
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
                            onChange={(e) => setItemName(e.target.value)}
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
                                }
                            />
                        </div>
                    )}
                    <div className="button-group">
                        <button type="submit" className="btn">
                            Submit
                        </button>
                        <button
                            type="button"
                            className="btn cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
