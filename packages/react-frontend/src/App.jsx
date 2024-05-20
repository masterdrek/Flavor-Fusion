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
        location.pathname !== "/create_account" &&
        location.pathname !== "/add_recipe";


    return (
        <div className="App">
            <div className="AppGlass">
                {isHomePage && (
                    <>
                        <MaybeShowNavBar
                            NavbarData={NavbarData}
                            isSelected={isSelected}
                            setIsSelected={setIsSelected}
                        />
                        <RenderComponent index={isSelected} />
                    </>
                )}
            </div>

            <Routes>
                <Route path="/add_recipe" element={<AddRecipe />} />
                <Route path="/create_account" element={<CreateAccount />} />
            </Routes>
        </div>
    );
}

export default App;
