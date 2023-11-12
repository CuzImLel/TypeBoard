import React, { useState } from "react";
import { BoardView } from "../BoardView";
import axios from "axios";
import getColorById from "../Iconutils";
import ErrorCard from "./ErrorCard";

interface props {
  board: BoardView | undefined;
  setCurrentboard: (board: BoardView) => void;
}

const BoardSettings: React.FC<props> = ({ board, setCurrentboard }) => {
  const [title, setTitle] = useState<string | undefined>(board?.name);
  const [description, setDescription] = useState<string | undefined>(
    board?.description
  );
  const [error, setError] = useState<string>("");
  const [color, setColor] = useState<string | undefined>(
    getColorById(board?.icon)
  );
  const showError = (err: string): void => {
    setError(err);
    setTimeout((): void => {
      setError("");
    }, 3000);
  };

  const validateValues = (): boolean => {
    const regex = /\s/;
    if (
      title != undefined &&
      description != undefined &&
      title.length >= 3 &&
      description.length >= 3
    ) {
      return false;
    } else {
      return true;
    }
  };

  const sendToBackend = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    if (validateValues()) {
      showError("Invalid Inputs");
      return;
    }

    let identifier: number = 0;

    switch (color) {
      case "purple":
        identifier = 1;
        break;
      case "yellow":
        identifier = 2;
        break;
      case "green":
        identifier = 3;
        break;
    }

    axios
      .post("http://localhost:8080/board/update-board", {
        id: board?._id,
        name: title,
        description: description,
        background: identifier,
      })
      .then((res) => {
        console.log("Board updated successfully");
        if (
          board != undefined &&
          title != undefined &&
          description != undefined
        ) {
          const newBoardView: BoardView = {
            _id: board._id,

            name: title,
            description: description,
            icon: identifier,
          };
          setCurrentboard(newBoardView);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteBoard = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/task/delete-boardtasks", {
        board: board?._id,
      })
      .then((res) => {
        axios
          .post("http://localhost:8080/board/delete-board", {
            id: board?._id,
          })
          .then((res) => {
            console.log("Board deleted successfully");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="boardsettings">
      <div className="boardsettings_content">
        <h1>Edit your Board!</h1>
        <form>
          <div className="settings_seperator">
            <label>Name</label>
            <input
              id="name_change"
              type="text"
              placeholder={title}
              value={title}
              onChange={(e) => {
                if (e.target.value.length <= 20) {
                  setTitle(e.target.value);
                }
              }}
            ></input>
          </div>
          <div className="settings_seperator">
            <label>Description</label>
            <input
              id="description_change"
              type="text"
              placeholder={description}
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setDescription(e.target.value);
                }
              }}
            ></input>
          </div>
          <div className="board_background_creater_2">
            <label>Icon:</label>
            <ul className="colorblock_list_2">
              <div
                className="colorblock_purple"
                onClick={() => setColor("purple")}
                style={{
                  borderColor:
                    color == "purple" ? "var(--icon_hover)" : "transparent",
                }}
              >
                {color == "purple" ? (
                  <span className="material-symbols-rounded" id="color_tick">
                    done
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div
                className="colorblock_yellow"
                onClick={() => setColor("yellow")}
                style={{
                  borderColor:
                    color == "yellow" ? "var(--icon_hover)" : "transparent",
                }}
              >
                {color == "yellow" ? (
                  <span className="material-symbols-rounded" id="color_tick">
                    done
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div
                className="colorblock_green"
                onClick={() => setColor("green")}
                style={{
                  borderColor:
                    color == "green" ? "var(--icon_hover)" : "transparent",
                }}
              >
                {color == "green" ? (
                  <span className="material-symbols-rounded" id="color_tick">
                    done
                  </span>
                ) : (
                  ""
                )}
              </div>
            </ul>
          </div>
          <div className="board_update_buttons">
            <button
              type="submit"
              className="update_board_submit"
              onClick={sendToBackend}
            >
              Update*
            </button>
            <button
              type="submit"
              className="update_board_delete"
              onClick={(e) => deleteBoard(e)}
            >
              Delete*
            </button>
          </div>
        </form>
      </div>
      {error !== "" ? <ErrorCard text={error} /> : ""}
    </div>
  );
};

export default BoardSettings;
