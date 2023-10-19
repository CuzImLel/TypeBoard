import express from "express";

import {
  createTodo,
  deleteTask,
  getAllTodos,
  getTodoById,
  getTodosByboard,
  setTododescription,
  setTodolabels,
  setTodostate,
  setTodotitle,
} from "../controllers/task";

export default (router: express.Router) => {
  router.post("/task/create-task", createTodo);
  router.post("/task/delete-task", deleteTask);
  router.post("/task/change-title", setTodotitle);
  router.post("/task/change-description", setTododescription);
  router.post("/task/change-state", setTodostate);
  router.post("/task/change-labels", setTodolabels);
  router.get("/task/get-todo-by-id", getTodoById);
  router.get("/task/get-todos-by-board", getTodosByboard);
  router.get("/task/get-all-todos", getAllTodos);
};
