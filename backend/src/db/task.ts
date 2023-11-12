import mongoose from "mongoose";
import { State } from "../utils/states";
import { Priority } from "../utils/priorities";

const TaskSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: false },
  board: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: false, default: Date.now },
  state: {
    type: String,
    enum: Object.values(State),
    required: false,
    default: State.REMAINING,
  },

  progress: { type: Number, required: false, default: 0 },
  priority: {
    type: String,
    enum: Object.values(Priority),
    required: true,
    default: Priority.Low,
  },
});

export const Task = mongoose.model("Task", TaskSchema);

export const createNewTodo = async (
  board: string,
  title: string,
  description: string,
  priority: string
) => {
  try {
    const newTodo = new Task({
      board: board,
      title: title,
      description: description,
      priority: priority,
    });

    await newTodo.save();
  } catch (error) {
    console.log(error);
  }
};
export const getTodos = () => Task.find();
export const getTodosByBoard = (boardid: string) =>
  Task.find({ board: boardid });
export const getTodoByID = (id: string) => Task.findOne({ _id: id });
export const setTodoTitle = (id: string, title: string) =>
  Task.updateOne({ _id: id }, { $set: { title: title } });
export const setTodoDescription = (id: string, description: string) =>
  Task.updateOne({ _id: id }, { description: description });
export const setTodoState = (id: string, state: State) =>
  Task.updateOne({ _id: id }, { state: state });
export const setTodoPriority = (id: string, priority: Priority) =>
  Task.updateOne({ _id: id }, { priority: priority });
export const setTodoprogress = (id: string, progress: number) =>
  Task.updateOne({ _id: id }, { progress: progress });
export const deleteTodo = (id: string) => Task.deleteOne({ _id: id });
export const deleteBoardTasks = (board: string) =>
  Task.deleteMany({ board: board });
