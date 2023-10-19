import React from "react";
import icon from "../assets/icon.png";
import user from "../assets/user.png";

interface props {
  openPanel: () => void;
}

const Sidebar: React.FC<props> = ({ openPanel }) => {
  return (
    <>
      <div className="sidebar">
        <div className="upper_sidebar">
          <div className="upper_sidebar_inner_first">
            <img src={icon} className="sidebar_logo" />
          </div>

          <div className="upper_sidebar_inner_second">
            <li>
              <span className="material-symbols-rounded">search</span>
            </li>
            <li onClick={openPanel}>
              <span className="material-symbols-rounded">add</span>
            </li>
          </div>
        </div>

        <div className="under_sidebar">
          <div className="under_sidebar_content">
            <li>
              <span className="material-symbols-rounded">menu</span>
            </li>
            <li>
              <span className="material-symbols-rounded">help</span>
            </li>

            <img src={user} className="sidebar_profile" width="40px" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
