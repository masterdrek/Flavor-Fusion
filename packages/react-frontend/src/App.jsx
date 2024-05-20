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

    return (
        <div className="App">
            <div className="AppGlass">
                <MaybeShowNavBar
                    NavbarData={NavbarData}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                />
                {location.pathname !== "/add_recipe" && (
                    <RenderComponent index={isSelected} />
                )}
            </div>

            <Routes>
                <Route path="/add_recipe" element={<AddRecipe />} />
            </Routes>
        </div>
    );
}

export default App;
