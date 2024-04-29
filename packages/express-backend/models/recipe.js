import mongoose from "mongoose";

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
  },
  { collection: "recipe_list" }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;