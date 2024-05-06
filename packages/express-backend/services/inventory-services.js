import inventoryModel from "../models/inventory.js";
import connect from "../mongoSetup.js";

connect()

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