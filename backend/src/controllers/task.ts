import express from "express";
import {
  createNewTodo,
  getTodoByID,
  getTodos,
  getTodosByBoard,
  setTodoDescription,
  setTodoLabels,
  setTodoState,
  setTodoTitle,
  deleteTodo,
} from "../db/task";

export const createTodo = (req: express.Request, res: express.Response) => {
  const [board, title, description] = req.body;
  if (board && title && description) {
    createNewTodo(board, title, description);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const deleteTask = (req: express.Request, res: express.Response) => {
  const [id] = req.body;
  if (id) {
    deleteTodo(id);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTodotitle = (req: express.Request, res: express.Response) => {
  const [id, title] = req.body;
  if (id && title) {
    setTodoTitle(id, title);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTododescription = (
  req: express.Request,
  res: express.Response
) => {
  const [id, description] = req.body;
  if (id && description) {
    setTodoDescription(id, description);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTodostate = (req: express.Request, res: express.Response) => {
  const [id, state] = req.body;
  if (id && state) {
    setTodoState(id, state);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTodolabels = (req: express.Request, res: express.Response) => {
  const [id, labels] = req.body;
  if (id && labels) {
    setTodoLabels(id, labels);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const getTodoById = (req: express.Request, res: express.Response) => {
  const [id] = req.body;
  if (id) {
    return res.send(getTodoByID(id)).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const getTodosByboard = (
  req: express.Request,
  res: express.Response
) => {
  const [boardid] = req.body;
  if (boardid) {
    return res.send(getTodosByBoard(boardid)).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const getAllTodos = (req: express.Request, res: express.Response) => {
  return res.send(getTodos()).json().end();
};
