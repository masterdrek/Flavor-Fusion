import mongoose from "mongoose";

export const CookwareSchema = new mongoose.Schema(
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
    { collection: "cookware_list" }
);

export default CookwareSchema;