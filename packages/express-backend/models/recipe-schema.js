import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        instructions: [{
            type: String,
            required: true,
            trim: true
        }],
        ingredients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
            default: undefined,
            required: true
        }],
        cookware: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cookware',
            default: undefined,
            required: true
        }],
        creator: {
            type: String,
            required: true,
        }
    },
    { 
        collection: "recipe_list" 
    }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
