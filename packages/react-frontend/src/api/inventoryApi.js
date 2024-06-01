import API_URL from './api.js'

async function fetchInventory() {
    const response = await fetch(API_URL+"/inventory");
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

async function postInventory(item) {
    console.log("Posting item:", item);
    try {
        const response = await fetch(API_URL+"/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

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

async function patchInventory(item) {
    try {
        const response = await fetch(
            API_URL+`/inventory/${item._id}`,
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

async function addToInventory(item) {
    postInventory(item)
        .then((newItem) => {
            if (newItem) {
                setData((prevData) =>
                    Array.isArray(prevData)
                        ? [...prevData, newItem]
                        : [newItem]
                );
                setModalOpen(false);
            }
        })
        .catch((error) => {
            console.error("Error updating list:", error);
        });
}

export {
    fetchInventory,
    postInventory,
    patchInventory,
    addToInventory
}