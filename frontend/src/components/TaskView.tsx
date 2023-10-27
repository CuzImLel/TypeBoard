import React, { useEffect, useState } from "react";
import TaskObject from "../TaskObject";
import axios from "axios";
import Task from "./Task";


interface props {
  boardid:string | undefined;
  searchContent: string;
}


const TaskView: React.FC<props> = ({boardid, searchContent}) => {


    const [tasks, setTasks] = useState<TaskObject[]>();

   
    useEffect(() => {
      axios
        .get("http://localhost:8080/task/get-todos-by-board", {
          params: {
             boardid:boardid,
          },
          
      })
        .then((response) => {
          const payload = response.data;

      
          setTasks(payload);
          console.log("SUCCESSFULLY PULLED ALL TASKS ")
        
        })
        .catch((err) => console.log(err));
    }, [boardid, searchContent]);


  return (
    <div className="task_view">
      {tasks ? (
    tasks.map((task) => (
      (searchContent ?
        task.title.toLowerCase().startsWith(searchContent.toLowerCase()) ? <Task t={task} /> : null : 
        <Task t={task} />
        )
     
    ))
  ) : (
    <span className="material-symbols-outlined" id="loading_symbol">
      sync
    </span>
  )}
    </div>
  );
};

export default TaskView;
