import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        collection: "inventory_list"
    }
);

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;
