import User from "../models/user.js";
import connect from "../mongoSetup.js";

connect();

function getUsers() {
    const users = User.find().lean().exec();
    return users;
}

async function getUserByUsername(user) {
    const foundUser = await User.findOne({ username: user }).lean().exec();
    if (!foundUser) {
        return null;
    } else {
        return foundUser;
    }
}

async function addUser(newName, newUsername, newHashedPwd) {
    const newUser = {
        name: newName,
        username: newUsername,
        hashedPassword: newHashedPwd,
        inventory: [],
        saved_recipes: []
    };

    const promise = User.create(newUser);
    return promise;
}

function isRecipeSaved(username, recipeId) {
    return User.findOne({ username: username }).then((user) => {
        return user.saved_recipes.includes(recipeId);
    });
}

function addSavedRecipe(username, recipeId) {
    return User.findOne({ username: username }).then((user) => {
        if (!user.saved_recipes.includes(recipeId)) {
            return User.updateOne(
                { username: username },
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
    return User.findOne({ username: username }).then((user) => {
        if (user.saved_recipes.includes(recipeId)) {
            let newRecipes = user.saved_recipes.filter(
                (recipe) => recipe != recipeId
            );
            return User.updateOne(
                { username: username },
                {
                    $set: {
                        saved_recipes: newRecipes
                    }
                }
            );
        }
    });
}

async function getSavedRecipes(username) {
    const user = await User.findOne({ username: username })
        .populate("saved_recipes")
        .exec();
    if (!user) {
        return null;
    }
    return user.saved_recipes;
}

export default {
    getUsers,
    getUserByUsername,
    addUser,
    addSavedRecipe,
    removeSavedRecipe,
    isRecipeSaved,
    getSavedRecipes
};

