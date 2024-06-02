import mongoose from "mongoose";

const IngredientEnumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        collection: "ingredient_enum_list"
    }
);

const IngredientEnum = mongoose.model("IngredientEnum", IngredientEnumSchema);

export default IngredientEnum;
