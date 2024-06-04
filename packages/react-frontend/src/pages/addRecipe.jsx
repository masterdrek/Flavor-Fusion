import "../styles/addRecipe.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Modal from "../components/Modal";
import { BsFillPencilFill } from "react-icons/bs";

function AddRecipe() {
    // State for recipe name
    const [recipeName, setRecipeName] = useState("");

    // State for err on submit message
    const [message, setMessage] = useState("");

    // State for ingredients
    const [ingredientFilterText, setIngredientFilterText] = useState("");
    const [ingredientSelectedRows, setIngredientSelectedRows] = useState([]);
    const [ingredientEditItem, setIngredientEditItem] = useState(null);
    const [ingredientModalOpen, setIngredientModalOpen] = useState(false);
    const [isIngredientEditing, setIsIngredientEditing] = useState(false);
    const [ingredientData, setIngredientData] = useState([]);

    // State for cookware
    const [cookwareFilterText, setCookwareFilterText] = useState("");
    const [cookwareSelectedRows, setCookwareSelectedRows] = useState([]);
    const [cookwareEditItem, setCookwareEditItem] = useState(null);
    const [cookwareModalOpen, setCookwareModalOpen] = useState(false);
    const [isCookwareEditing, setIsCookwareEditing] = useState(false);
    const [cookwareData, setCookwareData] = useState([]);

    // State for steps
    const [stepFilterText, setStepFilterText] = useState("");
    const [stepSelectedRows, setStepSelectedRows] = useState([]);
    const [stepEditItem, setStepEditItem] = useState(null);
    const [stepModalOpen, setStepModalOpen] = useState(false);
    const [isStepEditing, setIsStepEditing] = useState(false);
    const [stepData, setStepData] = useState([]);

    const navigate = useNavigate();

    const handleRefresh = () => {
        navigate("/", { replace: true }); // Navigate to the target path
        navigate(0); // Refresh the page
    };

    const handleButtonClick = () => {
        // makes sure there is a recipe name and sets err message if not
        if (!recipeName) {
            setMessage("Recipe name needed")
        } else {
            handleSaveRecipe(); // Save the recipe\
            navigate('/');
            setTimeout(() => {
                handleRefresh(); // Refresh the page after saving
            }, 0);
        }
    };

    // Ingredient columns for DataTable
    const ingredientColumns = [
        {
            name: "Ingredient",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Quantity",
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

    // Cookware columns for DataTable
    const cookwareColumns = [
        {
            name: "Cookware",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Quantity",
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

    // Step columns for DataTable
    const stepColumns = [
        {
            name: "Step",
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

    // UseEffect to log state changes
    useEffect(() => {
        console.log("Recipe Name:", recipeName);
    }, [recipeName]);

    useEffect(() => {
        console.log("Updated ingredient data:", ingredientData);
    }, [ingredientData]);

    useEffect(() => {
        console.log("Updated cookware data:", cookwareData);
    }, [cookwareData]);

    useEffect(() => {
        console.log("Updated step data:", stepData);
    }, [stepData]);

    // Handle saving the entire recipe
    const handleSaveRecipe = async () => {
        const recipeData = {
            name: recipeName,
            ingredients: ingredientData,
            cookware: cookwareData,
            instructions: stepData.map((step) => step.name),
            creator: "Andrew"
        };

        // Log state data before POST request
        console.log("Recipe data to be posted:", recipeData);

        try {
            const response = await fetch(
                "https://flavorfusion.azurewebsites.net/recipes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(recipeData)
                }
            );

            console.log(JSON.stringify(recipeData));

            if (!response.ok) {
                throw new Error(`Error posting data: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error in postIngredients:", error);
        }
    };

    // Ingredient handlers
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

    // When an ingredient edit icon is clicked, set the current item to be edited
    const handleIngredientEdit = (row) => {
        setIngredientEditItem(row);
        setIsIngredientEditing(true);
        setIngredientModalOpen(true);
    };

    // Submit the edit for the ingredient
    const handleIngredientEditSubmit = (editedItem) => {
        /* map through the data array and update the specific item by its ID. 
        This ensures only the edited item is updated without affecting the others. */
        const updatedData = ingredientData.map((item) =>
            item === ingredientEditItem
                ? {
                      ...item,
                      name: editedItem.name,
                      quantity: editedItem.quantity
                  }
                : item
        );
        setIngredientData(updatedData);
        setIngredientEditItem(null);
        setIsIngredientEditing(false);
    };

    // Handle the submission of the ingredient modal
    const handleIngredientModalSubmit = (newItem) => {
        if (isIngredientEditing) {
            handleIngredientEditSubmit(newItem);
        } else {
            setIngredientData([...ingredientData, newItem]);
        }
        setIngredientModalOpen(false);
    };

    const handleIngredientModalClose = () => {
        setIngredientModalOpen(false);
        setIngredientEditItem(null);
        setIsIngredientEditing(false);
    };

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

    const handleCookwareEditSubmit = (editedItem) => {
        const updatedData = cookwareData.map((item) =>
            item === cookwareEditItem
                ? {
                      ...item,
                      name: editedItem.name,
                      quantity: editedItem.quantity
                  }
                : item
        );
        setCookwareData(updatedData);
        setCookwareEditItem(null);
        setIsCookwareEditing(false);
    };

    const handleCookwareModalSubmit = (newItem) => {
        if (isCookwareEditing) {
            handleCookwareEditSubmit(newItem);
        } else {
            setCookwareData([...cookwareData, newItem]);
        }
        setCookwareModalOpen(false);
    };

    const handleCookwareModalClose = () => {
        setCookwareModalOpen(false);
        setCookwareEditItem(null);
        setIsCookwareEditing(false);
    };

    // Step handlers
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

    const handleStepEditSubmit = (editedItem) => {
        const updatedData = stepData.map((item) =>
            item === stepEditItem
                ? {
                      ...item,
                      name: editedItem.name
                  }
                : item
        );
        setStepData(updatedData);
        setStepEditItem(null);
        setIsStepEditing(false);
    };

    const handleStepModalSubmit = (newItem) => {
        if (isStepEditing) {
            handleStepEditSubmit(newItem);
        } else {
            setStepData([...stepData, newItem]);
        }
        setStepModalOpen(false);
    };

    const handleStepModalClose = () => {
        setStepModalOpen(false);
        setStepEditItem(null);
        setIsStepEditing(false);
    };

    return (
        <div className="add-recipe-scrollable-container">
            <Link to="/">
                <button className="back-button">Back</button>
            </Link>
            <div className="recipe-name-tb">
                <input
                    placeholder="Enter Recipe Name"
                    onChange={(e) => setRecipeName(e.target.value)}
                />
            </div>

            {/* Ingredients Section */}
            <div className="table-container-two">
                <h3>Add Your Ingredients</h3>
                <div className="toolbar-two">
                    <div className="search-bar-two">
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
                    <div className="actions-bar-two">
                        <button
                            onClick={handleIngredientDelete}
                            disabled={ingredientSelectedRows.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className="add-bar-two">
                        <button onClick={() => setIngredientModalOpen(true)}>
                            Add Ingredient
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={ingredientColumns}
                    data={ingredientData}
                    selectableRows
                    onSelectedRowsChange={handleIngredientRowSelected}
                    pagination
                />

                {ingredientModalOpen && (
                    <Modal
                        onClose={handleIngredientModalClose}
                        onSubmit={handleIngredientModalSubmit}
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

            {/* Cookware Section */}
            <div className="table-container-two">
                <h3>Add Your Cookware</h3>
                <div className="toolbar-two">
                    <div className="search-bar-two">
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
                    <div className="actions-bar-two">
                        <button
                            onClick={handleCookwareDelete}
                            disabled={cookwareSelectedRows.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className="add-bar-two">
                        <button onClick={() => setCookwareModalOpen(true)}>
                            Add Cookware
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={cookwareColumns}
                    data={cookwareData}
                    selectableRows
                    onSelectedRowsChange={handleCookwareRowSelected}
                    pagination
                />

                {cookwareModalOpen && (
                    <Modal
                        onClose={handleCookwareModalClose}
                        onSubmit={handleCookwareModalSubmit}
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

            {/* Steps Section */}
            <div className="table-container-two">
                <h3>Add Your Steps</h3>
                <div className="toolbar-two">
                    <div className="search-bar-two">
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
                    <div className="actions-bar-two">
                        <button
                            onClick={handleStepDelete}
                            disabled={stepSelectedRows.length === 0}
                        >
                            Delete Selected
                        </button>
                    </div>
                    <div className="add-bar-two">
                        <button onClick={() => setStepModalOpen(true)}>
                            Add Recipe Step
                        </button>
                    </div>
                </div>

                <DataTable
                    columns={stepColumns}
                    data={stepData}
                    selectableRows
                    onSelectedRowsChange={handleStepRowSelected}
                    pagination
                />

                {stepModalOpen && (
                    <Modal
                        onClose={handleStepModalClose}
                        onSubmit={handleStepModalSubmit}
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
                <p>{message}</p>
                <button className="save-button" onClick={handleButtonClick}>
                    Save Recipe
                </button>
            </div>
        </div>
    );
}

export default AddRecipe;
