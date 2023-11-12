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
import Filter from "../components/Filter";
import { Priority, State } from "../TaskObject";
import DownloadBox from "../components/DownloadBox";
import BoardSettings from "../components/BoardSettings";
import NoBoard from "../components/NoBoard";

const Home: React.FC = () => {
  const [boardcreation, OpenBoardCreationPanel] = useState<boolean>(false);
  const [boardselector, OpenBoardSelector] = useState<boolean>(false);
  const [currentboard, setCurrentBoard] = useState<BoardView>();
  const [boardOption, setBoardOption] = useState<string>("board");
  const [createTaskMenu, setCreateTaskMenu] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(true);
  const [taskSearch, setTaskSearch] = useState<string>("");

  const [filter, setFilter] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [filteredStates, setfilteredStates] = useState<State[]>([]);
  const [filteredPriorities, setfilteredPriorities] = useState<Priority[]>([]);

  useEffect(() => {
    setBoardOption("board");
  }, [currentboard]);

  const reloadTasks = () => {
    return;
  };

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

  useEffect(() => {
    if (!(boardOption === "board" && filter)) {
      setProgress(null);
      setfilteredPriorities([]);
      setfilteredStates([]);
    }
  }, [boardOption, filter]);

  return (
    <>
      <Sidebar
        openPanel={openBoardCreation}
        setMenuState={setOpenMenu}
        menuState={openMenu}
      ></Sidebar>
      {openMenu ? (
        <BoardMenu
          openSelector={openBoardSelector}
          boardselector={boardselector}
          closeSelector={closeBoardSelector}
          currentBoard={currentboard}
          setCurrentBoard={setCurrentBoard}
          boardOption={boardOption}
          setBoardOption={setBoardOption}
        ></BoardMenu>
      ) : (
        ""
      )}
      {boardcreation ? <CreateBoard closePanel={closeBoardCreation} /> : ""}
      {currentboard === undefined ? (
        <NoBoard></NoBoard>
      ) : (
        <div className="main_section">
          {boardOption === "board" ? (
            <>
              <Boardnav
                board={currentboard}
                setCreateTaskMenu={setCreateTaskMenu}
                taskSearch={taskSearch}
                setTaskSearch={setTaskSearch}
                setfilter={setFilter}
                filter={filter}
              />
              <TaskView
                boardid={currentboard?._id}
                filterenabled={filter}
                searchContent={taskSearch}
                filter_states={filteredStates}
                filter_priorities={filteredPriorities}
                filter_progress={progress}
                reloadTasks={reloadTasks}
              ></TaskView>
            </>
          ) : (
            ""
          )}
          {boardOption === "download" ? (
            <DownloadBox board={currentboard}></DownloadBox>
          ) : (
            ""
          )}
          {boardOption === "settings" ? (
            <BoardSettings
              board={currentboard}
              setCurrentboard={setCurrentBoard}
            />
          ) : (
            ""
          )}
          {boardOption === "stats" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <h1>Not implemented yet! 🛠</h1>
            </div>
          ) : (
            ""
          )}
          {boardOption === "features" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <h1>Not implemented yet! 🛠</h1>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {createTaskMenu && currentboard?._id ? (
        <AddTaskMenu
          setTaskCreateMenu={setCreateTaskMenu}
          board={currentboard}
          reloadTasks={reloadTasks}
        ></AddTaskMenu>
      ) : (
        ""
      )}

      {boardOption === "board" && filter ? (
        <Filter
          progress={progress}
          setprogress={setProgress}
          filteredstates={filteredStates}
          setfilteredStates={setfilteredStates}
          filteredPriorities={filteredPriorities}
          setFilteredPriorities={setfilteredPriorities}
        ></Filter>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
