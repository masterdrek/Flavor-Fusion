import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default function connect() {
    mongoose.set("debug", true);
    mongoose
        .connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .catch((error) => console.log(error));
}
