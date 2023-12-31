import React from "react";
import { BoardView } from "../BoardView";
import { Board } from "../Board";
import getColorById from "../Iconutils";
import AddTaskMenu from "./AddTaskMenu";

interface props {
  board: BoardView | undefined;
  setCreateTaskMenu: (bool: boolean) => void;
  taskSearch: string;
  setTaskSearch: (content: string) => void;
  setfilter: (value: boolean) => void;
  filter: boolean;
}

const Boardnav: React.FC<props> = ({
  board,
  setCreateTaskMenu,
  taskSearch,
  setTaskSearch,
  setfilter,
  filter,
}) => {
  return (
    <>
      <div className="boardnav">
        <div className="boardnav_content">
          <div className="boardnav_left">
            <div
              className="boardnav_left_left"
              style={{ backgroundColor: getColorById(board?.icon) }}
            ></div>
            <div className="boardnav_left_right">
              <li>
                <h1>{board?.name}</h1>
              </li>
              <li>
                <a>{board?.description}</a>
              </li>
            </div>
          </div>
          <div className="boardnav_right">
            <ul>
              <button
                className="add_task_button"
                onClick={() => setCreateTaskMenu(true)}
              >
                Add Task*
              </button>

              <form onSubmit={(e) => e.preventDefault()}>
                <button type="submit">
                  {" "}
                  <span className="material-symbols-outlined">search</span>
                </button>
                <input
                  type="text"
                  placeholder="Search for tasks"
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                ></input>
              </form>

              <li onClick={() => setfilter(!filter)}>
                <span className="material-symbols-outlined">filter_list</span>
                <a>Filter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Boardnav;
