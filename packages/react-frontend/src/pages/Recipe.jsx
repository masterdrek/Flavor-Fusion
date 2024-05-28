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
    const ingredients = [
        { name: "salt", quantity: 2 },
        { name: "pepper", quantity: 1 }
    ];
    const cookware = [
        { name: "spoon", quantity: 2 },
        { name: "pan", quantity: 2 },
        { name: "bowl", quantity: 3 }
    ];
    const instructions = [
        "boil water",
        "put in noodle",
        "wait 10 min",
        "drain",
        "eat"
    ];
    const recipeName = "Noodle";
    const creatorName = "bob";

    useEffect(() => {
        fetchRecipe()
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json.recipe[0]);
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
            <p> recipe id: {recipeId}</p>
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
