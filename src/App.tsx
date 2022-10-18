import React from "react";
import "./App.css";
import Kanban from "./components/Kanban/Kanban";
import "@fontsource/roboto";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path={`/kanban/:kanbanID`} element={<Kanban />} />
      </Routes>
    </div>
  );
}

export default App;
