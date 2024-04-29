import mongoose from "mongoose";
import recipeModel from "../models/recipe.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb+srv://dereklee1124:ZyamlvIALHi9dh5F@flavorfusiondb.3dxynzp.mongodb.net/?retryWrites=true&w=majority&appName=FlavorFusionDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getRecipes() {
  return recipeModel.find();

}

export default {
  getRecipes
};