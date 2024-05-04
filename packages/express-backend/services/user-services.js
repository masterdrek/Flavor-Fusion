import mongoose from "mongoose";
import userModel from "../models/user.js";
import inventoryServices from "./inventory-services.js";
mongoose.set("debug", true);

mongoose
  .connect("mongodb+srv://dereklee1124:ZyamlvIALHi9dh5F@flavorfusiondb.3dxynzp.mongodb.net/?retryWrites=true&w=majority&appName=FlavorFusionDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers() {
  return userModel.find();
}

async function addUserByNameAndUsername(newName, newUsername) {
  const newInventory = await inventoryServices.addInventory({"ingredients": [], "cookware": []});
  const UserToAdd = new userModel(
    {
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