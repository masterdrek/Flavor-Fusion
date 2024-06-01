import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal from "../components/Modal";
import { BsFillPencilFill } from "react-icons/bs";
import "../styles/Inventory.css";
import {
    fetchInventory,
    patchInventory,
    addToInventory
} from "../api/inventoryApi";

function Inventory() {
    const [filterText, setFilterText] = useState(""); // For filtering items in the table
    const [selectedRows, setSelectedRows] = useState([]); // For keeping track of selected rows
    const [editItem, setEditItem] = useState(null); // Item being edited
    const [modalOpen, setModalOpen] = useState(false); // Controls the visibility of the modal
    const [isEditing, setIsEditing] = useState(false); // Indicates if we are editing an existing item
    const [data, setData] = useState([]); // Initial empty data array

    useEffect(() => {
        fetchInventory()
            .then((json) => {
                console.log("Fetched Data:", json);
                setData(
                    Array.isArray(json.inventory_list)
                        ? json.inventory_list
                        : []
                );
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const columns = [
        {
            name: "The Inventory Item",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Unit Amount Size",
            selector: (row) => row.quantity,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <span className="edit-icon" onClick={() => handleEdit(row)}>
                    <BsFillPencilFill />
                </span>
            )
        }
    ];

    // Delete selected rows
    const handleDelete = () => {
        const updatedData = Array.isArray(data)
            ? data.filter((item) => !selectedRows.includes(item))
            : []; // Filter out selected rows
        selectedRows.forEach((row) => {
            console.log(row._id);
            fetch(`http://localhost:8000/inventory/${row._id}`, {
                method: "DELETE"
            }).catch((error) => console.error("Error deleting item:", error));
        });
        setData(updatedData); // Update the data state
        setSelectedRows([]); // Clear selected rows
    };

    // Update selected rows state when rows are selected or deselected
    const handleRowSelected = (state) => {
        setSelectedRows(state.selectedRows);
    };

    // Filter data based on the filter text
    const filteredData = Array.isArray(data)
        ? data.filter(
              (item) =>
                  typeof item.name === "string" &&
                  item.name.toLowerCase().includes(filterText.toLowerCase())
          )
        : data;

    // Handle editing an item
    const handleEdit = (row) => {
        setEditItem(row); // Set the item to be edited
        setIsEditing(true); // Set editing mode
        setModalOpen(true); // Open the modal
    };

    // Handle submitting an edited item
    const editInventory = (editedItem) => {
        // copying all properties from one object to another and adding an id property
        const itemToUpdate = { ...editedItem, _id: editItem._id };
        patchInventory(itemToUpdate)
            .then((updatedItem) => {
                if (updatedItem) {
                    const updatedData = Array.isArray(data)
                        ? data.map((item) =>
                              item._id === updatedItem._id ? updatedItem : item
                          )
                        : [];
                    setData(updatedData); // Update the data state with the edited item
                    setModalOpen(false); // Close the modal
                    setEditItem(null); // Clear the edit item state
                    setIsEditing(false); // Reset editing mode
                }
            })
            .catch((error) => {
                console.error("Error updating item:", error);
            });
    };

    // Handle closing the modal
    const handleModalClose = () => {
        setModalOpen(false); // Close the modal
        setEditItem(null); // Clear the edit item state
        setIsEditing(false); // Reset editing mode
    };

    // Handle adding a new item
    const handleAdd = (newItem) => {
        addToInventory(newItem, setData, setModalOpen);
    };

    return (
        <div className="table-container">
            <div className="toolbar">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)} // Update filter text state
                    />
                    {filterText && (
                        <button onClick={() => setFilterText("")}>Clear</button> // Clear the filter text
                    )}
                </div>
                <div className="actions-bar">
                    <button
                        onClick={handleDelete}
                        disabled={selectedRows.length === 0} // Disable delete button if no rows are selected
                    >
                        Delete Selected
                    </button>
                </div>
                <div className="add-bar">
                    <button onClick={() => setModalOpen(true)}>Add + </button>
                </div>
            </div>

            <DataTable
                columns={columns} // Define table columns
                data={filteredData || data} // Use filtered data or original data if filteredData is undefined
                selectableRows // Enable row selection
                onSelectedRowsChange={handleRowSelected} // Handle row selection changes
                pagination // Enable pagination
            />

            {modalOpen && ( // Render the modal conditionally based on modalOpen state
                <Modal
                    onClose={handleModalClose} // Function to call when modal closes
                    onSubmit={isEditing ? editInventory : handleAdd} // Function to call when form is submitted
                    initialName={isEditing && editItem ? editItem.name : ""} // Initial value for the name input field
                    initialQuantity={
                        isEditing && editItem ? editItem.quantity : ""
                    } // Initial value for the quantity input field
                />
            )}
        </div>
    );
}

export default Inventory;
