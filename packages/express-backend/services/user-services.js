import userModel from "../models/user-schema.js";
import { addInventory } from "./inventory-services.js";
import connect from "../mongoSetup.js";

connect();

function getUsers() {
    const users = userModel.find().lean().exec()
}

function getUserByUsername(user) {
    return userModel.find({ username: user }).lean().exec()
}


async function addUser(newName, newUsername, newHashedPwd) {

    const newInventory = await addInventory({
        ingredients: [],
        cookware: []
    });
    const UserToAdd = new userModel({
        name: newName,
        username: newUsername,
        hashedPassword: newHashedPwd,
        inventory: newInventory._id,
        saved_recipes: []
    });

    const promise = UserToAdd.save();
    return promise;
}

export {
    getUsers,
    getUserByUsername,
    addUser
};
