import React, { useState, useEffect } from "react";
import testimg from "../assets/boardicon.jpg";
import Workspaces from "./Workspaces";
import { BoardView } from "../BoardView";
import logo from "../assets/icon.png";
import getColorById from "../Iconutils";

interface props {
  openSelector: () => void;
  closeSelector: () => void;
  boardselector: boolean;
  currentBoard: BoardView | undefined;
  setCurrentBoard: (b: BoardView) => void;
  boardOption: string;
  setBoardOption: (option: string) => void;
}

const BoardMenu: React.FC<props> = ({
  openSelector,
  boardselector,
  closeSelector,
  currentBoard,
  setCurrentBoard,
  boardOption,
  setBoardOption,
}) => {
  const handle: Function = () => {
    if (boardselector) {
      closeSelector();
    } else {
      openSelector();
    }
  };

  return (
    <>
      <div className="board_menu">
        <div className="board_menu_upper_section">
          <div
            className="upper_board_selecter"
            onClick={() => {
              handle();
            }}
          >
            <div className="upper_board_selecter_content">
              <div
                className="boardmenu_icon"
                style={{
                  backgroundColor: getColorById(currentBoard?.icon),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {currentBoard?.icon === undefined ? <h1>😴</h1> : ""}
              </div>
              <div className="board_utils">
                <h1>
                  {currentBoard ? (
                    currentBoard.name
                  ) : (
                    <>
                      No board
                      <br />
                      selected
                    </>
                  )}
                </h1>
                <p>{currentBoard?.description}</p>
              </div>
              <span className="material-symbols-rounded">
                {boardselector ? "close" : "expand_more"}
              </span>
            </div>
          </div>
          {boardselector ? (
            <Workspaces
              setCurrentBoard={setCurrentBoard}
              closeBoardSelector={closeSelector}
            />
          ) : (
            ""
          )}
          <div className="board_configuration_cards">
            <ul>
              <li
                onClick={() => setBoardOption("board")}
                style={{
                  backgroundColor: `var(${
                    boardOption === "board" ? "--option" : "--default"
                  })`,
                }}
              >
                <div>
                  <span className="material-symbols-rounded">leaderboard</span>
                  <a>Board</a>
                </div>
              </li>
              <li
                onClick={() => setBoardOption("stats")}
                style={{
                  backgroundColor: `var(${
                    boardOption === "stats" ? "--option" : "--default"
                  })`,
                }}
              >
                <div>
                  <span className="material-symbols-rounded">analytics</span>
                  <a>Stats</a>
                </div>
              </li>
              <li
                onClick={() => setBoardOption("features")}
                style={{
                  backgroundColor: `var(${
                    boardOption === "features" ? "--option" : "--default"
                  })`,
                }}
              >
                <div>
                  <span className="material-symbols-rounded">
                    trail_length_short
                  </span>
                  <a>Features</a>
                </div>
              </li>

              <li
                onClick={() => setBoardOption("download")}
                style={{
                  backgroundColor: `var(${
                    boardOption === "download" ? "--option" : "--default"
                  })`,
                }}
              >
                <div>
                  <span className="material-symbols-rounded">download</span>
                  <a>Download</a>
                </div>
              </li>
              <li
                onClick={() => setBoardOption("settings")}
                style={{
                  backgroundColor: `var(${
                    boardOption === "settings" ? "--option" : "--default"
                  })`,
                }}
              >
                <div>
                  <span className="material-symbols-rounded">settings</span>
                  <a>Settings</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="under_board_logo">
          <img src={logo}></img>
          <h1>TypeBoard</h1>
          <span className="material-symbols-rounded">heat</span>
        </div>
      </div>
    </>
  );
};

export default BoardMenu;
