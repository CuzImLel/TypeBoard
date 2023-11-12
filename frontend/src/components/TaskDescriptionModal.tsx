import React, { useEffect, useRef, useState } from "react";
import TaskObject from "../TaskObject";
import axios from "axios";

interface props {
  t: TaskObject;
  closeModal: (value: boolean) => void;
  fetchData: () => void;
}

const TaskDescriptionModal: React.FC<props> = ({
  t,
  closeModal,
  fetchData,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedDescription, setEditedDescription] = useState<string>(
    t.description
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleTitleEdit = () => {
    setIsEditing(true);
  };
  const handleTitleChange = (e: string) => {
    setEditedDescription(e);
  };

  const handleDescriptionSave = () => {
    axios
      .post("http://localhost:8080/task/change-description", {
        id: t._id,
        description: editedDescription,
      })
      .then((res) => {
        console.log("Changed task description successfully");
        fetchData();
      })
      .catch((err) => console.log(err));
    setIsEditing(false);
  };

  return (
    <div className="task_description_modal">
      <div className="task_description_modal_content">
        <div className="task_description_modal_uppercontent">
          <h1>{t.title}</h1>

          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleDescriptionSave();
              }}
            >
              <textarea
                value={editedDescription}
                style={{ resize: "none" }}
                onBlur={handleDescriptionSave}
                ref={inputRef}
                id="description_changer"
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    handleTitleChange(e.target.value);
                  }
                }}
              ></textarea>
            </form>
          ) : (
            <p>{editedDescription}</p>
          )}
        </div>
        <div className="task_description_modal_undercontent">
          <button className="change_task_description" onClick={handleTitleEdit}>
            Edit!
          </button>
          <button
            className="got_it_task_description"
            onClick={() => {
              closeModal(false);
              handleDescriptionSave();
            }}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDescriptionModal;
