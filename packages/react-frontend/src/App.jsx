import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Recipe from "./pages/addRecipe";
import Inventory from "./pages/Inventory";
import Search from "./pages/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            {/* Router component allows you to define routes for your application */}
            <Router>
                <Header />
                <NavBar />
                {/* Routes component is used to define routes */}
                {/* Use to change the page */}
                <Routes>
                    {/* Route for the homepage, denoted by "/" */}
                    <Route path="/" element={<Home />} />
                    <Route path="/add_recipe" element={<Recipe />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
