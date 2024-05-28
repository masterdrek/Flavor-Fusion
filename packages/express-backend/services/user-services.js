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

export {
    getUsers,
    getUserByUsername,
    addUser
};
