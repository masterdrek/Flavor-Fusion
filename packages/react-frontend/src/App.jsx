import React from "react";
import "./App.css";
import { NavbarData } from "./Data/Data";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from "react-router-dom";
import { useState } from "react";
import Recipes from "./pages/Recipes";
import Inventory from "./pages/Inventory";
import Search from "./pages/Search";
import AddRecipe from "./pages/addRecipe";
import MaybeShowNavBar from "./components/Toggle/MaybeShowNavBar";
import CreateAccount from "./pages/createAccount";
import Login from "./pages/login";
import Recipe from "./pages/Recipe";

function App() {
    const [isSelected, setIsSelected] = useState(0);
    const location = useLocation();

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
                <MaybeShowNavBar
                    NavbarData={NavbarData}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                />
                {isHomePage && <RenderComponent index={isSelected} />}
            </div>

            <Routes>
                <Route path="/add_recipe" element={<AddRecipe />} />
                <Route path="/signup" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipe/:recipeId" element={<Recipe />} />
            </Routes>
        </div>
    );
}

export default App;
