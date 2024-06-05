import React, { useState, useEffect, useRef } from "react";
import "../styles/Recipes.css";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa"; // Importing the three-dots icon from react-icons
import {
    getPersonalRecipes,
    handleDeleteSingleRecipe
} from "../api/recipesApi";
import { getUsernameFromToken } from "../utils/utils";
import { jwtDecode } from "jwt-decode";
import { fetchSavedRecipes } from "../api/savedRecipeApi";

function Recipes() {
    const [personalRecipes, setPersonalRecipes] = useState([]); // State to store personal recipes
    const [selectedRecipes, setSelectedRecipes] = useState([]); // State for selected recipes
    const [showDropdown, setShowDropdown] = useState(null); // State for showing dropdown menu
    const [username, setUsername] = useState("");

    const dropMenu = useRef(null);
    const closeDropdown = (e) => {
        if (showDropdown && !dropMenu.current?.contains(e.target)) {
            setShowDropdown(false);
        }
    };

    document.addEventListener("mousedown", closeDropdown);

    const [savedRecipes, setSavedRecipes] = useState([]); // Initial empty data array
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setUsername(jwtDecode(token)?.username);
        } else {
            setUsername("Guest_User");
        }
    }, []);

    const getSavedRecipe = (username, savedRecipes) => {
        if (username !== "" && username !== "Guest_User") {
            fetchSavedRecipes(username)
                .then((json) => {
                    console.log("Fetched GetSavedRecipe Data:", json);
                    setSavedRecipes(
                        Array.isArray(json.saved_recipes)
                            ? json.saved_recipes
                            : []
                    );
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    };
    useEffect(() => {
        getSavedRecipe(username, savedRecipes);
    }, [username]);

    // Fetch recipes when the component mounts
    useEffect(() => {
        setUsername(getUsernameFromToken());
    }, []);

    useEffect(() => {
        getPersonalRecipes(username, setPersonalRecipes);
    }, [username]);

    // Function to toggle the dropdown menu for each recipe card
    const handleDropdownToggle = (recipeId) => {
        // Toggle the dropdown menu for the specific recipe
        setShowDropdown((prev) => (prev === recipeId ? null : recipeId));
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
                                    <div>{recipe.name}</div>
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
                                                        recipe._id,
                                                        personalRecipes,
                                                        setPersonalRecipes
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
                                <Link
                                    to={`/recipe/${recipe._id}`}
                                    className="recipe-link"
                                >
                                    <div>{recipe.name}</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Recipes;
