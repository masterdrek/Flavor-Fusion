import userModel from "../models/user.js";
import inventoryServices from "./inventory-services.js";
import connect from "../mongoSetup.js";

connect();

function getUsers() {
    return userModel.find();
}

async function addUserByNameAndUsername(newName, newUsername) {
    const newInventory = await inventoryServices.addInventory({
        ingredients: [],
        cookware: []
    });
    const UserToAdd = new userModel({
        name: newName,
        username: newUsername,
        inventory: newInventory._id,
        saved_recipes: []
    });

    const promise = UserToAdd.save();
    return promise;
}

function isRecipeSaved(username, recipeId) {
    return userModel.findOne({ username: username}).then((user) => {
        return user.saved_recipes.includes(recipeId);
    });
}
function addSavedRecipe(username, recipeId) {
    return userModel.findOne({ username: username}).then((user) => {
        if (!user.saved_recipes.includes(recipeId)) {
            return userModel.updateOne(
                { username: username},
                {
                    $set: {
                        saved_recipes: [...user.saved_recipes, recipeId]
                    }
                }
            );
        }

    });
}

function removeSavedRecipe(username, recipeId) {
    return userModel.findOne({ username: username}).then((user) => {
        if (user.saved_recipes.includes(recipeId)) {
            let newRecipes = user.saved_recipes.filter((recipe) => recipe != recipeId)
            return userModel.updateOne(
                { username: username},
                {
                    $set: {
                        saved_recipes: newRecipes
                    }
                }
            );
        }

    });
}
export default {
    getUsers,
    addUserByNameAndUsername,
    addSavedRecipe,
    removeSavedRecipe,
    isRecipeSaved
};
