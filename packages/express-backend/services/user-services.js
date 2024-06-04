import User from "../models/user.js";
import connect from "../mongoSetup.js";
import inventoryServices from "./inventory-services.js";
import inventoryModel from "../models/inventory.js";

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
    const newInventory = await inventoryServices.addInventory({
        ingredients: [],
        cookware: []
    });
    const newUser = {
        name: newName,
        username: newUsername,
        hashedPassword: newHashedPwd,
        inventory: newInventory._id,
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

async function getInventory(username) {
    const user = await User.findOne({ username: username })
        .populate("inventory")
        .exec();
    if (!user) {
        return null;
    }
    return user.inventory;
}

async function addNewIngredientToInventory(username, item) {
    const inventory = (await User.findOne({ username: username })).inventory;
    if (!inventory) {
        return null;
    }
    const inventoryId = inventory._id;
    return inventoryModel.findById(inventoryId).then((oldInventory) => {
        return inventoryModel.updateOne(
            { _id: inventory._id },
            { $set: { ingredients: [...oldInventory.ingredients, item] } }
        );
    });
}

async function addNewCookwareToInventory(username, item) {
    const inventory = (await User.findOne({ username: username })).inventory;
    if (!inventory) {
        return null;
    }
    const inventoryId = inventory._id;
    return inventoryModel.findById(inventoryId).then((oldInventory) => {
        return inventoryModel.updateOne(
            { _id: inventory._id },
            { $set: { cookware: [...oldInventory.cookware, item] } }
        );
    });
}

async function updateInventoryItem(username, itemId, newItem) {
    const user = await User.findOne({ username: username }).populate(
        "inventory"
    );
    if (!user || !user.inventory) {
        return null;
    }
    const inventoryId = user.inventory._id;

    const ingredientIndex = user.inventory.ingredients.findIndex(
        (item) => item._id.toString() === itemId
    );
    const cookwareIndex = user.inventory.cookware.findIndex(
        (item) => item._id.toString() === itemId
    );

    let updatePath;
    if (ingredientIndex !== -1) {
        updatePath = `ingredients.${ingredientIndex}`;
    } else if (cookwareIndex !== -1) {
        updatePath = `cookware.${cookwareIndex}`;
    } else {
        return null;
    }
    const update = {};
    update[updatePath] = newItem;

    const result = await inventoryModel.findByIdAndUpdate(
        inventoryId,
        { $set: update },
        { new: true }
    );

    return result;
}
async function deleteInventoryItemById(username, itemId) {
    const user = await User.findOne({ username: username }).populate(
        "inventory"
    );
    if (!user || !user.inventory) {
        return null;
    }
    const inventoryId = user.inventory._id;
    const result = await inventoryModel.findByIdAndUpdate(
        inventoryId,
        {
            $pull: {
                ingredients: { _id: itemId },
                cookware: { _id: itemId }
            }
        },
        { new: true }
    );
    return result;
}

export default {
    getUsers,
    getUserByUsername,
    addUser,
    addSavedRecipe,
    removeSavedRecipe,
    isRecipeSaved,
    getSavedRecipes,
    getInventory,
    addNewIngredientToInventory,
    addNewCookwareToInventory,
    deleteInventoryItemById,
    updateInventoryItem
};
