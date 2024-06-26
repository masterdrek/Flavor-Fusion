// backend.js
import express from "express";
import cors from "cors";
import recipeServices from "./services/recipe-services.js";
import inventoryServices from "./services/inventory-services.js";
import userServices from "./services/user-services.js";
import { loginUser, registerUser, authenticateUser } from "./auth/auth.js";
import Recipe from "./models/recipe.js";

const app = express();
const port = process.env.PORT;

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

app.post("/login", async (req, res) => {
    await loginUser(req, res);
});

app.post("/signup", async (req, res) => {
    await registerUser(req, res);
});

// get a personal list of recipes made by specific user

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

// get list of all inventories
app.get("/inventory", async (req, res) => {
    const result = await inventoryServices.getInventories();
    res.send({ inventory_list: result });
});

// get inventory by usernmae
app.get("/inventory/:username", async (req, res) => {
    const { username } = req.params;
    const result = await userServices.getInventory(username);
    res.send({ inventory: result });
});

// add ingredient to inventory by username
app.post("/inventory/ingredient/:username", async (req, res) => {
    const { username } = req.params;
    const newItem = req.body;
    const result = await userServices.addNewIngredientToInventory(
        username,
        newItem
    );
    res.status(201).send(result);
});

// add cookware to inventory by username
app.post("/inventory/cookware/:username", async (req, res) => {
    const { username } = req.params;
    const newItem = req.body;
    const result = await userServices.addNewCookwareToInventory(
        username,
        newItem
    );
    res.status(201).send(result);
});

// delete item in inventory by id
app.delete("/inventory/:username/:id", async (req, res) => {
    const { username, id } = req.params;
    const result = await userServices.deleteInventoryItemById(username, id);
    res.send({ inventory_list: result });
});

app.patch("/inventory/:username/:id", async (req, res) => {
    const { username, id } = req.params;

    const updateData = req.body;
    try {
        const result = await userServices.updateInventoryItem(
            username,
            id,
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

// get recipe by id
app.get("/recipe/:recipeId", async (req, res) => {
    const id = req.params["recipeId"];
    console.log("trying to get recipe: " + id);
    try {
        const result = await recipeServices.getRecipeById(id);
        res.send({ recipe: result });
    } catch (error) {
        res.status(404).send("Resource not found.");
    }
});

// check if recipe is saved
app.get("/recipe/saved/:username/:recipeId", async (req, res) => {
    const { username, recipeId } = req.params;
    try {
        const result = await userServices.isRecipeSaved(username, recipeId);
        res.send(result);
    } catch (error) {
        res.status(404).send("Resource not found.");
    }
});

// add saved recipe to user by id
app.patch("/recipe/add/:username/:recipeId", async (req, res) => {
    const { username, recipeId } = req.params;
    console.log(username, recipeId);
    try {
        const result = await userServices.addSavedRecipe(username, recipeId);
        res.send({ user: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Resource not found.");
    }
});

// remove saved recipe to user by id
app.patch("/recipe/remove/:username/:recipeId", async (req, res) => {
    const { username, recipeId } = req.params;
    console.log(username, recipeId);
    try {
        const result = await userServices.removeSavedRecipe(username, recipeId);
        res.send({ user: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Resource not found.");
    }
});

// get saved recipes based on username
app.get("/recipes/saved/:username", async (req, res) => {
    const { username } = req.params;
    console.log(username);
    try {
        const result = await userServices.getSavedRecipes(username);
        res.send({ saved_recipes: result });
    } catch (error) {
        console.log(error);
        res.status(404).send("Resource not found.");
    }
});

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

// delete recipe by id
app.delete("/recipes/:recipeId", async (req, res) => {
    const id = req.params["recipeId"];
    try {
        const result = await recipeServices.deleteRecipeById(id);
        res.send({ recipes_list: result });
    } catch (error) {
        res.status(404).send("Resource not found.");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
