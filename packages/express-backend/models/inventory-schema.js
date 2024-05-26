import mongoose from "mongoose";
import { CookwareSchema } from "./cookware-schema.js";
import { IngredientSchema } from "./ingredient-schema.js";

const InventorySchema = new mongoose.Schema(
    {
        ingredients: {
            type: [IngredientSchema],
            default: undefined,
            required: true
        },
        cookware: {
            type: [CookwareSchema],
            default: undefined,
            required: true
        }
    },
    { 
        collection: "inventory_list" 
    }
);

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
