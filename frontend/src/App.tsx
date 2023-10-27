import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import BoardPage from "./routes/BoardPage";
import Home from "./routes/Home";
import "./styles/General.css";
import "./styles/Sidebar.css";
import "./styles/BoardMenu.css";
import "./styles/CreateBoardPanel.css";
import "./styles/ErrorCard.css";
import "./styles/Workspaces.css";
import "./styles/Boardnav.css";
import "./styles/AddTaskMenu.css";
import "./styles/TaskView.css";
import "./styles/Task.css";




const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<BoardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
