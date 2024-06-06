import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../components/Modal";

// Create mock functions to simulate the onClose and onSubmit props
const onClose = jest.fn();
const onSubmit = jest.fn();

describe("Modal Component", () => {
    // Initial props to be used in the tests
    const initialProps = {
        onClose,
        onSubmit,
        initialName: "Initial Item",
        initialQuantity: "10",
        showQuantity: true,
        isStep: false,
        isNew: false
    };

    // Create mock functions to simulate the onClose and onSubmit props.
    // These mocks will be used to test if the Modal component calls these functions appropriately.
    // It is used to test whether the Modal component correctly calls this function when the modal is supposed to be closed
    // (e.g., when the cancel button is clicked).

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders with default props", () => {
        render(<Modal onClose={onClose} onSubmit={onSubmit} />);

        // Check if modal elements are rendered with default props
        expect(screen.getByLabelText(/Item/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    });

    test("renders Modal component", () => {
        const { container } = render(<Modal {...initialProps} />);
        console.log(container.innerHTML); // Log the rendered HTML

        // Check if modal elements are rendered
        expect(screen.getByLabelText(/Item/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
        expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    });

    test("submits form with initial values", () => {
        // Render the Modal component with initial props
        render(<Modal {...initialProps} />);

        // Simulate clicking the Submit button
        fireEvent.click(screen.getByText(/Submit/i));

        // Check if onSubmit was called with the correct arguments
        expect(onSubmit).toHaveBeenCalledWith({
            name: "Initial Item",
            quantity: "10"
        });

        // Check if onClose was called
        expect(onClose).toHaveBeenCalled();
    });

    test("closes modal when cancel button is clicked", () => {
        render(<Modal {...initialProps} />);

        // Simulate clicking the Cancel button
        fireEvent.click(screen.getByText(/Cancel/i));

        expect(onClose).toHaveBeenCalled();
    });

    test("changes item type to ingredient when button is clicked", () => {
        // Render the Modal component with initial props and isNew set to true
        render(<Modal {...initialProps} isNew={true} />);

        // Simulate clicking the ingredient button
        // Get the second button (ingredient button)
        const ingredientButton = screen.getAllByRole("button")[1];
        fireEvent.click(ingredientButton);

        // Check if the ingredient button has the correct class
        expect(ingredientButton.className).toContain("ingredient-ingredient");
    });

    test("changes item type to cookware when button is clicked", () => {
        render(<Modal {...initialProps} isNew={true} />);

        // Simulate clicking the ingredient button
        // Get the first button (cookware button)
        const cookwareButton = screen.getAllByRole("button")[0];
        fireEvent.click(cookwareButton);

        expect(cookwareButton.className).toContain("cookware-cookware");
    });

    test("renders correctly without quantity input", () => {
        // Render the Modal component with showQuantity set to false
        render(<Modal {...initialProps} showQuantity={false} />);

        // Check if the Quantity input is not in the document
        expect(screen.queryByLabelText(/Quantity/i)).not.toBeInTheDocument();
    });

    test("renders correctly with step label", () => {
        // Render the Modal component with isStep set to true
        render(<Modal {...initialProps} isStep={true} />);

        // Check if the label is "Recipe Step" instead of "Item"
        expect(screen.getByLabelText(/Recipe Step/i)).toBeInTheDocument();
    });

    test("handles input changes correctly", () => {
        render(<Modal {...initialProps} />);

        // Simulate changing the item input value
        fireEvent.change(screen.getByLabelText(/Item/i), {
            target: { value: "New Item" }
        });

        // Simulate changing the quantity input value
        fireEvent.change(screen.getByLabelText(/Quantity/i), {
            target: { value: "20" }
        });

        // Simulate clicking the Submit button
        fireEvent.click(screen.getByText(/Submit/i));

        // Check if onSubmit was called with the new values
        expect(onSubmit).toHaveBeenCalledWith({
            name: "New Item",
            quantity: "20"
        });

        expect(onClose).toHaveBeenCalled();
    });

    test("renders with 'Recipe Step' label when isStep is true", () => {
        render(<Modal {...initialProps} isStep={true} />);

        expect(screen.getByLabelText(/Recipe Step/i)).toBeInTheDocument();
        expect(screen.queryByLabelText(/Item/i)).not.toBeInTheDocument();
    });

    test("renders with 'Item' label when isStep is false", () => {
        render(<Modal {...initialProps} isStep={false} />);

        expect(screen.getByLabelText(/Item/i)).toBeInTheDocument();
        expect(screen.queryByLabelText(/Recipe Step/i)).not.toBeInTheDocument();
    });

    test("renders quantity input when showQuantity is true", () => {
        render(<Modal {...initialProps} showQuantity={true} />);

        expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    });

    test("does not render quantity input when showQuantity is false", () => {
        render(<Modal {...initialProps} showQuantity={false} />);

        expect(screen.queryByLabelText(/Quantity/i)).not.toBeInTheDocument();
    });

    test("submits form with item type when isNew is true", () => {
        render(<Modal {...initialProps} isNew={true} />);

        fireEvent.click(screen.getByText(/Submit/i));

        expect(onSubmit).toHaveBeenCalledWith({
            name: "Initial Item",
            quantity: "10",
            type: "cookware"
        });
        expect(onClose).toHaveBeenCalled();
    });

    test("submits form without item type when isNew is false", () => {
        render(<Modal {...initialProps} isNew={false} />);

        fireEvent.click(screen.getByText(/Submit/i));

        expect(onSubmit).toHaveBeenCalledWith({
            name: "Initial Item",
            quantity: "10"
        });
        expect(onClose).toHaveBeenCalled();
    });
});
