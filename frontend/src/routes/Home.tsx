import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import BoardMenu from "../components/BoardMenu";
import CreateBoard from "../components/CreateBoard";
import Workspaces from "../components/Workspaces";
import Boardnav from "../components/Boardnav";
import { Board } from "../Board";
import { BoardView } from "../BoardView";

const Home: React.FC = () => {
  const [boardcreation, OpenBoardCreationPanel] = useState<boolean>(false);
  const [boardselector, OpenBoardSelector] = useState<boolean>(false);
  const [currentboard, setCurrentBoard] = useState<BoardView>();

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
      <Sidebar openPanel={openBoardCreation}></Sidebar>
      <BoardMenu
        openSelector={openBoardSelector}
        boardselector={boardselector}
        closeSelector={closeBoardSelector}
        currentBoard={currentboard}
        setCurrentBoard={setCurrentBoard}
      ></BoardMenu>
      <Boardnav board={currentboard} />
      {boardcreation ? <CreateBoard closePanel={closeBoardCreation} /> : ""}
    </>
  );
};

export default Home;
