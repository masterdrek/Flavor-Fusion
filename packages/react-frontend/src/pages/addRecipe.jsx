import "../styles/addRecipe.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Textbox from "../components/Textbox";
import DataTable from "react-data-table-component";
import Modal from "../components/Modal";
import { BsFillPencilFill } from "react-icons/bs";

/* Need to add the backspace button and make sure that the NavBar is not present*/

function AddRecipe() {
    // State for ingredients table
    const [ingredientFilterText, setIngredientFilterText] = useState("");
    const [ingredientSelectedRows, setIngredientSelectedRows] = useState([]);
    const [ingredientEditItem, setIngredientEditItem] = useState(null);
    const [ingredientModalOpen, setIngredientModalOpen] = useState(false);
    const [isIngredientEditing, setIsIngredientEditing] = useState(false);
    const [ingredientData, setIngredientData] = useState([
        { id: 1, name: "Apple", quantity: "5" },
        { id: 2, name: "Ribeye Steak", quantity: "2" },
        { id: 3, name: "Eggs", quantity: "12" },
        { id: 4, name: "Chicken Wings", quantity: "16" }
    ]);

    // State for cookware table
    const [cookwareFilterText, setCookwareFilterText] = useState("");
    const [cookwareSelectedRows, setCookwareSelectedRows] = useState([]);
    const [cookwareEditItem, setCookwareEditItem] = useState(null);
    const [cookwareModalOpen, setCookwareModalOpen] = useState(false);
    const [isCookwareEditing, setIsCookwareEditing] = useState(false);
    const [cookwareData, setCookwareData] = useState([
        { id: 1, name: "Frying Pan", quantity: "1" },
        { id: 2, name: "Saucepan", quantity: "2" },
        { id: 3, name: "Spatula", quantity: "3" },
        { id: 4, name: "Whisk", quantity: "1" }
    ]);

    // State for steps table
    const [stepFilterText, setStepFilterText] = useState("");
    const [stepSelectedRows, setStepSelectedRows] = useState([]);
    const [stepEditItem, setStepEditItem] = useState(null);
    const [stepModalOpen, setStepModalOpen] = useState(false);
    const [isStepEditing, setIsStepEditing] = useState(false);
    const [stepData, setStepData] = useState([
        { id: 1, name: "Pour 1 half cup of water." },
        { id: 2, name: "Whisk the eggs" },
        { id: 3, name: "Make the flour" },
        { id: 4, name: "Eat the cake" }
    ]);

    const ingredientColumns = [
        {
            name: "The Inventory Item",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Unit Amount Size",
            selector: (row) => row.quantity,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <span
                    className="edit-icon"
                    onClick={() => handleIngredientEdit(row)}
                >
                    <BsFillPencilFill />
                </span>
            )
        }
    ];

    const cookwareColumns = [
        {
            name: "The Inventory Item",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Unit Amount Size",
            selector: (row) => row.quantity,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <span
                    className="edit-icon"
                    onClick={() => handleCookwareEdit(row)}
                >
                    <BsFillPencilFill />
                </span>
            )
        }
    ];

    const stepColumns = [
        {
            name: "The Recipe Steps",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <span className="edit-icon" onClick={() => handleStepEdit(row)}>
                    <BsFillPencilFill />
                </span>
            )
        }
    ];

    // Ingredients handlers
    const handleIngredientDelete = () => {
        const updatedData = ingredientData.filter(
            (item) => !ingredientSelectedRows.includes(item)
        );
        setIngredientData(updatedData);
        setIngredientSelectedRows([]);
    };

    const handleIngredientRowSelected = (state) => {
        setIngredientSelectedRows(state.selectedRows);
    };

    const handleIngredientEdit = (row) => {
        setIngredientEditItem(row);
        setIsIngredientEditing(true);
        setIngredientModalOpen(true);
    };

    const handleIngredientAddItem = (newItem) => {
        const newItemWithId = {
            ...newItem,
            id: ingredientData.length
                ? ingredientData[ingredientData.length - 1].id + 1
                : 1
        };
        setIngredientData([...ingredientData, newItemWithId]);
    };

    const handleIngredientEditSubmit = (editedItem) => {
        const updatedData = ingredientData.map((item) =>
            item.id === ingredientEditItem.id
                ? {
                      ...item,
                      name: editedItem.name,
                      quantity: editedItem.quantity
                  }
                : item
        );
        setIngredientData(updatedData);
        setIngredientEditItem(null);
    };

    const handleIngredientModalClose = () => {
        setIngredientModalOpen(false);
        setIngredientEditItem(null);
        setIsIngredientEditing(false);
    };

    const filteredIngredientData = ingredientData.filter((item) =>
        item.name.toLowerCase().includes(ingredientFilterText.toLowerCase())
    );

    // Cookware handlers
    const handleCookwareDelete = () => {
        const updatedData = cookwareData.filter(
            (item) => !cookwareSelectedRows.includes(item)
        );
        setCookwareData(updatedData);
        setCookwareSelectedRows([]);
    };

    const handleCookwareRowSelected = (state) => {
        setCookwareSelectedRows(state.selectedRows);
    };

    const handleCookwareEdit = (row) => {
        setCookwareEditItem(row);
        setIsCookwareEditing(true);
        setCookwareModalOpen(true);
    };

    const handleCookwareAddItem = (newItem) => {
        const newItemWithId = {
            ...newItem,
            id: cookwareData.length
                ? cookwareData[cookwareData.length - 1].id + 1
                : 1
        };
        setCookwareData([...cookwareData, newItemWithId]);
    };

    const handleCookwareEditSubmit = (editedItem) => {
        const updatedData = cookwareData.map((item) =>
            item.id === cookwareEditItem.id
                ? {
                      ...item,
                      name: editedItem.name,
                      quantity: editedItem.quantity
                  }
                : item
        );
        setCookwareData(updatedData);
        setCookwareEditItem(null);
    };

    const handleCookwareModalClose = () => {
        setCookwareModalOpen(false);
        setCookwareEditItem(null);
        setIsCookwareEditing(false);
    };

    const filteredCookwareData = cookwareData.filter((item) =>
        item.name.toLowerCase().includes(cookwareFilterText.toLowerCase())
    );

    // Steps handlers
    const handleStepDelete = () => {
        const updatedData = stepData.filter(
            (item) => !stepSelectedRows.includes(item)
        );
        setStepData(updatedData);
        setStepSelectedRows([]);
    };

    const handleStepRowSelected = (state) => {
        setStepSelectedRows(state.selectedRows);
    };

    const handleStepEdit = (row) => {
        setStepEditItem(row);
        setIsStepEditing(true);
        setStepModalOpen(true);
    };

    const handleStepAddItem = (newItem) => {
        const newItemWithId = {
            ...newItem,
            id: stepData.length ? stepData[stepData.length - 1].id + 1 : 1
        };
        setStepData([...stepData, newItemWithId]);
    };

    const handleStepEditSubmit = (editedItem) => {
        const updatedData = stepData.map((item) =>
            item.id === stepEditItem.id
                ? {
                      ...item,
                      name: editedItem.name
                  }
                : item
        );
        setStepData(updatedData);
        setStepEditItem(null);
    };

    const handleStepModalClose = () => {
        setStepModalOpen(false);
        setStepEditItem(null);
        setIsStepEditing(false);
    };

    const filteredStepData = stepData.filter((item) =>
        item.name.toLowerCase().includes(stepFilterText.toLowerCase())
    );

    return (
        <div>
            <Link to="/">
                <button className="back-button">Back</button>
            </Link>
            <Textbox />

            <div className="table-container">
                <h3>Add Your Ingredients</h3>
                <div className="toolbar">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={ingredientFilterText}
                            onChange={(e) =>
                                setIngredientFilterText(e.target.value)
                            }
                        />
                        {ingredientFilterText && (
                            <button onClick={() => setIngredientFilterText("")}>
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="actions-bar">
                        <button
                            onClick={handleIngredientDelete}
                            disabled={ingredientSelectedRows.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className="add-bar">
                        <button onClick={() => setIngredientModalOpen(true)}>
                            Add Ingredient{" "}
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={ingredientColumns}
                    data={filteredIngredientData}
                    selectableRows
                    onSelectedRowsChange={handleIngredientRowSelected}
                    pagination
                />

                {ingredientModalOpen && (
                    <Modal
                        onClose={handleIngredientModalClose}
                        onSubmit={
                            isIngredientEditing
                                ? handleIngredientEditSubmit
                                : handleIngredientAddItem
                        }
                        initialName={
                            isIngredientEditing && ingredientEditItem
                                ? ingredientEditItem.name
                                : ""
                        }
                        initialQuantity={
                            isIngredientEditing && ingredientEditItem
                                ? ingredientEditItem.quantity
                                : ""
                        }
                        showQuantity={true}
                    />
                )}
            </div>

            <div className="table-container">
                <h3>Add Your Cookware</h3>
                <div className="toolbar">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={cookwareFilterText}
                            onChange={(e) =>
                                setCookwareFilterText(e.target.value)
                            }
                        />
                        {cookwareFilterText && (
                            <button onClick={() => setCookwareFilterText("")}>
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="actions-bar">
                        <button
                            onClick={handleCookwareDelete}
                            disabled={cookwareSelectedRows.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className="add-bar">
                        <button onClick={() => setCookwareModalOpen(true)}>
                            Add Cookware{" "}
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={cookwareColumns}
                    data={filteredCookwareData}
                    selectableRows
                    onSelectedRowsChange={handleCookwareRowSelected}
                    pagination
                />

                {cookwareModalOpen && (
                    <Modal
                        onClose={handleCookwareModalClose}
                        onSubmit={
                            isCookwareEditing
                                ? handleCookwareEditSubmit
                                : handleCookwareAddItem
                        }
                        initialName={
                            isCookwareEditing && cookwareEditItem
                                ? cookwareEditItem.name
                                : ""
                        }
                        initialQuantity={
                            isCookwareEditing && cookwareEditItem
                                ? cookwareEditItem.quantity
                                : ""
                        }
                        showQuantity={true}
                    />
                )}
            </div>

            <div className="table-container">
                <h3>Add Your Recipe Steps</h3>
                <div className="toolbar">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={stepFilterText}
                            onChange={(e) => setStepFilterText(e.target.value)}
                        />
                        {stepFilterText && (
                            <button onClick={() => setStepFilterText("")}>
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="actions-bar">
                        <button
                            onClick={handleStepDelete}
                            disabled={stepSelectedRows.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className="add-bar">
                        <button onClick={() => setStepModalOpen(true)}>
                            Add Recipe Step{" "}
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={stepColumns}
                    data={filteredStepData}
                    selectableRows
                    onSelectedRowsChange={handleStepRowSelected}
                    pagination
                />

                {stepModalOpen && (
                    <Modal
                        onClose={handleStepModalClose}
                        onSubmit={
                            isStepEditing
                                ? handleStepEditSubmit
                                : handleStepAddItem
                        }
                        initialName={
                            isStepEditing && stepEditItem
                                ? stepEditItem.name
                                : ""
                        }
                        showQuantity={false}
                        isStep={true}
                    />
                )}
            </div>
            <div className="save-recipe-button">
                <Link to="/">
                    <button className="save-button">Save Recipe</button>
                </Link>
            </div>
        </div>
    );
}

export default AddRecipe;
