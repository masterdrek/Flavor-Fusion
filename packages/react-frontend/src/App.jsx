import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Home from "./pages/Home";
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
                </Routes>
            </Router>
        </div>
    );
}

export default App;
