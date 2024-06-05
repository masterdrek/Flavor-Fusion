import { API_URL } from "./api.js";

export async function fetchSavedRecipes(username) {
    const response = await fetch(API_URL + "/recipes/saved/" + username);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export async function addToSavedRecipes(username, recipeid) {
    try {
        const response = await fetch(
            API_URL + `/recipe/add/${username}/${recipeid}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Error updating data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Patched data:", data);
        return data;
    } catch (error) {
        console.error("Error in adding to Saved Recipes:", error);
    }
}

export async function removeFromSavedRecipes(username, recipeid) {
    try {
        const response = await fetch(
            API_URL + `/recipe/remove/${username}/${recipeid}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Error updating data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Patched data:", data);
        return data;
    } catch (error) {
        console.error("Error in removing from Recipes:", error);
    }
}

export async function checkIfSaved(username, recipeid){
    const response = await fetch(
        API_URL + `/recipe/saved/${username}/${recipeid}`
    );
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
    
}