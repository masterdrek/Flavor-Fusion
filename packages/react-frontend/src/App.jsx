import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { NavbarData } from "./Data/Data";
import Recipes from "./pages/Recipes";
import Inventory from "./pages/Inventory";
import Search from "./pages/Search";
import AddRecipe from "./pages/addRecipe";
import MaybeShowNavBar from "./components/Toggle/MaybeShowNavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import ProfileImage from "./components/ProfileImage";
import { getUsernameFromToken } from "./utils/utils";

function App() {
    const [isSelected, setIsSelected] = useState(0);
    const [username, setUsername] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in session storage
        const token = sessionStorage.getItem("token");
        if (
            !token &&
            location.pathname !== "/login" &&
            location.pathname !== "/signup"
        ) {
            navigate("/login");
        } else if (
            token &&
            (location.pathname === "/login" || location.pathname === "/signup")
        ) {
            navigate("/");
        }
    }, [navigate, location.pathname]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const usernameFromToken = getUsernameFromToken(token);
            setUsername(usernameFromToken);
        } else {
            setUsername("");
        }
    }, [location.pathname]);

    const RenderComponent = ({ index }) => {
        switch (index) {
            case 0:
                return <Recipes />;
            case 1:
                return <Inventory />;
            case 2:
                return <Search />;
            default:
                return null;
        }
    };

    const isHomePage =
        location.pathname !== "/signup" &&
        location.pathname !== "/login" &&
        location.pathname !== "/add_recipe" &&
        !location.pathname.includes("/recipe");

    return (
        <div className="App">
            <div className="AppGlass">
                {username && (
                    <div className="profile-container">
                        <ProfileImage name={username} />
                        <div className="user-info">Logged in as {username}</div>
                    </div>
                )}
                <MaybeShowNavBar
                    NavbarData={NavbarData}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                />
                {isHomePage && <RenderComponent index={isSelected} />}
            </div>

            <Routes>
                <Route path="/add_recipe" element={<AddRecipe />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipe/:recipeId" element={<Recipe />} />
            </Routes>
        </div>
    );
}

export default App;
