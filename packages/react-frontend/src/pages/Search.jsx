import React, { useState } from "react";
import "../styles/Search.css";

const getFilteredRecipes = (query, recipes) => {
    if (!query) {
        return recipes;
    }
    const lowerCaseQuery = query.toLowerCase();
    return recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(lowerCaseQuery)
    );
};

const Search = () => {
    const [query, setQuery] = useState("");
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

    const filteredRecipes = getFilteredRecipes(query, searched);

    return (
        <div className="recipes-container">
            <div className="Search_Bar_container">
                <div className="search_bar">
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Recipes"
                        className="search-input"
                    />
                </div>
            </div>

            {query ? (
                <section>
                    <h2>Filtered Recipes ({filteredRecipes.length})</h2>
                    <div className="recipe-list">
                        {filteredRecipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card">
                                {recipe.name}
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <>
                    <section>
                        <h2>Searched Recipes ({searched.length})</h2>
                        <div className="recipe-list">
                            {searched.map((recipe) => (
                                <div key={recipe.id} className="recipe-card">
                                    {recipe.name}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h2>Recommended Recipes</h2>
                        <div className="recipe-list">
                            {recommended.map((recipe) => (
                                <div key={recipe.id} className="recipe-card">
                                    {recipe.name}
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default Search;
