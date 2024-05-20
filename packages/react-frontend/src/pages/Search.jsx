import React from "react";
import "../styles/Search.css";

const Search = () => {
    const searched = [
        { id: 1, name: "Spaghetti Carbonara" },
        { id: 2, name: "Chicken Parmesan" },
        { id: 3, name: "Caesar Salad" }
    ];

    const recommended = [
        { id: 1, name: "Homemade Sushi" },
        { id: 2, name: "Beef Stroganoff" },
        { id: 3, name: "Vegetarian Pizza" }
    ];

    return (
        <div className="recipes-container">
            <section>
                <h2>Searched Recipes ({searched.length})</h2>
                <div className="recipe-list">
                    {searched.map((recipe, index) => (
                        <div key={index} className="recipe-card">
                            {recipe.name}
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2>Recommended Recipes</h2>
                <div className="recipe-list">
                    {recommended.map((recipe, index) => (
                        <div key={index} className="recipe-card">
                            {recipe.name}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Search;
