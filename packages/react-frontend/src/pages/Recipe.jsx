import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeIngredients from "../components/RecipeIngredients";
import RecipeCookware from "../components/RecipeCookware";
import "../styles/Recipe.css";
import RecipeInstructions from "../components/RecipeInstructions";
import Divider from "../components/Divider";
import { FaArrowLeft } from "react-icons/fa";

function Recipe() {
    const [saveStatus, setSaveStatus] = useState("Save");
    const [recipe, setRecipe] = useState({
        name: "",
        creator: "",
        ingredients: [],
        instructions: [],
        cookware: []
    });

    const { recipeId } = useParams();

    useEffect(() => {
        fetchRecipe()
            .then((resp) => resp.json())
            .then((json) => {
                setRecipe(json.recipe[0]);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [recipeId]);

    useEffect(() => {
        changeColors(); // Change colors when the component loads
    }, []); // want it to do it once only

    async function fetchRecipe() {
        const promise = await fetch(`http://localhost:8000/recipe/${recipeId}`);
        if (!promise.ok) {
            throw new Error(`Error fetching data: ${promise.statusText}`);
        }
        return promise;
    }

    const changeSavedStatus = () => {
        setSaveStatus(saveStatus === "Save" ? "Unsave" : "Save");
    };

    const changeColors = () => {
        // Define an array of color schemes, each with a primary and a secondary color.
        const colors = [
            { primary: "#FF6F61", secondary: "#FFB88C" }, // Coral and light coral
            { primary: "#6B5B95", secondary: "#B8A9C9" }, // Purple and light purple
            { primary: "#88B04B", secondary: "#EFC050" }, // Green and light yellow
            { primary: "#F7CAC9", secondary: "#92A8D1" }, // Light pink and light blue
            { primary: "#955251", secondary: "#B565A7" } // Brown and light magenta
        ];

        // Select a random color scheme from the array
        // Multiplying by the length of the colors array ensures the random number is within the array's index range
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Update CSS variables with the selected colors
        // document.documentElement refers to the root element of the document (i.e., the <html> element)
        // style.setProperty sets the value of a custom property
        // "--primary-color" is the name of the custom property being set
        // randomColor.primary is the value being assigned to the custom property

        // Set the primary color for various elements
        document.documentElement.style.setProperty(
            "--primary-color",
            randomColor.primary
        );

        // Set the secondary color for hover effects or other elements
        document.documentElement.style.setProperty(
            "--secondary-color",
            randomColor.secondary
        );

        // Set the primary color for button borders
        document.documentElement.style.setProperty(
            "--button-border-color",
            randomColor.primary
        );

        // Set the primary color for button text
        document.documentElement.style.setProperty(
            "--button-text-color",
            randomColor.primary
        );
    };

    return (
        <div className="recipe-page">
            <div className="recipe-header">
                <div className="backarrow">
                    <Link to="/">
                        <FaArrowLeft className="back-arrow-icon" />
                    </Link>
                </div>
                <h1 className="recipe-name">{recipe.name}</h1>
                <button
                    className={`save-button ${saveStatus.toLowerCase()}`}
                    onClick={changeSavedStatus}
                >
                    {saveStatus}
                </button>
            </div>
            <h3 className="recipe-creator">Created by: {recipe.creator}</h3>

            <Divider />
            <div className="details">
                <div className="section-header">Ingredients & Cookware</div>
                <div className="ingr-cook-needed">
                    <RecipeIngredients ingredients={recipe.ingredients} />
                    <RecipeCookware cookware={recipe.cookware} />
                </div>
                <div className="section-header">Instructions</div>
                <div className="instructions">
                    <RecipeInstructions instructions={recipe.instructions} />
                </div>
            </div>
        </div>
    );
}

export default Recipe;
