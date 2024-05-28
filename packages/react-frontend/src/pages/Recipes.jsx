import React, { useState, useEffect } from "react";
import "../styles/Recipes.css";
import { Link } from "react-router-dom";

function Recipes() {
    const savedRecipes = [
        { id: 1, name: "Spaghetti Carbonara" },
        { id: 2, name: "Chicken Parmesan" },
        { id: 3, name: "Caesar Salad" },
        { id: 4, name: "Lasagna" },
        { id: 5, name: "Pizza" },
        { id: 6, name: "Burger" }
    ];

    const [personalRecipes, setPersonalRecipes] = useState([]); // Initial empty data
    const [selectedRecipes, setSelectedRecipes] = useState([]); // State for selected recipes

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

    async function fetchRecipes() {
        const response = await fetch("http://localhost:8000/recipes");
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }

    const handleSelectRecipe = (recipeId) => {
        setSelectedRecipes((prevSelected) => {
            if (prevSelected.includes(recipeId)) {
                return prevSelected.filter((id) => id !== recipeId);
            } else {
                return [...prevSelected, recipeId];
            }
        });
    };

    const handleDeleteRecipes = async () => {
        const updatedRecipes = personalRecipes.filter(
            (recipe) => !selectedRecipes.includes(recipe._id)
        );
        setPersonalRecipes(updatedRecipes);

        try {
            const response = await fetch("http://localhost:8000/recipes", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ids: selectedRecipes })
            });

            if (!response.ok) {
                throw new Error(`Error deleting data: ${response.statusText}`);
            }

            setSelectedRecipes([]);
        } catch (error) {
            console.error("Error deleting recipes:", error);
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
                    <button
                        className="delete-recipe-btn"
                        onClick={handleDeleteRecipes}
                        disabled={selectedRecipes.length === 0}
                    >
                        - Delete Recipe
                    </button>
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
                                onClick={() => handleSelectRecipe(recipe._id)}
                            >
                                {recipe.name}
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
