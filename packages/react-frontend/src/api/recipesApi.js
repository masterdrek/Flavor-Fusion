import { API_URL } from "./api.js";

export async function fetchPersonalRecipes(username) {
    const response = await fetch(API_URL + "/recipes/" + username);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const getPersonalRecipes = (username, setData) => {
    if (username !== "") {
        fetchPersonalRecipes(username)
            .then((json) => {
                console.log("Fetched Data:", json.recipes_list);
                setData(
                    Array.isArray(json.recipes_list) ? json.recipes_list : []
                );
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
};

// Function to handle the deletion of a single recipe
export const handleDeleteSingleRecipe = async (recipeId, data, setData) => {
    try {
        const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting data: ${response.statusText}`);
        }

        // Update the state to remove the deleted recipe
        const updatedRecipes = data.filter((recipe) => recipe._id !== recipeId);
        setData(updatedRecipes);

        console.log(`Recipe with ID ${recipeId} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting recipe:", error);
    }
};
