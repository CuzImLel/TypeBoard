import React from "react";
import { useState } from "react";
import { Priority, State } from "../TaskObject";

interface props {
  progress: number | null;
  setprogress: (progress: number) => void;
  filteredstates: State[];
  setfilteredStates: (states: State[]) => void;
  filteredPriorities: Priority[];
  setFilteredPriorities: (priorities: Priority[]) => void;
}

const Filter: React.FC<props> = ({
  progress,
  setprogress,
  filteredstates,
  setfilteredStates,
  filteredPriorities,
  setFilteredPriorities,
}) => {
  return (
    <div className="filterbox">
      <div className="filter_content">
        <h1>Filter</h1>
        <div className="state_filter">
          <h2>State</h2>
          <li>
            <input
              type="checkbox"
              onChange={(e) =>
                e.target.checked
                  ? setfilteredStates([...filteredstates, State.REMAINING])
                  : setfilteredStates(
                      filteredstates.filter(
                        (state) => state !== State.REMAINING
                      )
                    )
              }
            ></input>
            <a>Remaining</a>
          </li>
          <li>
            <input
              type="checkbox"
              onChange={(e) =>
                e.target.checked
                  ? setfilteredStates([...filteredstates, State.IN_PROGRESS])
                  : setfilteredStates(
                      filteredstates.filter(
                        (state) => state !== State.IN_PROGRESS
                      )
                    )
              }
            ></input>
            <a>In progress</a>
          </li>
          <li>
            <input
              type="checkbox"
              onChange={(e) =>
                e.target.checked
                  ? setfilteredStates([...filteredstates, State.FINISHED])
                  : setfilteredStates(
                      filteredstates.filter((state) => state !== State.FINISHED)
                    )
              }
            ></input>
            <a>Finished</a>
          </li>
        </div>
        <div className="priority_filter">
          <h2>Priority</h2>
          <li>
            <input
              type="checkbox"
              onChange={(e) =>
                e.target.checked
                  ? setFilteredPriorities([...filteredPriorities, Priority.Low])
                  : setFilteredPriorities(
                      filteredPriorities.filter(
                        (priority) => priority !== Priority.Low
                      )
                    )
              }
            ></input>
            <a>Low priority</a>
          </li>
          <li>
            <input
              type="checkbox"
              onChange={(e) =>
                e.target.checked
                  ? setFilteredPriorities([
                      ...filteredPriorities,
                      Priority.MEDIUM,
                    ])
                  : setFilteredPriorities(
                      filteredPriorities.filter(
                        (priority) => priority !== Priority.MEDIUM
                      )
                    )
              }
            ></input>
            <a>Medium priority</a>
          </li>
          <li>
            <input
              type="checkbox"
              onChange={(e) =>
                e.target.checked
                  ? setFilteredPriorities([
                      ...filteredPriorities,
                      Priority.HIGH,
                    ])
                  : setFilteredPriorities(
                      filteredPriorities.filter(
                        (priority) => priority !== Priority.HIGH
                      )
                    )
              }
            ></input>
            <a>High priority</a>
          </li>
        </div>
        <div className="progress_filter">
          <h2>Progress</h2>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={0}
            onChange={(e) => setprogress(parseInt(e.target.value))}
          ></input>
          {progress !== null ? (
            <p>{`${progress}%`}</p>
          ) : (
            <p>No progress selected!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
