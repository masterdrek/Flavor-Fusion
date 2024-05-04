import mongoose from "mongoose";
import Inventory from "./inventory.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      trim: true,
      required: true
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Inventory"
    },
    saved_recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Recipe"
    }]

  },
  { collection: "user_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;