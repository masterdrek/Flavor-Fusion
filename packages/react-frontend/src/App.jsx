import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Recipe from "./pages/addRecipe";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            {/* Router component allows you to define routes for your application */}
            <Router>
                <Header />
                <ConditionalNavBar />
                {/* Routes component is used to define routes */}
                {/* Use to change the page */}
                <Routes>
                    {/* Route for the homepage, denoted by "/" */}
                    <Route path="/" element={<Home />} />
                    <Route path="/add_recipe" element={<Recipe />} />
                </Routes>
            </Router>
        </div>
    );
}

function ConditionalNavBar() {
    const location = useLocation();
    // Check if the current path is not "/add_recipe"
    if (location.pathname !== "/add_recipe") {
        return <NavBar />;
    }
    return null;
}

export default App;
