import { API_URL } from "./api.js";

export async function fetchInventory(username) {
    const response = await fetch(API_URL + "/inventory/" + username);
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export const getInventory = (username, setData) => {
    if (username !== "") {
        fetchInventory(username)
            .then((json) => {
                console.log("Fetched Data:", json);
                setData(
                    Array.isArray(
                        json.inventory.ingredients.concat(
                            json.inventory.cookware
                        )
                    )
                        ? json.inventory.ingredients.concat(
                              json.inventory.cookware
                          )
                        : []
                );
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
};

export async function postIngredientInventory(username, item) {
    console.log("Posting item:", item);
    try {
        const response = await fetch(
            API_URL + "/inventory/ingredient/" + username,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }
        );

        if (!response.ok) {
            throw new Error(`Error posting data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Posted data:", data);
        return data;
    } catch (error) {
        console.error("Error in postInventory:", error);
    }
}
export async function postCookwareInventory(username, item) {
    console.log("Posting item:", item);
    try {
        const response = await fetch(
            API_URL + "/inventory/cookware/" + username,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }
        );

        if (!response.ok) {
            throw new Error(`Error posting data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Posted data:", data);
        return data;
    } catch (error) {
        console.error("Error in postInventory:", error);
    }
}

export async function patchInventory(username, item) {
    try {
        const response = await fetch(
            API_URL + `/inventory/${username}/${item._id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            }
        );

        if (!response.ok) {
            throw new Error(`Error updating data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Patched data:", data);
        return data;
    } catch (error) {
        console.error("Error in patchInventory:", error);
    }
}

// Delete selected rows
export const handleDelete = (
    selectedRows,
    username,
    data,
    setData,
    setSelectedRows
) => {
    const updatedData = Array.isArray(data)
        ? data.filter((item) => !selectedRows.includes(item))
        : []; // Filter out selected rows
    selectedRows.forEach((row) => {
        console.log(row._id);
        fetch(`${API_URL}/inventory/${username}/${row._id}`, {
            method: "DELETE"
        }).catch((error) => console.error("Error deleting item:", error));
    });
    setData(updatedData); // Update the data state
    setSelectedRows([]); // Clear selected rows
};

export async function addToInventory(
    username,
    item,
    type,
    setData,
    setModalOpen,
    getInventory
) {
    console.log(username, item, type);
    type === "ingredient"
        ? postIngredientInventory(username, item)
              .then(() => {
                  getInventory(username, setData);
              })
              .catch((error) => {
                  console.error("Error updating list:", error);
              })
        : postCookwareInventory(username, item)
              .then(() => {
                  getInventory(username, setData);
              })
              .catch((error) => {
                  console.error("Error updating list:", error);
              });
    setModalOpen(false);
}
