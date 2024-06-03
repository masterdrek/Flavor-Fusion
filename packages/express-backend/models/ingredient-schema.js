import mongoose from "mongoose";

export const IngredientSchema = new mongoose.Schema(
    {
        ingredientReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IngredientReference",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    { collection: "ingredient_list" }
);

export default IngredientSchema;
