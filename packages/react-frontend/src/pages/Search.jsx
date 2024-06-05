import React, { useState, useEffect } from "react";
import "../styles/Search.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { getInventory, fetchInventory } from "../api/inventoryApi";
import { getUsernameFromToken } from "../utils/utils";

const Search = () => {
    const [query, setQuery] = useState(""); // State to hold the search query entered by the user
    const [recipes, setRecipes] = useState([]); // State to hold the list of recipes fetched from the server
    const [filteredRecipes, setFilteredRecipes] = useState([]); // State to hold the list of recipes filtered based on the search query
    const [filter, setFilter] = useState("All"); // State for selected filter
    const [inventory, setInventory] = useState([]); // State to hold the inventory data
    const [username, setUsername] = useState("");

    useEffect(() => {
        setUsername(getUsernameFromToken());
    }, []);

    useEffect(() => {
        getInventory(username, setInventory);
    }, [username]);

    // useEffect to fetch recipes when the component loads
    useEffect(() => {
        // Function to fetch recipes from the server
        async function fetchSearchResult() {
            try {
                const response = await fetch("http://localhost:8000/recipes"); // Make a GET request to the server to fetch recipes
                if (!response.ok) {
                    throw new Error(
                        `Error fetching data: ${response.statusText}`
                    );
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        // Call the fetch function and update state
        fetchSearchResult().then((json) => {
            console.log("Fetched Data:", json); // Log the fetched data for debugging
            setRecipes(
                Array.isArray(json.recipes_list) ? json.recipes_list : []
            ); // Update the recipes state with the fetched data
            setFilteredRecipes(
                Array.isArray(json.recipes_list) ? json.recipes_list : []
            ); // Also update the filteredRecipes state with the fetched data initially
        });
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    // useEffect to fetch inventory when the component mounts
    useEffect(() => {
        // Function to fetch inventory from the server
        fetchInventory().then((json) => {
            console.log("Fetched Inventory:", json); // Log the fetched data for debugging
            setInventory(
                Array.isArray(json.inventory_list) ? json.inventory_list : []
            ); // Update the inventory state with the fetched data
        });
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    // useEffect to filter recipes based on the search query and selected filter
    useEffect(() => {
        const lowerCaseQuery = query.toLowerCase(); // Convert the search query to lowercase for case-insensitive comparison

        // Extract inventory names
        const inventoryIngredients = inventory.map((item) =>
            item.name.toLowerCase()
        );

        let filteredByInventory = recipes.filter(
            (recipe) =>
                recipe.name.toLowerCase().includes(lowerCaseQuery) && // Filter recipes whose names include the search query
                (filter === "All" || recipe.category === filter) // Also filter recipes based on the selected category
        );

        if (filter === "Inventory") {
            filteredByInventory = recipes.filter((recipe) =>
                // Check if all of the recipe's ingredients exists in the User's inventory
                recipe.ingredients.every((ingredient) => {
                    return inventoryIngredients.includes(
                        ingredient.name.toLowerCase()
                    );
                })
            );
        }

        // Apply search query to the filtered recipes
        let finalFilteredRecipes = filteredByInventory.filter((recipe) =>
            recipe.name.toLowerCase().includes(lowerCaseQuery)
        );

        setFilteredRecipes(finalFilteredRecipes); // Update the filteredRecipes state with the filtered recipes
    }, [query, recipes, filter, inventory]); // This effect runs whenever the query, recipes, filter, or inventory state changes

    return (
        <div className="recipes-container">
            <div className="Search_Bar_container">
                <div className="search_bar">
                    <FaSearch className="search-icon" />{" "}
                    {/* Search icon inside the input field */}
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)} // Update the query state when the input value changes
                        placeholder="Search" // Placeholder text for the input field
                        className="search-input"
                    />
                    <div className="filter-dropdown">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)} // Update the filter state when the selected value changes
                            className="filter-select"
                        >
                            <option value="All">All</option>
                            <option value="Inventory">Inventory</option>
                        </select>
                    </div>
                </div>
            </div>

            {query || filter !== "All" ? ( // Conditional rendering based on whether there is a search query or a selected filter other than "All"
                <section>
                    <h2>Filtered Recipes ({filteredRecipes.length})</h2>{" "}
                    {/* Display the count of filtered recipes */}
                    <div className="recipe-list">
                        {filteredRecipes.map(
                            (
                                recipe // Map over the filtered recipes to display them
                            ) => (
                                <div key={recipe._id} className="recipe-card">
                                    <Link
                                        to={`/recipe/${recipe._id}`}
                                        className="recipe-link"
                                    >
                                        <div>{recipe.name}</div>
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </section>
            ) : (
                <section>
                    <h2>All Recipes ({recipes.length})</h2>{" "}
                    {/* Display the count of all recipes */}
                    <div className="recipe-list">
                        {recipes.map(
                            (
                                recipe // Map over all recipes to display them
                            ) => (
                                <div key={recipe._id} className="recipe-card">
                                    <Link
                                        to={`/recipe/${recipe._id}`}
                                        className="recipe-link"
                                    >
                                        <div>{recipe.name}</div>
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Search;
