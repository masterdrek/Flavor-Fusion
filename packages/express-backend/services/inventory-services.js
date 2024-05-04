import mongoose from "mongoose";
import inventoryModel from "../models/inventory.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb+srv://dereklee1124:ZyamlvIALHi9dh5F@flavorfusiondb.3dxynzp.mongodb.net/?retryWrites=true&w=majority&appName=FlavorFusionDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function addInventory(inventory) {
  const InventoryToAdd = new inventoryModel(inventory);
  const promise = InventoryToAdd.save();
  return promise;
}

function getInventorys() {
  return inventoryModel.find();
}
export default {
  addInventory,
  getInventorys
};