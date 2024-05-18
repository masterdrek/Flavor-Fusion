import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Recipe from "./pages/addRecipe";
import CreateAccount from "./pages/createAccount";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <ConditionalComponents />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add_recipe" element={<Recipe />} />
                    <Route path="/create_account" element={<CreateAccount />} />
                </Routes>
            </Router>
        </div>
    );
}

function ConditionalComponents() {
    const location = useLocation();
    if (location.pathname === "/create_account") {
        return null; // Render nothing if the route is /create_account
    }

    return (
        <>
            <Header />
            <ConditionalNavBar />
        </>
    );
}

function ConditionalNavBar() {
    const location = useLocation();
    if (location.pathname !== "/add_recipe") {
        return <NavBar />;
    }
    return null;
}

export default App;
