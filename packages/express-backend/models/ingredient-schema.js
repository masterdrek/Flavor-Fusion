import mongoose from "mongoose";

export const IngredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    { collection: "ingredient_list" }
);

export default IngredientSchema;
