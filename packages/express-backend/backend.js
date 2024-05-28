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

app.get("/", async (req, res) => {
    res.json({ message: "Server is Running" });
});

// get list of all users
app.get("/users", async (req, res) => {
    const result = await getUsers();
    res.send({ users_list: result });
});

app.post("/users", async (req, res) => {
    const token = registerUser(req, res)
    if (!token) {
        return res.json({ message: "JWT not recieved" })
    } else {
        return res.json(token)
    }
})

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

// add ingredient to inventory
app.post("/inventory", async (req, res) => {
    const newItem = req.body;
    const result = await inventoryServices.addNewInventoryItem(newItem);
    res.status(201).send(result);
});

// delete item in inventory by id
app.delete("/inventory/:id", async (req, res) => {
    const id = req.params.id;
    const result = await inventoryServices.deleteUserById(id);
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
    if (!result) {
        res.status(400).json({ message: "error creating new recipe" })
    } else {
        res.status(201).send(result);
    }
});

app.patch("/inventory/:id", async (req, res) => {
    // get the item id from the URL path
    const itemId = req.params.id;
    // get and access data the user is passing in
    const updateData = req.body;
    try {
        const result = await inventoryServices.updateInventoryItem(
            itemId,
            updateData
        );
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send("Item not found.");
        }
    } catch (error) {
        res.status(500).send("Internal Server Error.");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
