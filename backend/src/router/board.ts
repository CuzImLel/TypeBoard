import express from "express";

import {
  createBoard,
  changeBoarddescription,
  changeBoardname,
  changeBoardbackground,
  deleteBoard,
  changeTodoamount,
  getAllBoards,
  getBoardById,
  updateBoard,
} from "../controllers/board";

export default (router: express.Router) => {
  router.post("/board/create-board", createBoard);
  router.post("/board/change-board-name", changeBoardname);
  router.post("/board/change-board-description", changeBoarddescription);
  router.post("/board/change-board-background", changeBoardbackground);
  router.post("/board/delete-board", deleteBoard);
  router.post("/board/change-todo-amount", changeTodoamount);
  router.post("/board/update-board", updateBoard);
  router.get("/board/get-all-boards", getAllBoards);
  router.get("/board/get-board-by-id", getBoardById);
};
