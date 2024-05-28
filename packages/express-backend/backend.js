// backend.js
import express from "express";
import cors from "cors";
import recipeServices from "./services/recipe-services.js";
import inventoryServices from "./services/inventory-services.js";
import userServices from "./services/user-services.js";
import Recipe from "./models/recipe.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.json({ message: "Server is Running" });
});

// get list of all users
app.get("/users", async (req, res) => {
    const result = await userServices.getUsers();
    res.send({ users_list: result });
});

// add user with name and username
app.post("/users", async (req, res) => {
    const userToAdd = req.body;
    const name = userToAdd.name;
    const username = userToAdd.username;

    if (name != undefined && username != undefined) {
        const result = await userServices.addUserByNameAndUsername(
            name,
            username
        );
        res.status(201).send(result);
    }
    res.status(400).send();
});

// ------------------ INVENTORY ------------------------------

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

// ---------------ADD RECIPE ----------------------------------

// add recipe
// Route to handle recipe creation
app.post("/recipes", async (req, res) => {
    const { name, ingredients, cookware, instructions, creator } = req.body;

    // creating a Recipe object
    const newRecipe = new Recipe({
        name,
        ingredients,
        cookware,
        instructions,
        creator
    });

    try {
        // saving recipe to database
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get list of all recipes
app.get("/recipes", async (req, res) => {
    const result = await recipeServices.getRecipes();
    res.send({ recipes_list: result });
});

// get recipes made by specific user
app.get("/recipes/:userId", async (req, res) => {
    const id = req.params["userId"];
    try {
        const result = await recipeServices.getUserMadeRecipes(id);
        res.send({ recipes_list: result });
    } catch (error) {
        res.status(404).send("Resource not found.");
    }
});


// delete item in inventory by id
app.delete("/recipes", async (req, res) => {
    const { ids } = req.body; // Get the ids from the request body
    if (!Array.isArray(ids)) {
        return res.status(400).json({ message: "ids must be an array" });
    }
    try {
        const result = await recipeServices.deleteRecipesByIds(ids);
        res.status(200).json({
            message: "Recipes deleted successfully",
            result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
