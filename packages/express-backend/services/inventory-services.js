import inventoryModel from "../models/inventory.js";
import connect from "../mongoSetup.js";

connect();

async function addNewInventoryItem(newItem) {
    const itemToAdd = new inventoryModel(newItem);
    const promise = itemToAdd.save();
    return promise;
}

async function addInventory({ ingredients, cookware }) {
    const result = await inventoryModel.create({ ingredients, cookware });
    return result;
}

function getInventories() {
    return inventoryModel.find();
}

async function updateInventoryItem(id, updateData) {
    const result = await inventoryModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();
    return result;
}

export default {
    addNewInventoryItem,
    addInventory,
    getInventories,
    updateInventoryItem
};
