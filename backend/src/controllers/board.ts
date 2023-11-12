import express from "express";
import {
  createNewBoard,
  getBoards,
  getBoardByID,
  deleteBoardByID,
  changeBoardName,
  changeBoardDescription,
  changeTodoAmount,
  changeBoardBackground,
  updateBoardStats,
} from "../db/board";

export const createBoard = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, description, background } = req.body;

  if (!name || !background || !description) {
    return res.sendStatus(400).json();
  }

  if (name && background && description) {
    const board = createNewBoard(name, background, description);
    return res.sendStatus(200).json().end();
  }
};

export const changeBoarddescription = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, description } = req.body;

  if (id && description) {
    changeBoardDescription(id, description);

    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const changeBoardname = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, newName } = req.body;
  if (id && newName) {
    changeBoardName(id, newName);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const changeBoardbackground = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, background } = req.body;
  if (id && background) {
    changeBoardBackground(id, background);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const deleteBoard = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.body;
  if (id) {
    await deleteBoardByID(id);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const changeTodoamount = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, amount } = req.body;

  if (id && amount) {
    changeTodoAmount(id, amount);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const updateBoard = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, name, description, background } = req.body;

  if (name && description && background) {
    await updateBoardStats(id, name, description, background);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const getBoardById = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.query;
  if (id) {
    const board = await getBoardByID(id as string);
    return res.json(board);
  } else {
    return res.sendStatus(400).json().end;
  }
};

export const getAllBoards = async (
  req: express.Request,
  res: express.Response
) => {
  const boards = await getBoards();
  return res.json(boards);
};
