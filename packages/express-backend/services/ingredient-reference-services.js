import IngredientReference from "../models/ingredient-reference-schema.js";
import connect from "../mongoSetup.js";

connect();

async function getAll() {
    return IngredientReference.find().lean().exec();
}

async function getByName(info) {
    const { name } = info
    return IngredientReference.find({ name: name }).lean().exec()
}

async function add(newItem) {
    try {
        const itemToAdd = new IngredientReference(newItem);
        const promise = await itemToAdd.save();
        return promise;
    } catch (error) {
        console.error("Error saving item: ", error)
    }
}


async function update(id, updateData) {
    const result = await IngredientReference
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();
    return result;
}

function remove(info) {
    const { id } = info
    return IngredientReference.findOneAndDelete({ _id: id });
}

export default {
    getAll,
    getByName,
    add,
    update,
    remove
};
