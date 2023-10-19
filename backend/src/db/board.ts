import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  background: { type: Number, required: true },
  todos: { type: Number, required: false, default: 0 },
  date: { type: Date, required: false, default: Date.now },
});

export const Board = mongoose.model("Board", BoardSchema);

export const createNewBoard = async (
  name: string,
  background: number,
  description: string
) => {
  try {
    const newBoard = new Board({
      name: name,
      description: description,
      background: background,
    });

    await newBoard.save();
  } catch (error) {}
};
export const getBoards = () => Board.find().lean();
export const getBoardByName = (name: string) => Board.findOne({ name });
export const deleteBoardByName = (name: string) => Board.deleteOne({ name });
export const changeBoardName = (name: string, newname: string) =>
  Board.updateOne({ name }, { name: newname });
export const changeBoardDescription = (name: string, description: string) =>
  Board.updateOne({ name }, { description: description });
export const changeTodoAmount = (name: string, todos: number) =>
  Board.updateOne({ name }, { todos: todos });
export const changeBoardBackground = (name: string, background: number) =>
  Board.updateOne({ name }, { background: background });
