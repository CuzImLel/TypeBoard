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
import { Priority } from "../utils/priorities";

export const createTodo = async (req: express.Request, res: express.Response) => {
  const { board, title, description, priority } = req.body;
  if (board && title && description && priority) {
    const todo = createNewTodo(board, title, description, priority);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const deleteTask = async (req: express.Request, res: express.Response) => {
  const { id } = req.body;
  if (id) {
    deleteTodo(id);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTodotitle = async (req: express.Request, res: express.Response) => {
  const { id , title} = req.body;
  if (id && title) {
    setTodoTitle(id, title);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTododescription =  async (
  req: express.Request,
  res: express.Response
) => {
  const { id , description} = req.body;
  if (id && description) {
    setTodoDescription(id, description);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTodostate =  async (req: express.Request, res: express.Response) => {
  const { id , state} = req.body;
  if (id && state) {
    setTodoState(id, state);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTodolabels = async (req: express.Request, res: express.Response) => {
  const { id , labels} = req.body;
  if (id && labels) {
    setTodoLabels(id, labels);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const getTodoById = async (req: express.Request, res: express.Response) => {
  const { id } = req.query;
  if (id) {
    getTodoByID(id as string)
  } else {
    return res.sendStatus(400).json();
  }
};

export const getTodosByboard = async (
  req: express.Request,
  res: express.Response
) => {
  const { boardid } = req.query;
  if (boardid) {
    const tasks = await getTodosByBoard(boardid as string);
    return res.json(tasks);
  } else {
    return res.sendStatus(400).json();
  }
};

export const getAllTodos = async (req: express.Request, res: express.Response) => {

  const tasks = await getTodos();
  return res.json(tasks);
};
