import React, { useState, useEffect, useRef } from "react";
import "../styles/Recipes.css";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"; // Importing the three-dots icon from react-icons

function Recipes() {
    const savedRecipes = [];

    const [personalRecipes, setPersonalRecipes] = useState([]); // State to store personal recipes
    const [selectedRecipes, setSelectedRecipes] = useState([]); // State for selected recipes
    const [showDropdown, setShowDropdown] = useState(null); // State for showing dropdown menu

    const dropMenu = useRef(null);
    const closeDropdown = (e) => {
        if (showDropdown && !dropMenu.current?.contains(e.target)) {
            setShowDropdown(false);
        }
    };

    document.addEventListener("mousedown", closeDropdown);

    // Fetch recipes when the component mounts
    useEffect(() => {
        fetchRecipes()
            .then((json) => {
                console.log("Fetched Data:", json);
                setPersonalRecipes(
                    Array.isArray(json.recipes_list) ? json.recipes_list : []
                );
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Function to fetch recipes from the server
    async function fetchRecipes() {
        const response = await fetch("http://localhost:8000/recipes");
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }

    // Function to handle recipe selection (for visual feedback)
    const handleSelectRecipe = (recipeId) => {
        setSelectedRecipes((prevSelected) => {
            if (prevSelected.includes(recipeId)) {
                return prevSelected.filter((id) => id !== recipeId);
            } else {
                return [...prevSelected, recipeId];
            }
        });
    };

    // Function to toggle the dropdown menu for each recipe card
    const handleDropdownToggle = (recipeId) => {
        // Toggle the dropdown menu for the specific recipe
        setShowDropdown((prev) => (prev === recipeId ? null : recipeId));
    };

    // Function to handle the deletion of a single recipe
    const handleDeleteSingleRecipe = async (recipeId) => {
        try {
            const response = await fetch(
                `http://localhost:8000/recipes/${recipeId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Error deleting data: ${response.statusText}`);
            }

            // Update the state to remove the deleted recipe
            const updatedRecipes = personalRecipes.filter(
                (recipe) => recipe._id !== recipeId
            );
            setPersonalRecipes(updatedRecipes);

            console.log(`Recipe with ID ${recipeId} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    return (
        <div className="recipes-container">
            <section>
                <div className="button-options">
                    <Link to="/add_recipe">
                        <button className="add-recipe-btn">
                            + Add Recipes
                        </button>
                    </Link>
                </div>
                <h2>Personal Recipes ({personalRecipes.length})</h2>
                <div className="scrollable-container">
                    <div className="recipe-list">
                        {personalRecipes.map((recipe) => (
                            <div
                                key={recipe._id} // Use _id from fetched data
                                className={`recipe-card ${
                                    selectedRecipes.includes(recipe._id)
                                        ? "selected"
                                        : ""
                                }`}
                            >
                                <Link
                                    to={`/recipe/${recipe._id}`}
                                    className="recipe-link"
                                >
                                    <div
                                        onClick={() =>
                                            handleSelectRecipe(recipe._id)
                                        }
                                    >
                                        {recipe.name}
                                    </div>
                                </Link>
                                <div
                                    className="dropdown-container"
                                    onClick={(e) => {
                                        // Prevent the click event from propagating to the parent elements
                                        e.stopPropagation();
                                        handleDropdownToggle(recipe._id); // Toggle dropdown menu
                                    }}
                                >
                                    {/* Three-dots icon */}
                                    <FaEllipsisV className="dropdown-icon" />{" "}
                                    {/* showDropdown is a state variable that keeps track of 
                                    which recipe card's dropdown menu should be displayed.
                                    If showDropdown matches recipe._id, it means the dropdown menu 
                                    for this specific recipe card should be visible.*/}
                                    {showDropdown === recipe._id && ( // Conditionally render dropdown menu
                                        <div
                                            className="dropdown-menu"
                                            ref={dropMenu}
                                        >
                                            <button
                                                onClick={(e) => {
                                                    // Prevent the click event from propagating to the parent elements
                                                    /* clicking on the delete button inside the dropdown could trigger 
                                                       other click handlers attached to parent elements, leading to unintended behavior. 
                                                       like accidently going into the individual recipe page*/
                                                    e.stopPropagation();
                                                    handleDeleteSingleRecipe(
                                                        recipe._id
                                                    ); // Handle recipe deletion
                                                    setShowDropdown(null); // Hide dropdown menu after deletion
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section>
                <h2>Saved Recipes ({savedRecipes.length})</h2>
                <div className="scrollable-container">
                    <div className="recipe-list">
                        {savedRecipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card">
                                {recipe.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Recipes;
