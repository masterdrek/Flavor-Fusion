import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "../components/Modal";
import { BsFillPencilFill } from "react-icons/bs";
import "../styles/Inventory.css";

function Inventory() {
    // State variables
    const [filterText, setFilterText] = useState(""); // For filtering items in the table
    const [selectedRows, setSelectedRows] = useState([]); // For keeping track of selected rows
    const [editItem, setEditItem] = useState(null); // Item being edited
    const [modalOpen, setModalOpen] = useState(false); // Controls the visibility of the modal
    const [isEditing, setIsEditing] = useState(false); // Indicates if we are editing an existing item
    const [data, setData] = useState([
        // Initial inventory data
        { id: 1, name: "Apple", quantity: "5" },
        { id: 2, name: "Ribeye Steak", quantity: "2" },
        { id: 3, name: "Eggs", quantity: "12" },
        { id: 4, name: "Chicken Wings", quantity: "16" }
    ]);

    // Column definitions for the DataTable component
    const columns = [
        {
            name: "The Inventory Item",
            selector: (row) => row.name, // Access the 'name' property of each row
            sortable: true // Enable sorting for this column
        },
        {
            name: "Unit Amount Size",
            selector: (row) => row.quantity, // Access the 'quantity' property of each row
            sortable: true // Enable sorting for this column
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
        const updatedData = data.filter((item) => !selectedRows.includes(item)); // Filter out selected rows
        console.log(selectedRows);
        setData(updatedData); // Update the data state
        setSelectedRows([]); // Clear selected rows
    };

    // Update selected rows state when rows are selected or deselected
    const handleRowSelected = (state) => {
        setSelectedRows(state.selectedRows);
    };

    // Filter data based on the filter text
    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // Handle editing an item
    const handleEdit = (row) => {
        setEditItem(row); // Set the item to be edited
        setIsEditing(true); // Set editing mode
        setModalOpen(true); // Open the modal
    };

    // Handle adding a new item
    const handleAddItem = (newItem) => {
        const newItemWithId = {
            ...newItem,
            id: data.length ? data[data.length - 1].id + 1 : 1 // Assign a new id
        };
        setData([...data, newItemWithId]); // Add the new item to the data state
    };

    // Handle submitting an edited item
    const handleEditSubmit = (editedItem) => {
        const updatedData = data.map((item) =>
            item.id === editItem.id
                ? {
                      ...item,
                      name: editedItem.name,
                      quantity: editedItem.quantity
                  }
                : item
        );
        setData(updatedData); // Update the data state with the edited item
        setEditItem(null); // Clear the edit item state
    };

    // Handle closing the modal
    const handleModalClose = () => {
        setModalOpen(false); // Close the modal
        setEditItem(null); // Clear the edit item state
        setIsEditing(false); // Reset editing mode
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
                data={filteredData} // Use filtered data for the table
                selectableRows // Enable row selection
                onSelectedRowsChange={handleRowSelected} // Handle row selection changes
                pagination // Enable pagination
            />

            {modalOpen && ( // Render the modal conditionally based on modalOpen state
                <Modal
                    onClose={handleModalClose} // Function to call when modal closes
                    onSubmit={isEditing ? handleEditSubmit : handleAddItem} // Function to call when form is submitted
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
