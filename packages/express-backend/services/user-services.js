import User from "../models/user-schema.js";
import { addInventory } from "./inventory-services.js";
import { createRecipe }
import connect from "../mongoSetup.js";

connect();

function getUsers() {
    const users = User.find().lean().exec()
}

function getUserByUsername(user) {
    return userModel.find({ username: user }).lean().exec()
}


async function addUser(newName, newUsername, newHashedPwd) {

    // addInventory returns the new inventories _id
    const newInventory = await addInventory({
        ingredients: [],
        cookware: []
    });

    const newRecipes = await createRecipe

    const newUser = {
            name: newName,
            username: newUsername,
            hashedPassword: newHashedPwd,
            inventory: newInventory
            saved_recipes: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Recipe"
                }
            ]
        },
        { 
            collection: "user_list" 
        }
    }

    const promise = userModel.save();
    return promise;
}

export {
    getUsers,
    getUserByUsername,
    addUser
};
