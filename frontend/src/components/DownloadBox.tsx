import React, { useEffect } from "react";
import { useState } from "react";
import { BoardView } from "../BoardView";
import axios from "axios";
import TaskObject from "../TaskObject";

interface props {
  board: BoardView | undefined;
}

const DownloadBox: React.FC<props> = ({ board }) => {
  const [tasks, setTasks] = useState<TaskObject[]>();

  const getJsonFile = () => {
    const jsonData = {
      board: {
        id: board?._id,
        name: board?.name,
        description: board?.description,
        tasks: tasks,
      },
    };

    const blob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = board?.name + ".json";
    downloadLink.click();
    URL.revokeObjectURL(url);
  };

  const handleClick = () => {
    const btnCircleDownload = document.querySelector(".btn-circle-download");

    if (btnCircleDownload) {
      btnCircleDownload.classList.add("load");

      setTimeout(function () {
        btnCircleDownload.classList.add("done");
      }, 1000);

      setTimeout(function () {
        btnCircleDownload.classList.remove("load", "done");
      }, 5000);
    }
    getJsonFile();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/task/get-todos-by-board", {
        params: {
          boardid: board,
        },
      })
      .then((response) => {
        const payload = response.data;

        setTasks(payload);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="download_container">
      <h1>Download your board in json format!</h1>

      <div className="btn-circle-download" onClick={handleClick}>
        <svg id="arrow" width="14px" height="20px" viewBox="17 14 14 20">
          <path d="M24,15 L24,32"></path>
          <polyline points="30 27 24 33 18 27"></polyline>
        </svg>
        <svg id="check" width="21px" height="15px" viewBox="13 17 21 15">
          <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
        </svg>
        <svg id="border" width="48px" height="48px" viewBox="0 0 48 48">
          <path d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default DownloadBox;
