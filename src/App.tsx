import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./screen/navbar/Navbar";
import Styles from "./App.module.css";
import TaskScreen from "./screen/task/TaskScreen";
import Login from "./screen/Login";
import SpentAnalysis from "./screen/task/SpentAnalysis";

function Layout() {
  const location = useLocation();

  // Hide Navbar and Footer only on the Login page
  const hideLayout = location.pathname === "/";

  return (
    <Box className={Styles.main_container}>
      {!hideLayout && (
        <Box className={Styles.nav_container}>
          <Navbar />
        </Box>
      )}
      <Box>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/task" element={<TaskScreen />} />
          <Route path="/spentAnalysis" element={<SpentAnalysis />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
