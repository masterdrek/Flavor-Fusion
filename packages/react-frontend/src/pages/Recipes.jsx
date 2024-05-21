import React from "react";
import "../styles/Recipes.css";
import { Link } from "react-router-dom";

function Recipes() {
    const savedRecipes = [
        { id: 1, name: "Spaghetti Carbonara" },
        { id: 2, name: "Chicken Parmesan" },
        { id: 3, name: "Caesar Salad" },
        { id: 4, name: "Spaghetti Carbonara" },
        { id: 5, name: "Chicken Parmesan" },
        { id: 6, name: "Caesar Salad" }
    ];

    const personalRecipes = [
        { id: 1, name: "Homemade Sushi" },
        { id: 2, name: "Beef Stroganoff" },
        { id: 3, name: "Vegetarian Pizza" },
        { id: 4, name: "Homemade Sushi" },
        { id: 5, name: "Beef Stroganoff" },
        { id: 6, name: "Vegetarian Pizza" }
    ];


    return (
        <div className="recipes-container">
            <section>
                <div className="add-recipe">
                    <Link to="/add_recipe">
                        <button className="add-recipe-btn">
                            + Add Recipes
                        </button>
                    </Link>
                </div>
                <h2>Personal Recipes</h2>
                <div className="scrollable-container">
                    <div className="recipe-list">
                        {personalRecipes.map((recipe, index) => (
                            <div key={index} className="recipe-card">
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
                        {savedRecipes.map((recipe, index) => (
                            <div key={index} className="recipe-card">
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
