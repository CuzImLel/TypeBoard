import React, { useEffect, useRef, useState } from "react";
import TaskObject, { Priority, State } from "../TaskObject";
import axios from "axios";
import TaskDescriptionModal from "./TaskDescriptionModal";

interface props {
  t: TaskObject;
  fetchData: () => void;
}

function formatDateToDDMMYYYY(inputDate: Date): string {
  const date: Date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}:${month}:${year} at ${hours}:${minutes}`;
}

function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) {
    return input;
  }

  return input.charAt(0).toUpperCase() + input.slice(1);
}

const Task: React.FC<props> = ({ t, fetchData }) => {
  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditing2, setIsEditing2] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(t.title);

  const [progress, setProgress] = useState<number | string>(t.progress);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (): void => {
    axios
      .post("http://localhost:8080/task/delete-task", {
        id: t._id,
      })
      .then((res) => {
        console.log("Task deleted successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const getColor = (): string => {
    if (t.priority === Priority.Low) {
      return "var(--priority_low)";
    } else if (t.priority === Priority.MEDIUM) {
      return "var(--priority_medium)";
    } else if (t.priority === Priority.HIGH) {
      return "var(--priority_high)";
    }

    return "black";
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleEdit = () => {
    setIsEditing(true);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleSave = () => {
    axios
      .post("http://localhost:8080/task/change-title", {
        id: t._id,
        title: editedTitle,
      })
      .then((res) => {
        console.log("Changed task name successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
    setIsEditing(false);
  };

  const handleProgressSave = (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    setIsEditing2(false);
    e.preventDefault();
    axios
      .post("http://localhost:8080/task/change-progress", {
        id: t._id,
        progress: progress,
      })
      .then((res) => {
        console.log("Changed task progress successfully");
        setProgress(progress);
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const changeState = (s: State): void => {
    axios
      .post("http://localhost:8080/task/change-state", {
        id: t._id,
        state: s,
      })
      .then((res) => {
        console.log("Changed task state successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  const changePriority = (p: Priority): void => {
    axios
      .post("http://localhost:8080/task/change-priority", {
        id: t._id,
        priority: p,
      })
      .then((res) => {
        console.log("Changed task priority successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="task_container">
        <div className="inner_task_container">
          <select
            className="task_container_infos_priority"
            style={{ color: getColor() }}
          >
            <option
              value={Priority.HIGH}
              selected={t.priority.toUpperCase() == Priority.HIGH.toUpperCase()}
              onClick={() => changePriority(Priority.HIGH)}
            >
              HIGH
            </option>
            <option
              value={Priority.MEDIUM}
              selected={
                t.priority.toUpperCase() == Priority.MEDIUM.toUpperCase()
              }
              onClick={() => changePriority(Priority.MEDIUM)}
            >
              MEDIUM
            </option>
            <option
              value={Priority.Low}
              selected={t.priority.toUpperCase() == Priority.Low.toUpperCase()}
              onClick={() => changePriority(Priority.Low)}
            >
              LOW
            </option>
          </select>

          <div className="header_task">
            {isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTitleSave();
                }}
              >
                <input
                  type="text"
                  value={editedTitle}
                  onBlur={handleTitleSave}
                  ref={inputRef}
                  id="title_changer"
                  onChange={(e) => {
                    if (e.target.value.length <= 40) {
                      handleTitleChange(e);
                    }
                  }}
                />
              </form>
            ) : (
              <h1 className="task_container_title">{t.title}</h1>
            )}
            <span
              className="material-symbols-rounded"
              onClick={handleTitleEdit}
            >
              edit
            </span>
          </div>
          <form
            className="progress_form"
            onSubmit={(e) => handleProgressSave(e)}
          >
            <input
              type="number"
              min={0}
              max={100}
              placeholder={t.progress.toString()}
              value={isEditing2 ? progress : t.progress}
              onChange={(e) => {
                setIsEditing2(true);
                setProgress(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value.replace(/^0+/, "")) || "0"
                );
              }}
              className="progressvalue"
              onBlur={(e) => handleProgressSave(e)}
            ></input>
            <p>%</p>
          </form>
          <div className="task_progress_bar">
            <div
              className="task_progress_bar_filled"
              style={{ width: `${t.progress}%` }}
            ></div>
          </div>

          <div className="task_container_infos">
            <select className="task_container_infos_state">
              <option
                value={State.FINISHED}
                selected={t.state == State.FINISHED}
                onClick={() => changeState(State.FINISHED)}
              >
                Finished
              </option>
              <option
                value={State.IN_PROGRESS}
                selected={t.state == State.IN_PROGRESS}
                onClick={() => changeState(State.IN_PROGRESS)}
              >
                In Progress
              </option>
              <option
                value={State.REMAINING}
                selected={t.state == State.REMAINING}
                onClick={() => changeState(State.REMAINING)}
              >
                Remaining
              </option>
            </select>
            <div className={t.state + "_dot"}></div>
          </div>

          <div className="task_container_footer">
            <p>{"Created: " + formatDateToDDMMYYYY(t.date)}</p>
            <div className="task_options">
              <span
                id="description_icon"
                className="material-symbols-rounded"
                onClick={() => setDescriptionModal(true)}
              >
                description
              </span>
              <span
                className="material-symbols-rounded"
                id="trashbin_icon"
                onClick={() => handleDelete()}
              >
                delete
              </span>
            </div>
          </div>
        </div>
      </div>
      {descriptionModal ? (
        <TaskDescriptionModal
          t={t}
          fetchData={fetchData}
          closeModal={setDescriptionModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Task;
