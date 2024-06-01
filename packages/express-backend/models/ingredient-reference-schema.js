import mongoose from "mongoose";

export const IngredientReferenceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }
    },
    { 
        collection: "IngredientReference_list" 
    }
);

const IngredientReference = mongoose.model("IngredientReference", IngredientReferenceSchema);

export default IngredientReference;