import express from "express";
import {
  createNewTodo,
  getTodoByID,
  getTodos,
  getTodosByBoard,
  setTodoDescription,
  setTodoState,
  setTodoTitle,
  deleteTodo,
  setTodoPriority,
  setTodoprogress,
  deleteBoardTasks,
} from "../db/task";
import { Priority } from "../utils/priorities";

export const createTodo = async (
  req: express.Request,
  res: express.Response
) => {
  const { board, title, description, priority } = req.body;
  if (board && title && description && priority) {
    const todo = createNewTodo(board, title, description, priority);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.body;
  if (id) {
    await deleteTodo(id);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTodotitle = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, title } = req.body;
  if (id && title) {
    await setTodoTitle(id, title);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTododescription = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, description } = req.body;
  if (id && description) {
    await setTodoDescription(id, description);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setTodostate = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, state } = req.body;
  if (id && state) {
    await setTodoState(id, state);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const setPriority = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, priority } = req.body;
  if (id && priority) {
    await setTodoPriority(id, priority);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const getTodoById = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.query;
  if (id) {
    getTodoByID(id as string);
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

export const getAllTodos = async (
  req: express.Request,
  res: express.Response
) => {
  const tasks = await getTodos();
  return res.json(tasks);
};

export const setTodoProgress = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, progress } = req.body;
  if (id && progress) {
    await setTodoprogress(id, progress);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};

export const deleteTasksByBoard = async (
  req: express.Request,
  res: express.Response
) => {
  const { board } = req.body;
  if (board) {
    await deleteBoardTasks(board);
    return res.sendStatus(200).json().end();
  } else {
    return res.sendStatus(400).json();
  }
};
