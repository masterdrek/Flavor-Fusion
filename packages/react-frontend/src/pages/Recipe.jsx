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
    }, []);

    async function fetchRecipe() {
        const promise = await fetch("http://localhost:8000/recipe/" + recipeId);
        if (!promise.ok) {
            throw new Error(`Error fetching data: ${promise.statusText}`);
        }
        return promise;
    }

    const changeSavedStatus = () => {
        console.log("clicked, current: ", saveStatus);
        saveStatus === "Save" ? setSaveStatus("Unsave") : setSaveStatus("Save");
    };
    return (
        <div className="recipe-page">
            <div className="recipe-header">
                <div className="backarrow">
                    <Link to="/">
                        <FaArrowLeft className="back-arrow-icon"/>
                    </Link>
                </div>
                <h1 className="recipe-name">{recipe["name"]}</h1>
                <button
                    className={"save-button " + saveStatus}
                    onClick={changeSavedStatus}
                >
                    {saveStatus}
                </button>
            </div>
            <h3 className="recipe-creator">created by: {recipe["creator"]}</h3>

            <Divider />
            <div className="details">
                <div className="ingr-cook-needed">
                    <RecipeIngredients ingredients={recipe["ingredients"]} />
                    <RecipeCookware cookware={recipe["cookware"]} />
                </div>
                <div className="instructions">
                    <RecipeInstructions instructions={recipe["instructions"]} />
                </div>
            </div>
        </div>
    );
}

export default Recipe;
