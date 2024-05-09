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

export default {
    getUsers,
    addUserByNameAndUsername
};
