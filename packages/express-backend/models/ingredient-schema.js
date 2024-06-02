import mongoose from "mongoose";

export const IngredientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    {
        collection: "ingredient_list"
    }
);

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

export default Ingredient;
