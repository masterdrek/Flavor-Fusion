import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeIngredients from "../components/RecipeIngredients";
import RecipeCookware from "../components/RecipeCookware";
import "../styles/Recipe.css";
import RecipeInstructions from "../components/RecipeInstructions";
import Divider from "../components/Divider";

function Recipe() {
    const [saveStatus, setSaveStatus] = useState("save");
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
        saveStatus === "save" ? setSaveStatus("unsave") : setSaveStatus("save");
    };
    return (
        <div className="recipe-page">
            <h1 className="recipe-name">{recipe["name"]}</h1>
            <h3 className="recipe-creator">created by: {recipe["creator"]}</h3>
            <button
                className={"save-button " + saveStatus}
                onClick={changeSavedStatus}
            >
                {saveStatus}
            </button>
            <Divider />
            <RecipeIngredients ingredients={recipe["ingredients"]} />
            <RecipeCookware cookware={recipe["cookware"]} />
            <RecipeInstructions instructions={recipe["instructions"]} />
        </div>
    );
}

export default Recipe;
