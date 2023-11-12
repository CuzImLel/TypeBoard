import React, { useEffect, useState } from "react";
import TaskObject, { Priority, State } from "../TaskObject";
import axios from "axios";
import Task from "./Task";

interface props {
  boardid: string | undefined;
  searchContent: string;
  filterenabled: boolean;
  filter_states: State[];
  filter_priorities: Priority[];
  filter_progress: number | null;

  reloadTasks: () => void;
}

const TaskView: React.FC<props> = ({
  boardid,
  searchContent,

  filter_priorities,
  filter_progress,
  filterenabled,
  filter_states,
  reloadTasks,
}) => {
  const [tasks, setTasks] = useState<TaskObject[]>();

  const fetchData = (): void => {
    axios
      .get("http://localhost:8080/task/get-todos-by-board", {
        params: {
          boardid: boardid,
        },
      })
      .then((response) => {
        const payload = response.data;

        setTasks(payload);
        console.log("SUCCESSFULLY PULLED ALL TASKS ");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [
    boardid,
    searchContent,
    reloadTasks,
    filter_priorities,
    filter_progress,
    filter_states,
  ]);

  const checkTasks = (tasks: TaskObject[]): TaskObject[] => {
    if (!filterenabled) {
      return tasks;
    }

    return tasks.filter((task) => {
      let meetsFilterCriteria = true;

      if (
        filter_priorities.length > 0 &&
        !filter_priorities.includes(task.priority)
      ) {
        meetsFilterCriteria = false;
      }

      if (filter_states.length > 0 && !filter_states.includes(task.state)) {
        meetsFilterCriteria = false;
      }

      if (filter_progress !== null && filter_progress !== task.progress) {
        meetsFilterCriteria = false;
      }

      return meetsFilterCriteria;
    });
  };

  return (
    <div className="task_view">
      {tasks ? (
        checkTasks(tasks).map((task) =>
          searchContent ? (
            task.title.toLowerCase().startsWith(searchContent.toLowerCase()) ? (
              <Task t={task} fetchData={fetchData} />
            ) : null
          ) : (
            <Task t={task} fetchData={fetchData} />
          )
        )
      ) : (
        <span className="material-symbols-outlined" id="loading_symbol">
          sync
        </span>
      )}
    </div>
  );
};

export default TaskView;
