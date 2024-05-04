import mongoose from "mongoose";
import { IngredientSchema } from "./ingredient.schema.js";
import { CookwareSchema } from "./cookware-schema.js";

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    ingredients: {
      type: [IngredientSchema],
      default: undefined,
      required: true,
    },
    cookware: {
      type: [CookwareSchema],
      default: undefined,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { collection: "recipe_list" }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;