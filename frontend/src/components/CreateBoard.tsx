import axios from "axios";
import React, { useState } from "react";
import ErrorCard from "./ErrorCard";

interface props {
  closePanel: () => void;
}

const CreateBoard: React.FC<props> = ({ closePanel }) => {
  const [color, setColor] = useState<string>("purple");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const showError = (err: string): void => {
    setError(err);
    setTimeout((): void => {
      setError("");
    }, 3000);
  };

  const validateValues = (): boolean => {
    const regex = /\s/;
    if (
      title.length >= 3 &&
      description.length >= 3 &&
      !regex.test(title) &&
      !regex.test(description)
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
      .post("http://localhost:8080/board/create-board", {
        name: title,
        description: description,
        background: identifier,
      })
      .then((res) => {
        console.log("Board created successfully");
        closePanel();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_board_panel">
      <div className="create_board_panel_content">
        <p>Create new board</p>
        <form>
          <div className="board_name_creater">
            <label>Title*:</label>
            <input
              type="text"
              required
              placeholder="Type in your board name"
              value={title}
              onChange={(e) => {
                if (e.target.value.length <= 20) {
                  setTitle(e.target.value);
                }
              }}
            ></input>
          </div>
          <div className="board_description_creater">
            <label>Description*:</label>
            <input
              type="text"
              required
              placeholder="Type in your board description"
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setDescription(e.target.value);
                }
              }}
            ></input>
          </div>
          <div className="board_background_creater">
            <label>Icon*:</label>
            <ul className="colorblock_list">
              <div
                className="colorblock_purple"
                onClick={() => setColor("purple")}
                style={{
                  borderColor:
                    color == "purple" ? "var(--icon_hover)" : "transparent",
                }}
              ></div>

              <div
                className="colorblock_yellow"
                onClick={() => setColor("yellow")}
                style={{
                  borderColor:
                    color == "yellow" ? "var(--icon_hover)" : "transparent",
                }}
              ></div>

              <div
                className="colorblock_green"
                onClick={() => setColor("green")}
                style={{
                  borderColor:
                    color == "green" ? "var(--icon_hover)" : "transparent",
                }}
              ></div>
            </ul>
          </div>
          <section className="submit_boardcreation">
            <button
              type="submit"
              className="create_board_submit"
              onClick={sendToBackend}
            >
              Create*
            </button>
            <button
              type="submit"
              className="close_board_creation"
              onClick={closePanel}
            >
              Cancel*
            </button>
          </section>
        </form>
      </div>
      {error !== "" ? <ErrorCard text={error} /> : ""}
    </div>
  );
};

export default CreateBoard;
