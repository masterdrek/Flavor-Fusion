import inventoryModel from "../models/inventory.js";
import connect from "../mongoSetup.js";

connect()

function addInventory(inventory) {
  const inventoryToAdd = new inventoryModel(inventory);
  const promise = inventoryToAdd.save();
  return promise;
}

function addCookware(newCookware, id) {
   return inventoryModel.findById(id).then(
    (oldInventory)=> {
      return inventoryModel.updateOne(
        {_id: id}, 
        {$set: {"cookware" : [...oldInventory.cookware, newCookware]}});
    });  
}

function addIngredient(newIngredient, id) {
  return inventoryModel.findById(id).then(
   (oldInventory)=> {
     return inventoryModel.updateOne(
       {_id: id}, 
       {$set: {"ingredients" : [...oldInventory.ingredients, newIngredient]}});
   });  
}

function getInventorys() {
  return inventoryModel.find();
}
export default {
  addInventory,
  getInventorys,
  addCookware,
  addIngredient
};