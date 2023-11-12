import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: false },
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
export const getBoardByID = (id: string) => Board.findOne({ _id: id });
export const deleteBoardByID = (id: string) => Board.deleteOne({ _id: id });
export const changeBoardName = (id: string, newname: string) =>
  Board.updateOne({ _id: id }, { name: newname });
export const changeBoardDescription = (id: string, description: string) =>
  Board.updateOne({ _id: id }, { description: description });
export const changeTodoAmount = (id: string, todos: number) =>
  Board.updateOne({ _id: id }, { todos: todos });
export const changeBoardBackground = (id: string, background: number) =>
  Board.updateOne({ _id: id }, { background: background });
export const updateBoardStats = (
  id: string,
  name: string,
  description: string,
  background: number
) =>
  Board.updateOne(
    { _id: id },
    { name: name, description: description, background: background }
  );
