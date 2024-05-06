// backend.js
import express from "express";
import cors from "cors";
import recipeServices from "./services/recipe-services.js";
import inventoryServices from "./services/inventory-services.js";
import userServices from "./services/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get("/users", async (req, res) => {
  const result = await userServices.getUsers();
  res.send({users_list : result})
});

app.get("/recipes", async (req, res) => {
  const result = await recipeServices.getRecipes();
  res.send({recipes_list : result})
});

app.get("/recipes/:userId", async (req, res) => {
  const id = req.params["userId"]
  try {
    const result = await recipeServices.getUserMadeRecipes(id);
    res.send({recipes_list : result})
  } catch (error) {
    res.status(404).send("Resource not found.");
  }
});

app.get("/inventory", async (req, res) => {
  const result = await inventoryServices.getInventorys();
  res.send({inventory_list : result})
});

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const name = userToAdd.name
  const username = userToAdd.username

  if(name != undefined && username != undefined){
    const result = await userServices.addUserByNameAndUsername(name, username);
    res.status(201).send(result)
  }
  res.status(400).send()
});

app.post("/recipes", async (req, res) => {
  const recipeToAdd = req.body;
  const result = await recipeServices.createRecipe(recipeToAdd);
  res.status(201).send(result)

});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});