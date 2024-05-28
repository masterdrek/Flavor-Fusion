import User from "../models/user-schema.js";
import { addInventory } from "./inventory-services.js";
import { createRecipe } from "./recipe-services.js";
import connect from "../mongoSetup.js";

connect();

function getUsers() {
    const users = User.find().lean().exec()
    return users
}

async function getUserByUsername(user) {
    const foundUser = await User.findOne({ username: user }).lean().exec()
    if (!foundUser) {
        return null
    } else {
        return foundUser
    }
}


async function addUser(newName, newUsername, newHashedPwd) {

    const newUser = {
            name: newName,
            username: newUsername,
            hashedPassword: newHashedPwd,
            inventory: [],
            saved_recipes: []
        }

    const promise = User.create(newUser);
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
