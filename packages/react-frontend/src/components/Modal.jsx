import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

function Modal({
    onClose,
    onSubmit,
    initialName = "",
    initialQuantity = "",
    showQuantity = true,
    isStep = false,
    isNew = false
}) {
    const [itemType, setItemType] = useState("cookware");
    const [itemName, setItemName] = useState(initialName);
    const [itemQuantity, setItemQuantity] = useState(initialQuantity);

    const setTypeCookware = (e) => {
        e.preventDefault();
        setItemType("cookware");
    };

    const setTypeIngredient = (e) => {
        e.preventDefault();
        setItemType("ingredient");
    };

    useEffect(() => {
        setItemName(initialName);
        setItemQuantity(initialQuantity);
    }, [initialName, initialQuantity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        isNew
            ? onSubmit({
                  name: itemName,
                  quantity: itemQuantity,
                  type: itemType
              })
            : onSubmit({ name: itemName, quantity: itemQuantity });
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
                    {isNew && (
                        <div className="type-options">
                            <span className="type-text">cookware</span>
                            <button
                                className={"type-button cookware-" + itemType}
                                onClick={setTypeCookware}
                            />
                            <button
                                className={"type-button ingredient-" + itemType}
                                onClick={setTypeIngredient}
                            />
                            <span> ingredient</span>
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
