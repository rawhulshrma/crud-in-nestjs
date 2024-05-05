import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={{ mode: darkMode ? "dark" : "light" }}>
      <Router>
        <div className={`dark-mode-toggle ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;