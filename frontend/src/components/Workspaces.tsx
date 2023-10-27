import axios from "axios";
import React, { useEffect, useState } from "react";
import BoardSelectionCard from "./BoardSelectionCard";
import { BoardView } from "../BoardView";

interface props {
  setCurrentBoard: (board: BoardView) => void;
  closeBoardSelector: () => void;
}

const Workspaces: React.FC<props> = ({
  setCurrentBoard,
  closeBoardSelector,
}) => {
  type Board = {
    _id: string;
    name: string;
    description: string;
    background: number;
    todos: number;
    date: Date;
  };

  const [boards, setBoards] = useState<Board[]>();

  useEffect(() => {
    axios
      .get("http://localhost:8080/board/get-all-boards")
      .then((response) => {
        const payload = response.data;
        setBoards(payload);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="workspaces">
      <div className="workspaces_content">
        <div className="workspaces_header">
          <a>Your Boards</a>
        </div>
        <div className="workspaces_list">
          {boards?.map((board) => (
            <BoardSelectionCard
              title={board.name}
              description={board.description}
              background={board.background}
              setCurrentBoard={setCurrentBoard}
              closeSelector={closeBoardSelector}
            />
          )) ?? (
            <span className="material-symbols-outlined" id="loading_symbol">sync</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
