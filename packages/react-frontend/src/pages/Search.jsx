import React, { useState, useEffect } from "react";
import "../styles/Search.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { fetchInventory } from "../api/inventoryApi";
import { jwtDecode } from "jwt-decode";

const Search = () => {
    const [query, setQuery] = useState(""); // State to hold the search query entered by the user
    const [recipes, setRecipes] = useState([]); // State to hold the list of recipes fetched from the server
    const [filteredRecipes, setFilteredRecipes] = useState([]); // State to hold the list of recipes filtered based on the search query
    const [filter, setFilter] = useState("All"); // State for selected filter
    const [inventory, setInventory] = useState([]); // State to hold the inventory data
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setUsername(jwtDecode(token)?.username);
        } else {
            setUsername("Guest_User");
        }
    }, []);

    const getInventory = (username, setData) => {
        if (username !== "") {
            fetchInventory(username)
                .then((json) => {
                    console.log("Fetched Data:", json);
                    setData(
                        Array.isArray(
                            json.inventory.ingredients.concat(
                                json.inventory.cookware
                            )
                        )
                            ? json.inventory.ingredients.concat(
                                  json.inventory.cookware
                              )
                            : []
                    );
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    };

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
            console.log("Fetched Recipes:", json); // Log the fetched data for debugging
            setRecipes(
                Array.isArray(json.recipes_list) ? json.recipes_list : []
            ); // Update the recipes state with the fetched data
            setFilteredRecipes(
                Array.isArray(json.recipes_list) ? json.recipes_list : []
            ); // Also update the filteredRecipes state with the fetched data initially
        });
    }, []); // Empty dependency array means this effect runs only once when the component loads

    // useEffect to filter recipes based on the search query and selected filter
    useEffect(() => {
        const lowerCaseQuery = query.toLowerCase(); // Convert the search query to lowercase for case-insensitive comparison

        // Extract inventory names
        const inventoryIngredients = inventory.map((item) =>
            item.name.toLowerCase()
        );

        console.log(inventoryIngredients);

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
