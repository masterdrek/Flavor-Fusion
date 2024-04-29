// backend.js
import express from "express";
import cors from "cors";
import recipeServices from "./services/recipe-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/recipes", async (req, res) => {
  const result = await recipeServices.getRecipes();
  res.send({recipes_list : result})
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});