import recipeModel from "../models/recipe.js";
import connect from "../mongoSetup.js";

connect();

function getRecipes() {
    return recipeModel.find();
}

function getUserMadeRecipes(id) {
    return recipeModel.find({ creator: id }).populate("creator");
}

function createRecipe(newRecipe) {
    const RecipeToAdd = new recipeModel(newRecipe);
    const promise = RecipeToAdd.save();
    return promise;
}

function getRecipeById(id) {
    return recipeModel.find({ _id: id });
}
export default {
    getRecipes,
    getUserMadeRecipes,
    createRecipe,
    getRecipeById
};
