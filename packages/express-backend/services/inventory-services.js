import inventoryModel from "../models/inventory.js";
import connect from "../mongoSetup.js";

connect();

async function addNewInventoryItem(newItem) {
    const itemToAdd = new inventoryModel(newItem);
    const promise = itemToAdd.save();
    return promise;
}

function getInventorys() {
    return inventoryModel.find();
}

async function updateInventoryItem(id, updateData) {
    const result = await inventoryModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();
    return result;
}

function deleteUserById(id) {
    return inventoryModel.findOneAndDelete({ _id: id }).exec();
}

export default {
    getInventorys,
    addNewInventoryItem,
    deleteUserById,
    updateInventoryItem
};
