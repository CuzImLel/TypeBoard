import axios from "axios";
import React from "react";
import { BoardView } from "../BoardView";
import getColorById from "../Iconutils";

interface props {
  title: string;
  description: string;
  background: number;
  setCurrentBoard: (board: BoardView) => void;
  closeSelector: () => void;
}

const BoardSelectionCard: React.FC<props> = ({
  title,
  description,
  background,
  setCurrentBoard,
  closeSelector,
}) => {
  const handleClick = (): void => {
    axios
      .get("http://localhost:8080/board/get-board-by-name", {
        params: {
          name: title,
        },
      })
      .then((res) => {
        const board: BoardView = {
          _id: res.data._id,
          board: res.data.board,
          name: res.data.name,
          description: res.data.description,
          icon: res.data.background
        };

        setCurrentBoard(board);
        closeSelector();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="board_selection_card" onClick={() => handleClick()}>
      <div className="board_selection_card_left" style={{backgroundColor: getColorById(background)}}></div>
      <div className="board_selection_card_right">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BoardSelectionCard;
