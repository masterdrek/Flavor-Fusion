// backend.js
import express from "express";
import cors from "cors";
import {
    getRecipes, 
    getUserMadeRecipes, 
    createRecipe 
} from "./services/recipe-services.js";
import {
    addInventory,
    getInventorys,
    addCookware,
    addIngredient
} from "./services/inventory-services.js";
import {
    getUsers,
    addUser
} from "./services/user-services.js";
import {
    registerUser,
    loginUser,
    authenticateUser 
} from './auth/auth.js'

import dotenv from 'dotenv'
dotenv.config() 

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());

// Login a user
app.post("/users", registerUser)

// get list of all users
app.get("/users", async (req, res) => {
    const result = await getUsers();
    res.send({ users_list: result });
});

// get list of all recipes
app.get("/recipes", async (req, res) => {
    const result = await getRecipes();
    res.send({ recipes_list: result });
});

// get recipes made by specific user
app.get("/recipes/:userId", async (req, res) => {
    const id = req.params["userId"];
    try {
        const result = await getUserMadeRecipes(id);
        res.send({ recipes_list: result });
    } catch (error) {
        res.status(404).send("Resource not found.");
    }
});

// get list of all inventories
app.get("/inventory", async (req, res) => {
    const result = await inventoryServices.getInventorys();
    res.send({ inventory_list: result });
});

// add user with name and username
app.post("/users", authenticateUser, async (req, res) => {
    const { name, username } = req.body

    if (name != undefined && username != undefined) {
        const result = await addUserByNameAndUsername(
            name,
            username
        );
        res.status(201).send(result);
    }
    res.status(400).send();
});

// add recipe
app.post("/recipes", async (req, res) => {
    const recipeToAdd = req.body;
    const result = await createRecipe(recipeToAdd);
    res.status(201).send(result);
});

// add cookware to inventory
app.post("/inventory/cookware/:id", async (req, res) => {
    const id = req.params["id"];
    const cookwareToAdd = req.body;
    const result = await addCookware(cookwareToAdd, id);
    res.status(201).send(result);
});

// add ingredient to inventory
app.post("/inventory/ingredient/:id", async (req, res) => {
    const id = req.params["id"];
    const ingredientToAdd = req.body;
    const result = await addIngredient(ingredientToAdd, id);
    res.status(201).send(result);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
