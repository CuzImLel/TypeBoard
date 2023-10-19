import express from "express";
import {
  createNewBoard,
  getBoards,
  getBoardByName,
  deleteBoardByName,
  changeBoardName,
  changeBoardDescription,
  changeTodoAmount,
  changeBoardBackground,
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
  const { name, description } = req.body;

  if (name && description) {
    changeBoardDescription(name, description);

    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const changeBoardname = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, newName } = req.body;
  if (name && newName) {
    changeBoardName(name, newName);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const changeBoardbackground = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, background } = req.body;
  if (name && background) {
    changeBoardBackground(name, background);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const deleteBoard = async (
  req: express.Request,
  res: express.Response
) => {
  const { name } = req.body;
  if (name) {
    deleteBoardByName(name);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const changeTodoamount = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, amount } = req.body;

  if (name && amount) {
    changeTodoAmount(name, amount);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const getBoardByname = async (
  req: express.Request,
  res: express.Response
) => {
  const { name } = req.query;
  if (name) {
    const board = await getBoardByName(name as string);
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
