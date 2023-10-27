import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import BoardMenu from "../components/BoardMenu";
import CreateBoard from "../components/CreateBoard";
import Workspaces from "../components/Workspaces";
import Boardnav from "../components/Boardnav";
import { Board } from "../Board";
import { BoardView } from "../BoardView";
import TaskView from "../components/TaskView";
import AddTaskMenu from "../components/AddTaskMenu";
import axios from "axios";

const Home: React.FC = () => {
  const [boardcreation, OpenBoardCreationPanel] = useState<boolean>(false);
  const [boardselector, OpenBoardSelector] = useState<boolean>(false);
  const [currentboard, setCurrentBoard] = useState<BoardView>();
  const [boardOption, setBoardOption] = useState<string>("board");
  const [createTaskMenu, setCreateTaskMenu] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(true);
  const [taskSearch, setTaskSearch] = useState<string>("");

  const openBoardCreation = (): void => {
    OpenBoardCreationPanel(true);
  };

  const closeBoardCreation = (): void => {
    OpenBoardCreationPanel(false);
  };

  const openBoardSelector = (): void => {
    OpenBoardSelector(true);
  };

  const closeBoardSelector = (): void => {
    OpenBoardSelector(false);
  };





  return (
    <>
      <Sidebar openPanel={openBoardCreation} setMenuState={setOpenMenu} menuState={openMenu}></Sidebar>
      {openMenu ? <BoardMenu
        openSelector={openBoardSelector}
        boardselector={boardselector}
        closeSelector={closeBoardSelector}
        currentBoard={currentboard}
        setCurrentBoard={setCurrentBoard}
        boardOption={boardOption}
        setBoardOption={setBoardOption}
      ></BoardMenu>: ""}
      {boardcreation ? <CreateBoard closePanel={closeBoardCreation} /> : ""}
      <div className="main_section">
        {boardOption === "board" ? <><Boardnav board={currentboard} setCreateTaskMenu={setCreateTaskMenu} taskSearch={taskSearch} setTaskSearch={setTaskSearch}/> <TaskView boardid={currentboard?._id} searchContent={taskSearch}></TaskView></>
        : ""}
       
      
      </div>
      {createTaskMenu && currentboard?._id ? <AddTaskMenu setTaskCreateMenu={setCreateTaskMenu} board={currentboard}></AddTaskMenu> : ""}
    </>
  );
};

export default Home;
