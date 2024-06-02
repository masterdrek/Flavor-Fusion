import React from "react";

function Header({ NavbarData, isSelected, setIsSelected }) {
    const selectedItem = NavbarData[isSelected];

    if (selectedItem) {
        console.log("Selected Item:", selectedItem.heading);
    }
    return (
        <div className="MainDash">
            {NavbarData.map((item, index) => {
                return (
                    <div
                        className={
                            isSelected === index ? "selected-header" : "header"
                        }
                        key={index}
                        onClick={() => setIsSelected(index)}
                    ></div>
                );
            })}
            {/* Conditional Rendering */}
            <h1> {selectedItem ? selectedItem.heading : "Recipes"} </h1>
        </div>
    );
}

export default Header;
