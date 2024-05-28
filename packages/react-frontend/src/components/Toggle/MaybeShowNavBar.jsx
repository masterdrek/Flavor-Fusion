import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import Header from "../Header";

const MaybeShowNavBar = ({ NavbarData, isSelected, setIsSelected }) => {
    const location = useLocation();
    const hideNavBarPaths = ["/add_recipe", "/create_account"];

    return !hideNavBarPaths.includes(location.pathname) ? (
        <>
            <NavBar
                NavbarData={NavbarData}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
            />
            <Header
                NavbarData={NavbarData}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
            />
        </>
    ) : null;
};

export default MaybeShowNavBar;
