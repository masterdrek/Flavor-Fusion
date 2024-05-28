import recipeModel from "../models/recipe-schema.js";
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

function deleteRecipeById(id) {
    return recipeModel.findOneAndDelete({ _id: id }).exec();
}


export default {
    getRecipes,
    getUserMadeRecipes,
    createRecipe,
    getRecipeById,
    deleteRecipeById,
};
