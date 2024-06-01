import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar";
import Header from "../Header";

const MaybeShowNavBar = ({ NavbarData, isSelected, setIsSelected }) => {
    const location = useLocation();
    const hideNavBarPaths = [
        "/add_recipe",
        "/create_account",
        "/login",
        "/recipe"
    ];
    const determineIfHidden = (pathname) => {
        return (
            hideNavBarPaths.filter((path) => pathname.includes(path)).length !==
            0
        );
    };
    return !determineIfHidden(location.pathname) ? (
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
