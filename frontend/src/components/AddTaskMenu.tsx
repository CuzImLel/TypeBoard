import axios from "axios";
import React, { useState } from "react";
import ErrorCard from "./ErrorCard";
import { Priority } from "../TaskObject";
import { BoardView } from "../BoardView";


interface props {
  board: BoardView;
  setTaskCreateMenu: (bool:boolean) => void;

}

const AddTaskMenu: React.FC<props> = ({board, setTaskCreateMenu}) => {

  const [selectedPriority, setSelectedPriority] = useState<Priority>(Priority.Low);
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
  
  if (
    title.length >= 3 &&
    description.length >= 3 
    
  ) {
    return false;
  } else {
    return true;
  }
};



  const sendToBackend = (e:React.MouseEvent<HTMLElement>):void => {
      e.preventDefault();
      if (validateValues()) {
        showError("Invalid Inputs");
        return;
      } else {
    axios
    .post("http://localhost:8080/task/create-task", {
      board: board._id,
      title: title,
      description: description,
      priority: selectedPriority
    })
    .then((res) => {
      console.log("Task created successfully");
      setTaskCreateMenu(false)
      
    })
    .catch((err) => console.log(err));
   }
  }
  return (
    <>
    <div className="add_task_menu">
        <div className="add_task_menu_content">
          <div className="add_task_menu_top">
              <h1>Create new Task</h1>
              
              <span className="material-symbols-rounded" onClick={() => setTaskCreateMenu(false)}>
              close
            </span>
            
          </div>
          <div className="add_task_menu_bottom">
              <form>
                <li>
                  <label>Name</label>
                  <input type="text" required placeholder="Type in your task name!" value={title} onChange={(e) => {
                if (e.target.value.length <= 50) {
                  setTitle(e.target.value);
                }
              }}></input>
                </li>
                <li>
                  <label>Description</label>
                  <input type="text" required placeholder="Type in your task description!" value={description} onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setDescription(e.target.value);
                }
              }}></input>
                </li>
                <li>
                  <label>Select task priority!</label>
                  <div className="create_task_state_selector">

                      <div className="create_task_state_remaining" id="task_state" onClick={() => setSelectedPriority(Priority.Low)}>
                        <div className="create_task_state_inner">
                          {selectedPriority === Priority.Low ? <span className="material-symbols-rounded">
                        done
                       </span>: ""}
                        
                       <p>Low</p>
                       
                        </div>
                        
                      </div>


                      <div className="create_task_state_progress" id="task_state" onClick={() => setSelectedPriority(Priority.MEDIUM)}>
                      <div className="create_task_state_inner">
                      {selectedPriority === Priority.MEDIUM ? <span className="material-symbols-rounded">
                        done
                       </span>: ""}
                       <p>Medium</p>
                      
                       
                       </div>
                      </div>


                      <div className="create_task_state_finished" id="task_state" onClick={() => setSelectedPriority(Priority.HIGH)}> 
                      <div className="create_task_state_inner">
                      {selectedPriority === Priority.HIGH ? <span className="material-symbols-rounded">
                        done
                       </span>: ""}
                       <p>High</p>
                        
                       
                       </div>
                      </div>


                  </div>
                </li>
                <li>
                  <div className="create_task_buttom_section">
                  <button type="submit" onClick={sendToBackend}>Add Task*</button>
                  </div>
                </li>
              </form>
            </div>
           
        </div>
    </div>
    {error !== "" ? <ErrorCard text={error} /> : ""}
    </>
  );
};

export default AddTaskMenu;
