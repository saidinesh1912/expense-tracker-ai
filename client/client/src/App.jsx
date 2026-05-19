import {
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";

function App() {

  // THEME STATE
  const [darkMode, setDarkMode] =
    useState(true);

  // LOAD THEME
  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {

      setDarkMode(false);

    } else {

      setDarkMode(true);
    }

  }, []);

  // SAVE THEME
  useEffect(() => {

    localStorage.setItem(
      "theme",
      darkMode
        ? "dark"
        : "light"
    );

  }, [darkMode]);

  return (

    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      <Routes>

        <Route
          path="/"
          element={
            <Login
              darkMode={darkMode}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <Signup
              darkMode={darkMode}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              darkMode={darkMode}
            />
          }
        />

        <Route
          path="/analytics"
          element={
            <Analytics
              darkMode={darkMode}
            />
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <AIAssistant
              darkMode={darkMode}
            />
          }
        />

        <Route
          path="/settings"
          element={
            <Settings
              darkMode={darkMode}
              setDarkMode={
                setDarkMode
              }
            />
          }
        />

      </Routes>

    </div>
  );
}

export default App;