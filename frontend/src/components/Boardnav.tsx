import React from "react";
import { BoardView } from "../BoardView";
import { Board } from "../Board";

interface props {
  board: BoardView | undefined;
}

const Boardnav: React.FC<props> = ({ board }) => {
  return (
    <div className="boardnav">
      <div className="boardnav_content">
        <div className="boardnav_left">
          <li>
            <a>{board?.name}</a>
          </li>
          <li>
            <a>{board?.description}</a>
          </li>
        </div>
        <div className="boardnav_right">
          <ul>
            <button className="add_task_button">Add Task*</button>

            <form>
              <button type="submit">
                {" "}
                <span className="material-symbols-outlined">search</span>
              </button>
              <input type="text" placeholder="Search for tasks"></input>
            </form>

            <li>
              <span className="material-symbols-outlined">push_pin</span>
              <a>Pinned</a>
            </li>
            <li>
              <span className="material-symbols-outlined">visibility</span>
              <a>View</a>
            </li>
            <li>
              <span className="material-symbols-outlined">filter_list</span>
              <a>Filter</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Boardnav;
